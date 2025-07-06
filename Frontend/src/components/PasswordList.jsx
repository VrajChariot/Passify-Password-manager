import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

const PasswordList = (props) => {
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
        {props.passwords.map((pass) => (
          <div key={pass._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-white">{pass.Title}</h3>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-500">
                  <FaEdit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500">
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
                type="password"
                value={pass.Password}
                readOnly
                className="bg-transparent flex-1 text-gray-300 border-none focus:outline-none"
              />
              <button className="p-1 hover:text-white text-gray-400 flex items-center justify-center w-8 h-8">
                <FaEye size={14} />
              </button>
              <button className="p-1 hover:text-white text-gray-400 flex items-center justify-center w-8 h-8">
                <MdContentCopy size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordList;
