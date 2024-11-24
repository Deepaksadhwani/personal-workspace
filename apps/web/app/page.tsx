import { Button } from "@/components/ui/button";
import { unstable_cache } from "next/cache";
export default function Home() {
  return (
   <div className="text-2xl text-rose-700">
    <Button variant="default">Click me</Button> 
   
    hello world
   </div>
  );
}
