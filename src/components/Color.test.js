import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const color = {
    color: '',
    code: {
        hex: ''
    },
    id: ''
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={color}/>);
});
  
test("Renders the color passed into component", () => {
    render(<Color color={ { color: 'black', code: { hex: '#0000'}, id: '100' } } />);
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const handleDelete = jest.fn();
    const handleEdit = jest.fn();

    render(<Color color={color} deleteColor={handleDelete} toggleEdit={handleEdit} />);

    const deleteBtn = screen.getByTestId('delete');
    userEvent.click(deleteBtn);

    expect(handleDelete).toBeCalled();
    expect(handleEdit).toBeCalled();
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const editColor = jest.fn();
    const setColor = jest.fn();
    render(<Color color={color} toggleEdit={editColor} setEditColor={setColor} />);
  
    const colorDiv = document.querySelector(".color-box");

    expect(colorDiv).toBeInTheDocument();
    userEvent.click(colorDiv);
    expect(editColor).toBeCalledTimes(1);
    expect(setColor).toBeCalledTimes(1);
});