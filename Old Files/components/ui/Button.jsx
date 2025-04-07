import clsx from "clsx";
// UI Components
const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], className)} // Ensures class merging
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;