"use client";

import { motion } from "framer-motion";

export function TaskSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-5 h-5 bg-slate-100 rounded"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-100 rounded-lg w-1/3"></div>
          <div className="h-3 bg-slate-100 rounded-lg w-2/3"></div>
        </div>
        <div className="flex gap-1">
          <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
          <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
          <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-slate-100 rounded-lg w-1/2"></div>
          <div className="h-6 bg-slate-100 rounded-lg w-1/3"></div>
        </div>
      </div>
    </div>
  );
}
