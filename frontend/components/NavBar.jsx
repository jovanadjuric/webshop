import React from "react";
import Link from "next/link";
import { useSignOut, useUser } from "../hooks/user";

function NavBar() {
  const user = useUser();
  const signOut = useSignOut();

  return (
    <nav className="px-2 py-1">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">
            <a>Next Shop</a>
          </Link>
        </li>
        <li role="separator" className="flex-1" />
        <li>
          {user ? (
            <button onClick={signOut}>
              <a>{user.name} Sign Out</a>
            </button>
          ) : (
            <Link href="/sign-in">
              <a>Sign In</a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
