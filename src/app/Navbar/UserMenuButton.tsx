"use client";

import { Session } from "next-auth";
import Image from "next/image";

import { BsThreeDots } from "react-icons/bs";

import placeholder from "@/assets/placeholder.jpg";
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ? (
          <Image
            src={user?.image || placeholder}
            alt="Profile picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <BsThreeDots />
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu menu-sm rounded-box z-30 w-52 mt-3 bg-base-100 shadow-sm"
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </button>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </li>
      </ul>
    </div>
  );
}
