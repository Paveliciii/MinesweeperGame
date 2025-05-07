import { createRoot } from "react-dom/client";
import FixedMinesweeper from "./FixedMinesweeper";
import "./minesweeper.css";

// Ensure the Telegram Web App API is defined
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        expand: () => void;
        showAlert: (message: string) => void;
        platform: string;
      };
    };
  }
}

// Initialize Telegram Web App if available
if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.expand();
}

createRoot(document.getElementById("root")!).render(<FixedMinesweeper />);
