"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import TaskForm from "./_components/task-form";
import TaskList from "./_components/task-list";
import { TaskSkeleton, StatsSkeleton } from "./_components/skeletons";
import Navbar from "./_components/navbar";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  position: number;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [isPending, setIsPending] = useState(true);
  const router = useRouter();

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/get-session");
      const data = await res.json();
      if (!data) {
        router.push("/login");
        return;
      }
      setSession(data);
    } catch (error) {
      console.error("Error fetching session:", error);
      router.push("/login");
    } finally {
      setIsPending(false);
    }
  }, [router]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("/api/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoadingTasks(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
    fetchTasks();
  }, [fetchSession, fetchTasks]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const completedTasks = tasks.filter((t) => t.status === "DONE").length;
  const pendingTasks = tasks.filter((t) => t.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <Navbar user={session.user} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {session.user?.name || "User"}! 👋
          </h2>
          <p className="text-slate-600">
            Here&apos;s an overview of your tasks and productivity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {loadingTasks ? (
            <>
              <StatsSkeleton />
              <StatsSkeleton />
              <StatsSkeleton />
            </>
          ) : (
            <>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Total Tasks</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {tasks.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {completedTasks}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {pendingTasks}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm onTaskCreated={fetchTasks} />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm min-h-[400px]">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Your Tasks
              </h3>
              {loadingTasks ? (
                <div className="space-y-4">
                  <TaskSkeleton />
                  <TaskSkeleton />
                  <TaskSkeleton />
                </div>
              ) : (
                <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
