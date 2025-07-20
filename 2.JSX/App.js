import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement => ReactElement-JS Object => HTMLElement(render)

const heading = React.createElement("h1", { id: "heading" }, "Hello React");
console.log(heading);

// JSX - is not HTML in JS (it is HTML like syntax or XML-like)
// JSX (transpiled before it reaches the JS) - PARCEL - Babel(js compiler)
// JSX => Babel transpiles it to React.createElement => ReactElement-JS Object => HTMLElement(render)
const jsxHeading = (
  <h1 id="heading" className="head">
    Namaste React using JSX
  </h1>
);
console.log(jsxHeading);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsxHeading);