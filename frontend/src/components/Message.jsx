import React from "react";

const Message = ({ type, children }) => {
  const [errorCode, errorMessage] = children.split(": ");

  const successStyles =
    "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative";
  const warningStyles =
    "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative";
  const errorStyles =
    "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative";
  const infoStyles =
    "bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative";

  const styles = {
    success: successStyles,
    warning: warningStyles,
    error: errorStyles,
    info: infoStyles,
  };

  const iconStyles = {
    success: "fas fa-check-circle",
    warning: "fas fa-exclamation-circle",
    error: "fas fa-times-circle",
    info: "fas fa-info-circle",
  };

  let alertStyle = "";
  let icon = "";

  switch (type) {
    case "success":
      alertStyle = styles.success;
      icon = iconStyles.success;
      break;
    case "warning":
      alertStyle = styles.warning;
      icon = iconStyles.warning;
      break;
    case "error":
      alertStyle = styles.error;
      icon = iconStyles.error;

      break;
    case "info":
      alertStyle = styles.info;
      icon = iconStyles.info;
      break;
    default:
      alertStyle = styles.info;
      icon = iconStyles.info;
      break;
  }

  return (
    <div className={alertStyle} role="alert">
      <i className={`${icon} mr-2`}></i>
      <strong className="font-bold mr-2">{errorCode}:</strong>
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  );
};

export default Message;
