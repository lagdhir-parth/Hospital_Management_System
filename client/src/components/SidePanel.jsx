import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

const SidePanel = ({ props }) => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Departments", path: "/departments" },
    { name: "Doctors", path: "/doctors" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];
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
          <X />
        </button>
      </div>

      <nav className="p-4 space-y-5 text-(--color-text)">
        {navItems.map((item) => (
          <button key={item.name} className="block w-full text-left">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-(--color-primary) font-medium"
                  : "text-(--color-text)"
              }
              onClick={() => {
                props.setOpen(false);
              }}
            >
              {item.name}
            </NavLink>
          </button>
        ))}

        <NavLink to="/login">
          <button
            onClick={() => {
              props.setOpen(false);
            }}
            className="block w-full text-center text-(--color-primary-dark) font-semibold border border-gray-600 px-4 py-2 rounded-full"
          >
            Login
          </button>
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidePanel;
