import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  return (
    <div className="min-h-screen w-full relative bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
        }}
      />
      <div className="absolute flex flex-col justify-center items-center size-full">
        <h1 className="text-7xl
        text-gray-400 tracking-wider  font-extrabold  text-balance">EzDestiny</h1>
        <p>Api Tester Web App</p>
        <div className="mt-12">
          <Link href={"/request"}>
            <Button className="cursor-pointer">
              Get started
              <span className="button-span"> ─ it's free</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}