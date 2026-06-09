import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Counter button', () => {
  it('shows initial count and increments on click', () => {
    render(<App />);

    const counter = screen.getByRole('button', { name: /count is 0/i });
    expect(counter).toBeDefined();

    fireEvent.click(counter);
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeDefined();
  });
});
