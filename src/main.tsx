import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthKitProvider } from "@workos-inc/authkit-react";
import { AUTHKIT_CLIENT_ID } from "@/constants";

import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <AuthKitProvider clientId={AUTHKIT_CLIENT_ID} devMode={true}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </AuthKitProvider>,
);
