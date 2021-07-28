import React from "react";
import Song from "../components/Song";
import { render } from "@testing-library/react";

test("song rendered without crashing", () => {
    const { container } = render(<Song />);
    expect(container).toBeTruthy();
});

test("song should return content", () => {
    const { container } = render(<Song />)
    expect(container.firstChild).not.toBeNull();
});