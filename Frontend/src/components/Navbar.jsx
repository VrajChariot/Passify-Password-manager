import React from "react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4 sticky top-0 z-12">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">Passify</h1>
          <div className="flex items-center gap-4">
            <NavLink
              to={"/"}
              className="text-white px-4 py-2 hover:bg-gray-700 rounded"
            >
              Home
            </NavLink>
            <NavLink
              to={"/dashboard"}
              className="text-white px-4 py-2 hover:bg-gray-700 rounded"
            >
              Dashboard
            </NavLink>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton
                className="text-white px-4 py-2 hover:bg-gray-700 rounded cursor-pointer"/>
            </SignedOut>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
