"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div>Prep-ai</div>
      <SignInButton />
      <UserButton />
      <ThemeToggle />
    </div>
  );
}
