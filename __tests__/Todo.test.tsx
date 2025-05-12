import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from '../src/app/components/Todo';

describe('Todo Component', () => {
  test('renders header and empty state by default', () => {
    render(<Todo />);

    expect(screen.getByText(/task manager/i)).toBeInTheDocument();
    expect(screen.getByText(/your task list is empty/i)).toBeInTheDocument();
  });

  test('adds a new task to the list', () => {
    render(<Todo />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'Write unit tests' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Write unit tests')).toBeInTheDocument();
  });

  test('marks a task as complete', () => {
    render(<Todo />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    fireEvent.change(input, { target: { value: 'Test complete toggle' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    const checkbox = screen.getByLabelText(/mark as complete/i);
    fireEvent.click(checkbox);

    expect(screen.getByText('Test complete toggle')).toHaveClass('line-through');
  });
});
