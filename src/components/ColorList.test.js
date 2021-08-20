import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

//<ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
const colors = [ { color: "aliceblue", code: { hex: "#f0f8ff" }, id: 1}, { color: "limegreen", code: { hex: "#99ddbc"}, id: 2} ];

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]}/>);
});


test("Renders a list of colors without errors", () => {
    render(<ColorList colors={colors}/>)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const { rerender } = render(<ColorList colors={colors} editing={true}/>);

    const editForm = screen.queryByText(/edit color/i);
    expect(editForm).toBeInTheDocument();

    rerender(<ColorList colors={colors} editing={false}/>);
    expect(editForm).not.toBeInTheDocument();
});
