"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Layout,
  Shield,
  Zap,
  Users,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import UserDropdown from "./dashboard/_components/user-dropdown";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Task
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  Flow
                </span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Dashboard
              </Link>
              {session ? (
                <UserDropdown user={session.user} />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-xl"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
              ✨ Reimagined for modern teams
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              Master your workflow with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 animate-gradient-x">
                TaskFlow
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              The premium project management tool designed for high-performance
              teams. Experience fluid animations, intuitive drag-and-drop, and
              powerful analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:-translate-y-1 flex items-center gap-2"
              >
                Start for free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                View Demo
              </Link>
            </div>
          </motion.div>
        </div>

        {/* App Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl blur opacity-20 animate-pulse"></div>
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center bg-grid-slate-50">
            {/* Abstract UI Representation */}
            <div className="w-full h-full bg-slate-50 p-8 flex gap-6">
              {/* Sidebar */}
              <div className="w-64 bg-white rounded-xl border border-slate-200 shadow-sm hidden md:block p-4 space-y-4">
                <div className="h-8 w-32 bg-slate-100 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-50 rounded"></div>
                  <div className="h-4 w-3/4 bg-slate-50 rounded"></div>
                  <div className="h-4 w-5/6 bg-slate-50 rounded"></div>
                </div>
              </div>
              {/* Main Content */}
              <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="h-8 w-48 bg-slate-100 rounded-lg"></div>
                  <div className="h-8 w-24 bg-indigo-100 rounded-lg"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3"
                    >
                      <div className="h-4 w-20 bg-slate-200 rounded"></div>
                      <div className="h-24 bg-white rounded-lg border border-slate-200 shadow-sm"></div>
                      <div className="h-24 bg-white rounded-lg border border-slate-200 shadow-sm"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Everything you need to ship faster
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Powerful features packaged in a beautiful interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <Layout className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Kanban Boards
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Visualize your workflow with our intuitive drag-and-drop boards.
                Move tasks effortlessly between stages.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-violet-100 hover:shadow-xl hover:shadow-violet-100/50 transition-all group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Real-time Updates
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Changes happen instantly. Collaborate with your team in
                real-time without page refreshes.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-100/50 transition-all group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Enterprise Security
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Bank-grade encryption and secure authentication keep your data
                safe and private.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}

      {/* CTA Section */}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-slate-900">TaskFlow</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-900 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                GitHub
              </a>
            </div>
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} sam. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
