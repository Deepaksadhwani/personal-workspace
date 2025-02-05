import {
  type CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div>
      <DashboardNavbar
        name={session?.user?.name || ""}
        image={session?.user?.image || ""}
      />
    </div>
  );
}
