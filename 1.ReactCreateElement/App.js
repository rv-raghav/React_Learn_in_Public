import React from "react";
import { createRoot } from "react-dom/client";
/**
 *
 * <div id="parent">
 *      <div id ="child">
 *          <h1>I'm h1 tag</h1>
 *          <h2>I'm h2 tag</h2>
 *      <div>
 *      <div id ="child2">
 *          <h1>I'm h1 tag</h1>
 *          <h2>I'm h2 tag</h2>
 *      <div>
 * </div>
 *
 * ReactElement(Object) => HTML(Browser Understands)
 *
 */
// const parent = React.createElement("tag",{attribute},children(if multiple children pass as an array))

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child", key: "child-1" }, [
    React.createElement("h1", { key: "h1-1" }, "I'm h1 tag"),
    React.createElement("h2", { key: "h2-1" }, "I'm h2 tag"),
  ]),
  React.createElement("div", { id: "child2", key: "child-2" }, [
    React.createElement("h1", { key: "h1-2" }, "I'm h1 tag"),
    React.createElement("h2", { key: "h2-2" }, "I'm h2 tag"),
  ]),
]);

// const heading = React.createElement(
//   "h1",
//   { id: "heading" },
//   "Hello World from React"
// );
// console.log(heading); //object

const root = createRoot(document.getElementById("root"));
root.render(parent);