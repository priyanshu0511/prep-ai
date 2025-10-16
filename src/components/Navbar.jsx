"use client";

import { Brain } from "lucide-react"; // you can change this icon
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <Brain className="w-6 h-6" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            prep.<span className="text-primary">ai</span>
          </span>
        </Link>

        {/* Right - Theme Toggle + Profile */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
