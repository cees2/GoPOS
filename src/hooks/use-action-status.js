import { useState } from "react";

const useActionStatus = () => {
  const [actionResult, setActionResult] = useState("");

  const resetActionResult = () => {
    setTimeout(() => {
      setActionResult((prevState) => {
        return {
          type: prevState.type,
          message: prevState.message,
          isActive: false,
        };
      });
    }, 3500);
    setTimeout(() => setActionResult(""), 4000);
  };

  const setAction = (type, message) => {
    setActionResult({
      type,
      message,
      isActive: true,
    });
    resetActionResult();
  };

  return {
    actionResult,
    setAction,
  };
};

export default useActionStatus;
