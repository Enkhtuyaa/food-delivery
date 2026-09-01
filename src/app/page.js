import Image from "next/image";

import { Button } from "@/components/ui/button"
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
      
      </Button>
    </div>
    </div>
  );
}
