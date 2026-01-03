import React, { useEffect } from "react";

const ErrorOrSuccessMsg = (props) => {
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    props;

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [successMessage]);

  return (
    <div>
      {successMessage && (
        <div className="rounded-md bg-(--color-success)/20 p-3">
          <p className="text-sm text-(--color-success)">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="rounded-md bg-(--color-error)/20 p-3">
          <p className="text-sm text-(--color-error)">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ErrorOrSuccessMsg;
