import React from "react";
import ReactDOM from "react-dom/client";

// React Element
const heading = (
    <h1 className="head" tabIndex="5">
        React Using JSX
    </h1>
)

const Title = () => (
    <h1 className="head" tabIndex="5">
        React Using JSX
    </h1>
)
// React Components => 1. Class based components, 2. Funtional components

// React Functional Component
// Component Composition
const number = 100000
const HeadingComponent = () => (
    <div id = "container">
        <Title />
        {
        //we can write any js code here
            <h1>{number}</h1>
        }
        <h1 className="heading">React Functional Component</h1>
    </div> 
);
// const HeadingComponent2 = () => {
//     <h1 className="heading">React Functional Component</h1>
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);