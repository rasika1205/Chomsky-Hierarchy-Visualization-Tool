import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { AnimatedBackground } from "./components/AnimatedBackground";

export function Root() {
  return (
    <div className="min-h-screen bg-black text-white relative dark">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}