import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { HydrateAtoms } from "./components/HydrateAtoms.tsx";
import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HydrateAtoms>
      <Suspense fallback={"Loading..."}>
        <App />
        <ReactQueryDevtools />
      </Suspense>
    </HydrateAtoms>
  </StrictMode>
);
