import { toast } from "react-toastify";
import { css } from "glamor";

export default {
  success: (message: string, duration?: number) => {
    toast.success(`✔️ ${message}`, {
      autoClose: duration ? duration : 2000,
      closeButton: false,
      className: String(
        css({
          background: "#BFFCC6 !important",
          color: "#068314 !important",
        })
      ),
    });
  },
  warning: (message: string, duration?: number) => {
    toast.warning(`⚠️ ${message}`, {
      autoClose: duration ? duration : 2000,
      closeButton: false,
      className: String(css({
        background: "#FFFFD1 !important",
        color: "#5a5a00 !important",
      }))
    });
  },
  error: (message: string, duration?: number) => {
    toast.error(`❌ ${message}`, {
      autoClose: duration ? duration : 5000,
      closeButton: false,
      className: String(css({
        background: "#FFBEBC !important",
        color: "#670300 !important",
      }))
    });
  }
};
