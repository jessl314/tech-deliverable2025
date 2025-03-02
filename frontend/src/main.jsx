import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

