"use client";

import UserAvatar from "@/components/common/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const LogoutModal = dynamic(() => import("@/components/auth/logout-modal"));

export default function ProfileMenu({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  const [openLogout, setLogoutOpen] = React.useState(false);

  return (
    <>
      {openLogout && (
        <Suspense fallback={<p>Loading...</p>}>
          <LogoutModal open={openLogout} setOpen={setLogoutOpen} />
        </Suspense>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={name} image={image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
