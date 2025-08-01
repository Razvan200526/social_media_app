import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";

const container = document.getElementById('root');
if (!container) {
  throw new Error("Could not initalize root");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)
