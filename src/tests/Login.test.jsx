import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const renderLogin = () => render(
  <BrowserRouter>
    <AuthProvider>
      <Login />
    </AuthProvider>
  </BrowserRouter>
);

describe('Login Component', () => {
  it('renders all input fields and submit button', () => {
    renderLogin();
    
    // Match by the Label text "Email Address" and "Password"
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('shows error message on invalid credentials', async () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passInput = screen.getByLabelText(/Password/i);
    const btn = screen.getByRole('button', { name: /Sign In/i });

    // Clear the default values and enter wrong ones
    fireEvent.change(emailInput, { target: { value: 'wrong@test.com' } });
    fireEvent.change(passInput, { target: { value: 'wrongpass' } });
    fireEvent.click(btn);

    // Ensure your Login component actually renders this text on failure
    expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
  });
});
