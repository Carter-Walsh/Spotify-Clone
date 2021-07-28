import React from "react";
import Dashboard from "../components/Dashboard";
import { render } from "@testing-library/react";

test("dashboard renders without crashing", () => {
    const { container } = render(<Dashboard />);
    expect(container).toBeTruthy();
});

test("dashboard returns a value", () => {
    const { container } = render(<Dashboard />)
    expect(container.firstChild).not.toBeNull();
});

test("title should appear", () => {
    const { queryByTitle } = render(<Dashboard />);
    const header = queryByTitle("header");
    expect(header.textContent).toBe("Dashboard");
});



