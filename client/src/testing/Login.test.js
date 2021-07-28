import React from "react";
import Login from "../components/Login";
import { fireEvent, render } from "@testing-library/react";

test("login rendered without crashing", () => {
    const { container } = render(<Login />);
    expect(container).toBeTruthy();
});

test("login returns a value", () => {
    const { container } = render(<Login />)
    expect(container.firstChild).not.toBeNull();
});

test("check login button rendered correctly", () => {
    const { queryByTitle } = render (<Login />)
    const btn = queryByTitle("login-button");
    expect(btn).toBeTruthy();
});

test("login prints the correct text", () => {
    const { queryByTitle } = render (<Login />)
    const btn = queryByTitle("login-button");
    expect(btn.textContent).toBe("Login to Spotify");
});

test("button was clicked", () => {
    const { queryByTitle } = render (<Login />)
    const btn = queryByTitle("login-button");
    fireEvent.click(btn)
});


