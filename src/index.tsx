import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import AuthProvider from "./context/authContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";

const container = document.getElementById('root');
if (!container) {
  throw new Error("Could not initalize root");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryProvider>

  </StrictMode>
)
