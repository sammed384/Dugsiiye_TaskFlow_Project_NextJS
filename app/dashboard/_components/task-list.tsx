"use client";

import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { GripVertical, Check, Pencil, Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  position: number;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

export default function TaskList({ tasks, onTaskUpdated }: TaskListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  // Sync local tasks when props change
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleSave = async (id: string) => {
    if (!editTitle.trim()) return;

    setLoadingId(id);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      });

      if (response.ok) {
        setEditingId(null);
        onTaskUpdated();
        toast.success("Task updated successfully!");
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoadingId(null);
    }
  };

  const toggleStatus = async (task: Task) => {
    setLoadingId(task.id);
    const newStatus = task.status === "PENDING" ? "DONE" : "PENDING";

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onTaskUpdated();
        toast.success(
          newStatus === "DONE" ? "Task completed!" : "Task marked as pending"
        );
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    setLoadingId(id);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onTaskUpdated();
        toast.success("Task deleted successfully!");
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoadingId(null);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(localTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update positions
    const updatedTasks = items.map((task, index) => ({
      ...task,
      position: index,
    }));

    setLocalTasks(updatedTasks);

    try {
      const response = await fetch("/api/tasks/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks: updatedTasks.map((t) => ({ id: t.id, position: t.position })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reorder tasks");
      }
      toast.success("Order updated!");
    } catch (error) {
      console.error("Error reordering tasks:", error);
      toast.error("Failed to save new order");
      // Revert on error
      setLocalTasks(tasks);
    }
  };

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200"
      >
        <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
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
        <p className="text-slate-500">
          No tasks yet. Create your first task to get started!
        </p>
      </motion.div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {localTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                        zIndex: snapshot.isDragging ? 50 : 1,
                      }}
                      className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${
                        snapshot.isDragging
                          ? "bg-white border-indigo-500 shadow-xl scale-[1.02]"
                          : task.status === "DONE"
                          ? "bg-green-50 border-green-100 opacity-75"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      {/* Drag Handle */}
                      <div
                        {...(provided.dragHandleProps as any)}
                        className="p-1 hover:bg-slate-100 rounded cursor-grab active:cursor-grabbing text-slate-400 hover:text-indigo-600"
                      >
                        <GripVertical className="w-5 h-5" />
                      </div>

                      <div className="flex-1">
                        {editingId === task.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                              placeholder="Task Title"
                              autoFocus
                            />
                            <textarea
                              value={editDescription}
                              onChange={(e) =>
                                setEditDescription(e.target.value)
                              }
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm min-h-[60px]"
                              placeholder="Description"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={cancelEditing}
                                className="px-3 py-1.5 text-slate-500 hover:text-slate-700 text-xs font-medium transition-all"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSave(task.id)}
                                disabled={loadingId === task.id}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50"
                              >
                                {loadingId === task.id ? "Saving..." : "Save"}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <h4
                                className={`font-semibold text-slate-900 ${
                                  task.status === "DONE"
                                    ? "line-through text-slate-400"
                                    : ""
                                }`}
                              >
                                {task.title}
                              </h4>
                              {task.description && (
                                <p className="text-slate-500 text-sm line-clamp-1">
                                  {task.description}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => toggleStatus(task)}
                                disabled={loadingId === task.id}
                                className={`p-2 rounded-lg transition-all ${
                                  task.status === "DONE"
                                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                }`}
                              >
                                <Check className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => startEditing(task)}
                                disabled={loadingId === task.id}
                                className="p-2 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-lg transition-all"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => deleteTask(task.id)}
                                disabled={loadingId === task.id}
                                className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
