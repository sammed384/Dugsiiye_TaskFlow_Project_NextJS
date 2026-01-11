import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { tasks } = await request.json();

    if (!Array.isArray(tasks)) {
      return NextResponse.json(
        { error: "Invalid tasks data" },
        { status: 400 }
      );
    }

    // Update each task's position in a transaction
    await prisma.$transaction(
      tasks.map((task: { id: string; position: number }) =>
        prisma.task.update({
          where: {
            id: task.id,
            userId: session.user.id,
          },
          data: {
            position: task.position,
          },
        })
      )
    );

    return NextResponse.json({ message: "Tasks reordered successfully" });
  } catch (error) {
    console.error("Error reordering tasks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
