import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchJson } from "../lib/api";

function NavBar() {
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      try {
        const user = await fetchJson("/api/user");
        setUser(user);
      } catch (err) {
        //   not signed in
      }
    })();
  }, []);

  const handleSignOut = async () => {
    await fetchJson("/api/logout");
    setUser(undefined);
  };

  console.log("[NavBar] user:", user);
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
            <button onClick={handleSignOut}>
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
