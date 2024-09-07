// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "bulma/css/bulma.min.css";
import "font-awesome/css/font-awesome.min.css";
import { HistoryProvider } from "./HistoryContext"; // Import HistoryProvider

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HistoryProvider> {/* Wrap App with HistoryProvider */}
            <div className="container">
                <App />
            </div>
        </HistoryProvider>
    </React.StrictMode>
);
