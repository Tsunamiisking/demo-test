import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from '../src/app/components/Todo';

describe('Todo Component', () => {
  test('renders input and add button', () => {
    render(<Todo />);

    expect(screen.getByPlaceholderText(/add new task/i)).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<Todo />);

    const input = screen.getByPlaceholderText(/add new task/i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: 'Learn testing' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Learn testing')).toBeInTheDocument();
  });

  test('marks a task as complete', () => {
    render(<Todo />);

    const input = screen.getByPlaceholderText(/add new task/i);
    fireEvent.change(input, { target: { value: 'Write unit tests' } });
    fireEvent.click(screen.getByText(/add/i));

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const taskText = screen.getByText('Write unit tests');
    expect(taskText).toHaveStyle('text-decoration: line-through');
  });

  test('removes a task', () => {
    render(<Todo />);

    fireEvent.change(screen.getByPlaceholderText(/add new task/i), {
      target: { value: 'Remove me' },
    });
    fireEvent.click(screen.getByText(/add/i));

    fireEvent.click(screen.getByText('✖'));

    expect(screen.queryByText('Remove me')).not.toBeInTheDocument();
  });
});
