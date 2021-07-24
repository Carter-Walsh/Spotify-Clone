import React from "react";
import Player from "../components/Player";
import { render } from "@testing-library/react";

test("player renders without crashing", () => {
    const { container } = render(<Player />);
    expect(container).toBeTruthy();
});



