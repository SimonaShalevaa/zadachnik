import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import UserProvider from "./contexts/UserProvider";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
