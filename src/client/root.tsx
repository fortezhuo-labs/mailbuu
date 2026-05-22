/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import "../assets/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Inbox } from "@/client/features/mail/inbox";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <Inbox />
  </StrictMode>
);

createRoot(elem).render(app);
