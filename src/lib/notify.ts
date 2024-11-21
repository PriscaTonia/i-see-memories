import { toast } from "react-hot-toast";

type ToastType = "success" | "error" | "info" | "warning";

export const notify = (type: ToastType, message: string) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast(message); // Default info toast
      break;
    case "warning":
      toast(message, { icon: "⚠️" }); // Example custom icon
      break;
    default:
      console.warn(`Unsupported toast type: ${type}`);
      break;
  }
};

// Usage examples
// notify('success', 'Data saved successfully!');
// notify('error', 'Something went wrong!');
// notify('info', 'Here is some information.');
// notify('warning', 'Please proceed with caution.');
