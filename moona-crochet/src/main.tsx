import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

// Railway API URL - set karo environment variable mein
const apiUrl = import.meta.env.VITE_API_URL ?? "";
setBaseUrl(apiUrl);

createRoot(document.getElementById("root")!).render(<App />);
