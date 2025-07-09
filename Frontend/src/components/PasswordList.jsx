import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import axios from "axios";
import React, { useState, useEffect } from "react";

const PasswordList = ({ state, handleEditFromList }) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/pass")
      .then((res) => {
        const modifiedData = res.data.map((item) => ({
          ...item,
          View: false, // Add View property to each password object
        }));
        setPasswords(modifiedData);
      })
      .catch((err) => {
        console.error("Error fetching passwords:", err);
      });
  }, [state]);
  // this is the state which contains the passwords, it in is the form of an array
  // each password is an object with properties like _id, Title, URL, and Password
  const [Passwords, setPasswords] = useState([]);

  const HandlevView = (id) => {
    const updatedList = Passwords.map((pass) => {
      if (pass._id === id) {
        return { ...pass, View: !pass.View };
      }
      return pass;
    });
    setPasswords(updatedList); // Filter out any empty entries
  };

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3000/pass/${id}`);
      setPasswords((prev) => prev.filter((pass) => pass._id !== id));
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  }

  const handleEdit = async (pass) => {
    if (!pass || !pass._id) return;

    try {
      // Call the onEdit handler passed from App
      handleEditFromList(pass);
    } catch (err) {
      console.error("Error editing password:", err);
    }
  };

  const handleCopy = (password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy password:", err);
      });
  };

  return (
    <div className="container mx-auto">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search passwords..."
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Passwords.map((pass) => {
          return (
            pass._id !== "" && (
              <div
                key={pass._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {pass.Title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-500"
                      onClick={() => handleEdit(pass)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-500"
                      onClick={() => handleDelete(pass._id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>

                <div className="text-gray-400 mb-3">
                  <a
                    href={pass.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 truncate block"
                  >
                    {pass.URL}
                  </a>
                </div>

                <div className="flex items-center gap-2 bg-gray-700 p-2 rounded">
                  <input
                    type={pass.View ? "text" : "password"}
                    value={pass.Password}
                    readOnly
                    className="bg-transparent flex-1 text-gray-300 border-none focus:outline-none"
                  />
                  <button className="p-1 hover:text-white text-gray-400 flex items-center justify-center w-8 h-8">
                    <FaEye
                      size={14}
                      onClick={() => {
                        HandlevView(pass._id);
                      }}
                    />
                  </button>
                  <button
                    className="p-1 hover:text-white text-gray-400 flex items-center justify-center w-8 h-8"
                    onClick={() => handleCopy(pass.Password)}
                  >
                    <MdContentCopy size={14} />
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default PasswordList;
