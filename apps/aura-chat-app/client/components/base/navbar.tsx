"use client";

import LoginModal from "@/components/auth/login-modal";
import { Button } from "@/components/ui/button";
import type { CustomUser } from "@/types/global";
import Link from "next/link";
import React from "react";

export default function Navbar({ user }: { user?: CustomUser }) {
  return (
    <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
      <h1 className="text-xl md:text-2xl font-extrabold">AuraChat</h1>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        <Link href="/">Home</Link>
        <Link href="#features">Features</Link>
        {!user ? (
          <LoginModal />
        ) : (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
