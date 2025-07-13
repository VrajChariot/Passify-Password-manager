import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import axios from "axios";
import Loader from "../components/loader.jsx";
import PasswordList from "../components/PasswordList.jsx";
import LetterGlitch from "../components/LetterGlitch.jsx";
import Navbar from "../components/Navbar.jsx";

function App() {
  const [Submitted, setSubmitted] = useState(false);
  const [type, settype] = useState(false);
  const [copied, setcopied] = useState(false);
  const [state, setstate] = useState([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm();

  const handleEditFromList = async (passData) => {
    try {
      // Delete from DB
      await axios.delete(`http://localhost:3000/pass/${passData._id}`);
      setstate(passData);

      // Set form values
      setValue("title", passData.Title);
      setValue("url", passData.URL);
      setValue("password", passData.Password); // decrypted if needed
    } catch (err) {
      console.error("Edit handling failed:", err);
    }
  };

  const onSubmit = async (values) => {
    try {
      let SendData = "http://localhost:3000/post";
      await fetch(SendData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setstate(values);
      reset();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const validatePassword = (value) => {
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one capital letter.";
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      return "Password must contain at least one special character.";
    }
    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one numerical value.";
    }

    return true;
  };

  const ConfirmPassword = (value) => {
    if (watch("password") != watch("ConfirmPassword")) {
      return "Passwords do not match.";
    }
    return true;
  };

  function RandomPassGen() {
    const length = 12;
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let RandomPass = [];

    RandomPass.push(
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]
    );
    RandomPass.push(
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
    );
    RandomPass.push(
      numberChars[Math.floor(Math.random() * numberChars.length)]
    );
    RandomPass.push(
      specialChars[Math.floor(Math.random() * specialChars.length)]
    );

    const AllPossibleChars =
      uppercaseChars + lowercaseChars + numberChars + specialChars;
    for (let i = 4; i < length; i++) {
      RandomPass.push(
        AllPossibleChars[Math.floor(Math.random() * AllPossibleChars.length)]
      );
    }
    let MoreRandomPass = [];
    for (let i = 0; i < length; i++) {
      let j = RandomPass[Math.floor(Math.random() * RandomPass.length)];
      MoreRandomPass.push(j);
      RandomPass.splice(RandomPass.indexOf(j), 1);
    }
    let FinalPass = MoreRandomPass.join("");
    setValue("password", FinalPass, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("ConfirmPassword", FinalPass, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  return (
    <div className="relative w-full min-h-dvh overflow-hidden">
      {/* Background Glitch Effect */}
      <div className="fixed inset-0 w-full h-full">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
        />
      </div>

      {/* Main Content */}
        <Navbar />
      <div className="relative z-10 w-full min-h-dvh py-8 px-4 bg-transparent backdrop-blur-xs">
        <div className="container mx-auto max-w-5xl">
          {/* Cyberpunk-style Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
              PASSIFY
            </h1>
            <p className="text-cyan-400/80 text-sm md:text-base">
              Next-Gen Password Management System
            </p>
          </div>

          {/* Form Card */}
          <form
            className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-12 border border-cyan-500/20"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
              New Credential Entry
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-cyan-400 text-sm font-medium"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter service name"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300"
                  {...register("title", {
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters long.",
                    },
                    required: "Title is required.",
                  })}
                />
                {errors.title && (
                  <p className="text-red-400 text-xs italic">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* URL Input */}
              <div className="space-y-2">
                <label
                  htmlFor="url"
                  className="block text-cyan-400 text-sm font-medium"
                >
                  URL
                </label>
                <input
                  type="url"
                  id="url"
                  placeholder="https://"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300"
                  {...register("url", { required: "URL is required." })}
                />
                {errors.url && (
                  <p className="text-red-400 text-xs italic">
                    {errors.url.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Section */}
            <div className="mt-8 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-cyan-400 text-sm font-medium"
                >
                  Password
                </label>
                <div className="flex gap-2">
                  <input
                    type={type ? "text" : "password"}
                    id="password"
                    placeholder="Enter secure password"
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300"
                    {...register("password", {
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long.",
                      },
                      validate: validatePassword,
                      required: "Password is required.",
                    })}
                  />
                  <button
                    type="button"
                    className="p-3 text-cyan-400 hover:text-cyan-300 bg-gray-800/50 border border-cyan-500/30 rounded-lg transition-colors duration-300"
                    onClick={() => settype(!type)}
                  >
                    <FaEye size={20} />
                  </button>
                  <button
                    type="button"
                    className="p-3 text-cyan-400 hover:text-cyan-300 bg-gray-800/50 border border-cyan-500/30 rounded-lg transition-colors duration-300"
                    onClick={() => {
                      navigator.clipboard.writeText(watch("password"));
                      setcopied(true);
                      setTimeout(() => setcopied(false), 3000);
                    }}
                  >
                    <MdContentCopy size={20} />
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs italic">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  htmlFor="ConfirmPassword"
                  className="block text-cyan-400 text-sm font-medium"
                >
                  Confirm Password
                </label>
                <input
                  type={type ? "text" : "password"}
                  id="ConfirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300"
                  {...register("ConfirmPassword", {
                    validate: ConfirmPassword,
                    required: "Password confirmation is required.",
                  })}
                />
                {errors.ConfirmPassword && (
                  <p className="text-red-400 text-xs italic">
                    {errors.ConfirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                type="button"
                onClick={RandomPassGen}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 text-sm font-medium text-cyan-400 bg-gray-800/50 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 disabled:opacity-50"
              >
                Generate Strong Password
              </button>
              {isSubmitting ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 text-sm font-medium text-gray-900 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg hover:from-cyan-500 hover:to-blue-600 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-500"
                >
                  Secure Save
                </button>
              )}
            </div>
          </form>

          {/* Password List Component - pass the same styling theme */}
          <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-500/20">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
              Secured Credentials
            </h2>
            <PasswordList
              state={state}
              handleEditFromList={handleEditFromList}
            />
          </div>
        </div>

        {/* Toasts - Updated style */}
        <div className="flex flex-col gap-4 fixed top-4 right-4">
          <div
            className={`
          flex items-center justify-between gap-2 
          bg-gradient-to-r from-cyan-500/90 to-blue-500/90 backdrop-blur-md
          px-6 py-4 rounded-lg shadow-lg border border-cyan-400/30
          transform transition-all duration-300 ease-out
          ${Submitted ? "translate-x-0" : "translate-x-[130%]"}
          z-50
        `}
          >
            {/* ... existing toast content ... */}
            Data Sent Successfully
          </div>
          <div
            className={`
          flex items-center justify-between gap-2 
          bg-gradient-to-r from-cyan-500/90 to-blue-500/90 backdrop-blur-md
          px-6 py-4 rounded-lg shadow-lg border border-cyan-400/30
          transform transition-all duration-300 ease-out
          ${copied ? "translate-x-0" : "translate-x-[130%]"}
          z-50
        `}
          >
            {/* ... existing toast content ... */}
            Copied to Clipboard
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
