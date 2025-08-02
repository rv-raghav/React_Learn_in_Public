import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src={LOGO_URL}
              alt="Logo"
              className="w-16 h-16 object-contain rounded-full border border-gray-200 shadow-sm"
            />
          </div>
          {/* Navigation */}
          <nav className="flex-1 flex items-center justify-end">
            <ul className="flex space-x-6 items-center font-medium text-gray-700">
              <li className="text-sm flex items-center">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded ${
                    onlineStatus
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  } text-xs font-semibold`}
                >
                  {onlineStatus ? "Online ✅" : "Offline 🔴"}
                </span>
              </li>
              <li>
                <Link className="transition hover:text-pink-600" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-pink-600" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-pink-600" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-pink-600" to="/grocery">
                  Grocery
                </Link>
              </li>
              <li>
                <button
                  className="inline-flex items-center px-3 py-1 rounded-md bg-pink-500 text-white font-semibold transition hover:bg-pink-600 shadow"
                  onClick={() =>
                    setbtnNameReact(
                      btnNameReact === "Login" ? "Logout" : "Login"
                    )
                  }
                >
                  {btnNameReact}
                </button>
              </li>
              <li>
                <span className="ml-2 font-bold text-pink-500">Cart</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
