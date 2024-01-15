import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./App.css";

export function mouseback() {
  console.info("Initialising mouseback app");
  let apiKeyScriptSrc = null;

  const scripts = document.querySelectorAll("script");
  for (const script of scripts) {
    if (script.src.includes("widget") || script.src.includes("main.tsx")) {
      if (script.src.includes("apiKey")) {
        apiKeyScriptSrc = script.src;
        break;
      }
    }
  }

  const configuration = {
    apiKey: apiKeyScriptSrc?.split("apiKey=")[1] || "",
  };

  if (!configuration.apiKey) {
    return console.error("API key is required!!!");
  }

  const mousebackWidgetId = "mouseback-widget";
  const root = document.createElement("div");
  root.id = mousebackWidgetId;
  root.className = "msbk-";
  document.body.appendChild(root);

  ReactDOM.createRoot(root).render(<App {...configuration} />);
}

mouseback();
