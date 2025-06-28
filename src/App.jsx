import { useState } from 'react'
import { useForm } from "react-hook-form";


function App() {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();
  const onSubmit = values => {
      // Here you can handle the form submission, e.g., send data to an API
    console.log(values);
    console.log(`password is ${values.password}`);
  };
  const validatePassword = value => { 
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one capital letter.';
    }
    // Check for at least one special character (you can define what characters are "special")
    // This regex matches common special characters. Adjust as needed.
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      return 'Password must contain at least one special character.';
    }
    if (!/[0-9]/.test(value)) {

      return 'Password must contain at least one numerical value.';
      
      }
    return true; // Validation passed
   };

  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center bg-gray-900">
      <h1 className='text-4xl text-white font-bold'>Passify - Your own Password Manager</h1>
      <form className="bg-gray-800 w-96 p-8 rounded-lg shadow-xl space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label htmlFor="title" className="block text-gray-300 text-sm font-medium">
            Title
          </label>
          {/* For TITLE add validations: {minlenght: 3 */}
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("title",{
              minLength: {
                value: 3, // minimum 3 characters overall
                message: 'Title must be at least 3 characters long.'
              },
              required: 'Title is required.',
            })}/>
            {errors.title && <p className='text-red-400'>{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="url" className="block text-gray-300 text-sm font-medium">
            URL
          </label>
          <input
            type="url"
            id="url"
            placeholder="Enter URL"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("url")}/>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-gray-300 text-sm font-medium">
            Password
          </label>
          {/* For pass add validations: {minlenght: 6, compulsory chars: special, maxlenght: 16} */}
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("password",{
              minLength: {
                value: 8, // minimum 8 characters overall
                message: 'Password must be at least 8 characters long.'
              },
              validate: validatePassword,
              required: 'Password is required.',
            })}/>
            {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
