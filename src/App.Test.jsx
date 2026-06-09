import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Dark Mode Toggle', () => {
  it('toggles button text between Light and Dark', () => {
    render(<App />);

    const toggle = screen.getByRole('button', { name: /light/i });
    expect(toggle).toBeDefined();

    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: /dark/i })).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: /dark/i }));
    expect(screen.getByRole('button', { name: /light/i })).toBeDefined();
  });
});