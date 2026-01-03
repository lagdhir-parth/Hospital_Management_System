// CustomDropdown.jsx
import { ChevronDown, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  name,
  label,
  options,
  setForm,
  value, // ✅ Controlled value from parent form
  placeholder = "Select option",
  searchable = false, // ✅ Enable search for doctors/departments
  btnClasses = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);

  // ✅ Sync with parent form value
  const displayValue = value || null;

  // ✅ Filter options when searchable
  // ✅ FIXED Filter
  useEffect(() => {
    if (!searchable || !searchTerm.trim()) {
      setFilteredOptions(options);
      return;
    }

    setFilteredOptions(
      options.filter((option) => {
        // ✅ Handle both objects AND strings
        if (typeof option === "object" && option !== null) {
          // Object (doctor/department)
          return (
            option.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            option.specialization
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        } else {
          // String (simple options)
          return option.toLowerCase().includes(searchTerm.toLowerCase());
        }
      }),
    );
  }, [searchTerm, options, searchable]);

  // ✅ Outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // if elem is outside the dropdownref then !dropdownRef.current.contains(event.target) is true. contains() checks if the clicked target is inside the ref element or not.
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setValue = (optionValue) => {
    setIsOpen(false);
    setSearchTerm("");
    setForm((prev) => ({ ...prev, [name]: optionValue }));
  };

  const inputClasses =
    "w-full rounded-lg border border-(--color-border) bg-(--color-surface) " +
    "px-3 py-2 text-sm text-(--color-text) shadow-sm outline-none transition " +
    "focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) " +
    "placeholder:text-(--color-text-muted)";

  return (
    <div className="flex flex-col gap-1 text-sm" ref={dropdownRef}>
      <label htmlFor={name} className="block font-bold md:font-medium">
        {label} <span className="text-(--color-primary)">*</span>
      </label>

      <div className="relative w-full">
        {/* Trigger Button */}
        <button
          id={name}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${inputClasses} flex items-center justify-between ${btnClasses}`}
        >
          <span>
            {displayValue
              ? displayValue.name ||
                options.find((opt) => opt._id === displayValue)?.name ||
                displayValue
              : placeholder}
          </span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-20 mt-1 w-full rounded-lg border border-(--color-border) bg-(--color-surface) shadow-lg">
            {/* Search Input (for doctors/departments) */}
            {searchable && (
              <div className="p-2 border-b border-(--color-border)/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--color-text-muted)" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-(--color-surface-muted) rounded-t-lg text-sm placeholder:text-(--color-text-muted) focus:outline-none "
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <ul className="max-h-60 overflow-y-auto p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option._id || option}
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue(option._id || option);
                    }}
                    className="cursor-pointer px-3 py-2 text-sm text-(--color-light-text) hover:bg-gray-200 rounded-lg flex items-center gap-2"
                  >
                    {option.name || option}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-(--color-text-muted) text-center">
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
