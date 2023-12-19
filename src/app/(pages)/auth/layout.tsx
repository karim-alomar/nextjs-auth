"use client";
import { Tabs, TabsList } from "@/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const redirectUrl = params.get("callbackUrl") || "/";
  useEffect(() => {
    if (status === "authenticated") {
      redirect(redirectUrl);
    }
  }, [status, redirectUrl]);
  return (
    <div className="h-screen flex justify-center items-center">
      <Tabs defaultValue={pathname} className="w-[400px] grid gap-2">
        <TabsList className="grid w-full grid-cols-2">
          <Link
            data-state={`${pathname === "/auth/login" && "active"}`}
            href="/auth/login"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Login
          </Link>
          <Link
            data-state={`${pathname === "/auth/register" && "active"}`}
            href="/auth/register"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Register
          </Link>
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
}

export default Layout;
