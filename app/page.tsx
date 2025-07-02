"use client";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import React from "react";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-[#181c2a] dark:via-[#1a1a2e] dark:to-[#232946] transition-colors duration-700">
      {/* Navbar */}
      <header className="w-full px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-neutral-700 bg-white/80 dark:bg-[#181c2a]/80 z-10">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="HorizonAI Logo" width={40} height={40} className="rounded-lg shadow-md" />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent tracking-tight animate-fade-in">
            HorizonAI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          {/* {user && <UserButton />} */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent drop-shadow-lg animate-slide-down">
            Welcome to HorizonAI
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 animate-fade-in">
            Your all-in-one AI-powered career companion. Unlock your potential with:
          </p>
          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 animate-fade-in">
            <div className="rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <span className="text-blue-600 dark:text-blue-300 text-3xl mb-2">🧑‍💼</span>
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-200 mb-1">AI Career Agent</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">Personalized career advice and guidance.</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <span className="text-purple-600 dark:text-purple-300 text-3xl mb-2">📄</span>
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-200 mb-1">Resume Analyzer</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">Instantly scan and improve your resume.</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <span className="text-indigo-600 dark:text-indigo-300 text-3xl mb-2">🗺️</span>
              <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-200 mb-1">Career Roadmap Generator</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">Build a step-by-step plan for your dream job.</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800 shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <span className="text-pink-600 dark:text-pink-300 text-3xl mb-2">✉️</span>
              <h3 className="font-bold text-lg text-pink-700 dark:text-pink-200 mb-1">Cover Letter Generator</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">Create compelling cover letters in seconds.</p>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 animate-fade-in">
            {!user ? (
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
                onClick={() => router.push("/dashboard")}
              >
                Get Started
              </Button>
            ) : (
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2 px-8 py-3 border-2 border-blue-600 dark:border-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-[#232946] transition"
              onClick={() => window.open("https://github.com/Kshitij83/HorizonAI", "_blank")}
            >
              <Github className="w-5 h-5" />
              Learn More
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto py-6 px-4 bg-white/80 dark:bg-[#181c2a]/80 border-t border-gray-200 dark:border-neutral-700 text-center animate-fade-in">
        <div className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-base">
          <p>
            Hi, I&apos;m <span className="font-bold text-blue-600 dark:text-blue-400">Kshitij</span>, the creator of HorizonAI.<br />
            The name <span className="font-bold text-violet-600 dark:text-violet-400">HorizonAI</span> is inspired by my own name – <span className="italic">Kshitij</span> – which means <span className="font-semibold">horizon</span> in English.<br />
            Just as the horizon represents new possibilities and endless opportunities, HorizonAI is here to help you reach new heights in your career journey.
          </p>
          <div className="mt-3">
            <a
              href="https://github.com/Kshitij83/HorizonAI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline transition"
            >
              <Github className="w-4 h-4" />
              Visit HorizonAI on GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 1s ease;
        }
        .animate-slide-down {
          animation: slide-down 1s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
}