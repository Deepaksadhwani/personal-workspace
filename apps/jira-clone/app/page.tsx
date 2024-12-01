import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="">
      <Button>Click me</Button>
      <Button variant="destructive">des</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="muted">muted</Button>
      <Button variant="teritary">teritrary</Button>
    </div>
  );
}
