import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="top-right" // Position to display toast
      autoClose={3000} // Auto close after 3 seconds
      hideProgressBar={false} // Show the progress bar
      newestOnTop={true} // Show latest toast on top
      closeOnClick // Close on click
      rtl={false} // Support for right-to-left languages
      pauseOnFocusLoss // Pause the timer on focus loss
      draggable // Allow dragging to close
      pauseOnHover // Pause the timer on hover
      theme="colored" // Set colored theme
    />
  );
};

export const showSuccessToast = (message) => {
  toast.success(message); 
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showInfoToast = (message) => {
  toast.info(message);
};

export const showWarningToast = (message) => {
  toast.warning(message);
};

export default Toast;
