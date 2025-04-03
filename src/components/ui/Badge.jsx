const Badge = ({ children, color = "blue" }) => {
    const colorClasses = {
        blue: "bg-blue-100 text-blue-800",
        green: "bg-green-100 text-green-800",
        red: "bg-red-100 text-red-800",
        yellow: "bg-yellow-100 text-yellow-800",
        purple: "bg-purple-100 text-purple-800",
    };

    return (
        <span className={`${colorClasses[color]} text-xs px-2 py-1 rounded-full font-medium`}>
            {children}
        </span>
    );
};