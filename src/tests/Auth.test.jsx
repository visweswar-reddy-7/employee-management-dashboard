import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';
import '@testing-library/jest-dom';

const renderWithAuth = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Page Authentication', () => {
  it('renders login form correctly', () => {
    renderWithAuth(<Login />);
    expect(screen.getByPlaceholderText(/admin@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('shows error on wrong credentials', () => {
    renderWithAuth(<Login />);
    
    const emailInput = screen.getByPlaceholderText(/admin@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    const submitButton = screen.getByText(/Sign In/i);

    fireEvent.change(emailInput, { target: { value: 'wrong@user.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
  });

  it('successfully logs in with correct credentials', () => {
    renderWithAuth(<Login />);
    
    const emailInput = screen.getByPlaceholderText(/admin@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    const submitButton = screen.getByText(/Sign In/i);

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(localStorage.getItem('isLoggedIn')).toBe('true');
  });
});
