import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const SidePanel = ({ props }) => {
  return (
    <aside
      className={`fixed top-0 right-0 h-full w-64 text-xl bg-(--color-surface) shadow-lg z-50 transform transition-transform duration-300 ${
        props.open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-(--color-border) text-2xl">
        <h2 className="font-semibold text-(--color-text)">Menu</h2>
        <button
          onClick={() => props.setOpen(false)}
          className="text-(--color-text-muted) cursor-pointer"
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
      </div>

      <nav className="p-4 space-y-5 text-(--color-text)">
        <button className="block w-full text-left">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-(--color-primary) font-medium"
                : "text-(--color-text)"
            }
          >
            Home
          </NavLink>
        </button>
        <button className="block w-full text-left">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-(--color-primary) font-medium"
                : "text-(--color-text)"
            }
          >
            Services
          </NavLink>
        </button>
        <button className="block w-full text-left">
          <NavLink
            to="/departments"
            className={({ isActive }) =>
              isActive
                ? "text-(--color-primary) font-medium"
                : "text-(--color-text)"
            }
          >
            Departments
          </NavLink>
        </button>
        <button className="block w-full text-left">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-(--color-primary) font-medium"
                : "text-(--color-text)"
            }
          >
            About
          </NavLink>
        </button>
        <button className="block w-full text-left">
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? "text-(--color-primary) font-medium"
                : "text-(--color-text)"
            }
          >
            Doctor
          </NavLink>
        </button>
        <button className="block w-full text-left">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-(--color-primary) font-medium"
                : "text-(--color-text)"
            }
          >
            Contact
          </NavLink>
        </button>

        <NavLink to="/login">
          <button className="block w-full text-center text-(--color-primary-dark) font-semibold border border-gray-600 px-4 py-2 rounded-full">
            Login
          </button>
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidePanel;
