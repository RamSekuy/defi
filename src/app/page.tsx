import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center p-4 h-dvh gap-6">
      <h1 className="text-4xl font-bold">Welcome to RamSekuy Store</h1>
      <Link href={"/buy"}>
        <Button>Go</Button>
      </Link>
      <div className="flex gap-2 items-center fixed bottom-5">
        <p>Developed by: </p>
        <Link href={"https://github.com/RamSekuy"} target="_blank">
          <Button>
            <Github /> RamSekuy
          </Button>
        </Link>
      </div>
    </main>
  );
}
