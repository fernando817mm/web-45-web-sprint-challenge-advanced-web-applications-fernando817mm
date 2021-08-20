import React from 'react';
import MutationObserver from 'mutationobserver-shim';
// import * as axios from 'axios';

import { render, screen} from "@testing-library/react";
import BubblePage from './BubblePage';

// jest.mock('axios');

// const colors = [ { color: "aliceblue", code: { hex: "#f0f8ff" }, id: 1}, { color: "limegreen", code: { hex: "#99ddbc"}, id: 2} ];

test("Renders without errors", ()=> {
    render(<BubblePage/>);
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.
    render(<BubblePage/>);

});