import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';
import '@testing-library/jest-dom';

describe('Auth Page', () => {
  it('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    // 1. Check for labels (matches <label>Email Address</label>)
    expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
    
    // 2. Check for the button
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    
    // 3. Check for specific placeholders if needed
    expect(screen.getByPlaceholderText(/admin@example.com/i)).toBeInTheDocument();
  });
});
