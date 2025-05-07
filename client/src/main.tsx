import { createRoot } from "react-dom/client";
import FixedMinesweeper from "./FixedMinesweeper";
import "./minesweeper.css";

createRoot(document.getElementById("root")!).render(<FixedMinesweeper />);
