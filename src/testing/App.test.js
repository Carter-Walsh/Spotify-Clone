import React from "react";
import App from "../components/App";
import { render } from "@testing-library/react";

test("App renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
});

test("App returns a value", () => {
    const { container } = render(<App />);
    expect(container.firstChild).not.toBeNull();
});



