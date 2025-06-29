import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import Loader from "./components/loader.jsx";

function App() {
  const [Submitted, setSubmitted] = useState(false);
  const [type, settype] = useState(false);
  const [copied, setcopied] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm();

  const onSubmit = async (values) => {
    // Here you can handle the form submission, e.g., send data to an API

    try {
      let SendData = "http://localhost:3000/post";
      await fetch(SendData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
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
    // Check for at least one special character (you can define what characters are "special")
    // This regex matches common special characters. Adjust as needed.
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      return "Password must contain at least one special character.";
    }
    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one numerical value.";
    }

    return true; // Validation passed
  };

  const ConfirmPassword = (value) => {
    if (watch("password") != watch("ConfirmPassword")) {
      return "Passwords do not match.";
    }
    return true; // Validation passed
  };

  function RandomPassGen() {
    const length = 12; // Fixed length
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
    // Shuffle the array to ensure randomness
    let MoreRandomPass = [];
    for (let i = 0; i < length; i++) {
      let j = RandomPass[Math.floor(Math.random() * RandomPass.length)];
      MoreRandomPass.push(j);
      RandomPass.splice(RandomPass.indexOf(j), 1);
    }
    console.log(MoreRandomPass);
    // let FinalPass = RandomPass.sort(() => Math.random() - 0.5).join('');
    let FinalPass = MoreRandomPass.join("");
    console.log(FinalPass);
    // setpass(FinalPass);
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
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center bg-gray-900">
      <h1 className="text-4xl text-white font-bold">
        Passify - Your own Password Manager
      </h1>
      <form
        className="bg-gray-800 w-96 p-8 rounded-lg shadow-xl space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-gray-300 text-sm font-medium"
          >
            Title
          </label>
          {/* For TITLE add validations: {minlenght: 3 */}
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("title", {
              minLength: {
                value: 3, // minimum 3 characters overall
                message: "Title must be at least 3 characters long.",
              },
              required: "Title is required.",
            })}
          />
          {errors.title && (
            <p className="text-red-400">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="url"
            className="block text-gray-300 text-sm font-medium"
          >
            URL
          </label>
          <input
            type="url"
            id="url"
            placeholder="Enter URL"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("url", { required: "URL is required." })}
          />
          {errors.url && <p className="text-red-400">{errors.url.message}</p>}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-gray-300 text-sm font-medium"
          >
            Password
          </label>
          {/* For pass add validations: {minlenght: 6, compulsory chars: special, maxlenght: 16} */}
          <div className="flex items-center gap-3 ">
            <input
              type={type ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("password", {
                minLength: {
                  value: 8, // minimum 8 characters overall
                  message: "Password must be at least 8 characters long.",
                },
                validate: validatePassword,
                required: "Password is required.",
              })}
            />
            <button
              type="button"
              className="bg-blue-300 px-3 py-3 rounded-md"
              onClick={() => {
                settype(!type);
              }}
            >
              <FaEye />
            </button>
            <button
              type="button"
              className="bg-blue-300 px-3 py-3 rounded-md"
              onClick={() => {
                navigator.clipboard.writeText(watch("password")); //
                setcopied(true);
                setTimeout(() => {
                  setcopied(false);
                }, 3000);
              }}
            >
              <MdContentCopy />
            </button>
            {/* confirm pass section */}
          </div>
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="ConfirmPassword"
            className="block text-gray-300 text-sm font-medium"
          >
            Confrim Password
          </label>
          {/* For pass add validations: {minlenght: 6, compulsory chars: special, maxlenght: 16} */}
          <div className="flex items-center gap-3 ">
            <input
              type={type ? "text" : "password"}
              id="ConfirmPassword"
              placeholder="Enter password again"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("ConfirmPassword", {
                validate: ConfirmPassword,
                required: "Password is required.",
              })}
            />
          </div>
          {errors.ConfirmPassword && (
            <p className="text-red-400">{errors.ConfirmPassword.message}</p>
          )}
        </div>
        <button
          onClick={() => RandomPassGen()}
          type="button"
          disabled={isSubmitting}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 ease-in-out"
        >
          Generate Strong Password
        </button>
        {isSubmitting ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 ease-in-out"
          >
            Submit
          </button>
        )}
      </form>
      {/* Submit success toast */}
      <div className="flex flex-col gap-4 fixed top-4 right-4">
        <div
          className={` 
    flex items-center justify-between gap-2 
    bg-blue-600 text-white 
    px-4 py-3 rounded-lg
    shadow-lg
    transform transition-transform duration-300 ease-out
    ${Submitted ? "translate-x-0" : "translate-x-[130%]"}
    z-50
  `}
        >
          {/* Success Icon */}
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>

          {/* Message */}
          <p className="text-sm font-medium">Data sent successfully!</p>

          {/* Close Button */}
          <button
            onClick={() => setSubmitted(false)}
            className="ml-4 text-white hover:text-gray-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* copy success toast */}
        <div
          className={` 
    flex items-center justify-between gap-2 
    bg-blue-600 text-white 
    px-4 py-3 rounded-lg
    shadow-lg
    transform transition-transform duration-300 ease-out
    ${copied ? "translate-x-0" : "translate-x-[130%]"}
    z-50
  `}
        >
          {/* Success Icon */}
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>

          {/* Message */}
          <p className="text-sm font-medium">Password copied to clipboard!</p>

          {/* Close Button */}
          <button
            onClick={() => setcopied(false)}
            className="ml-4 text-white hover:text-gray-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
