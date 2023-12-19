"use client";
import { Button } from "@/components";
import { signOut } from "next-auth/react";
export function LogoutButton() {
  return (
    <Button variant="destructive" className="px-20" onClick={() => signOut()}>
      Logout
    </Button>
  );
}
