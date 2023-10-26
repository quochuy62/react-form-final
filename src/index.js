import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Connect redux
import { Provider } from "react-redux";
import { store } from "./redux/config.store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

/**
 * JS
 * div: thẻ html
 *
 * document.getElementById('root').innerHTML = "<div>Hello</div>";
 * => string
 *
 * Reactjs
 * div : đối tượng JSX
 * render(): xử lý obj JSX
 */
