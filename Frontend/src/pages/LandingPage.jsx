import React from "react";
import Navbar from "../components/Navbar";
import {
  useClerk,
  SignedIn,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  const { redirectToSignUp } = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center flex-1 text-center px-4 py-4 sm:py-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Secure. Simple. Smart.
          </h2>
          <p className="text-gray-300 max-w-xl mb-8 text-lg">
            Manage all your passwords in one place with end-to-end encryption.
            Never forget a password again.
          </p>
          {isSignedIn ? (
            <NavLink
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              to="/dashboard"
            >
              Go to Dashboard
            </NavLink>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              onClick={() => redirectToSignUp({ returnBackUrl: "/" })}
            >
              Get Started
            </button>
          )}
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 bg-gray-800">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                End-to-End Encryption
              </h3>
              <p className="text-gray-300">
                Your passwords are encrypted before they even leave your device.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                Easy to Use
              </h3>
              <p className="text-gray-300">
                Minimal interface designed for speed and simplicity.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                Open Source
              </h3>
              <p className="text-gray-300">
                View the code, contribute, or self-host. Your data, your
                control.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-4 bg-gray-900 border-t border-gray-700 text-sm text-gray-500">
          © {new Date().getFullYear()} Passify. Built with ❤️ by Vraj Shah.
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
