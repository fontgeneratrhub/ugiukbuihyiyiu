import React from "react";

const Button = ({
  variant,
  children,
  className: additionalClassNames,
  ...props
}) => {
  let classes = "";

  switch (variant) {
    case "primary":
      classes =
        "bg-green-500 hover:bg-green-600 text-md font-medium py-3 px-4 my-4";
      break;
    case "secondary":
      classes =
        "bg-gray-500 hover:bg-gray-600 text-md font-medium py-3 px-4 my-4";
      break;
    case "outline":
      classes =
        "bg-transparent hover:bg-white text-md font-medium py-3 px-4 my-4 border border-gray-200 text-gray-500 text-white hover:text-gray-600 transition-all duration-300";
      break;
    case "danger":
      classes =
        "bg-red-500 hover:bg-red-600 text-md font-medium py-3 px-4 my-4";
      break;
    default:
      classes =
        "bg-green-500 hover:bg-green-600 text-md font-medium py-3 px-4 my-4";
      break;
  }

  if (additionalClassNames) {
    classes += ` ${additionalClassNames}`;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
