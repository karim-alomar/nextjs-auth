import { LogoutButton } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h2 className="text-5xl">Welcome Friend {"(;"} </h2>
      <LogoutButton />
    </div>
  );
}
