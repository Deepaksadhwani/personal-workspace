import { DottedSeprator } from "@/components/dotted-seprator";
import { Navigation } from "@/components/navigation";
import { Projects } from "@/components/project";
import WorkspaceSwitcher from "@/components/workspace-switcher";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={164} height={48} />
      </Link>
      <DottedSeprator className="my-4" />
      <Suspense>
        <WorkspaceSwitcher />
      </Suspense>

      <DottedSeprator className="my-4" />
      <Navigation />
      <DottedSeprator className="my-4" />
      <Suspense>
        <Projects />
      </Suspense>
    </aside>
  );
};
