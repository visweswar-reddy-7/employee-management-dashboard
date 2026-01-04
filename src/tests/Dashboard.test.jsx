import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';

const renderDashboard = () => render(
  <BrowserRouter>
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  </BrowserRouter>
);

describe('Dashboard Component', () => {
  // Use vi.spyOn to track window.print calls
  const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

  beforeEach(() => {
    localStorage.clear();
    const mockEmployees = [
      { id: '1', name: 'Alice Smith', gender: 'Female', state: 'New York', status: 'Active' },
      { id: '2', name: 'Bob Jones', gender: 'Male', state: 'Texas', status: 'Inactive' }
    ];
    localStorage.setItem('employees', JSON.stringify(mockEmployees));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks(); // This clears the printSpy call history between tests
  });

  it('displays the correct total employee count in stats', () => {
    renderDashboard();
    const totalStat = screen.getByText('2');
    expect(totalStat).toBeInTheDocument();
  });

  it('filters results based on search input', () => {
    renderDashboard();
    const searchInput = screen.getByPlaceholderText(/Search by name/i);
    
    fireEvent.change(searchInput, { target: { value: 'Alice' } });
    
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.queryByText('Bob Jones')).not.toBeInTheDocument();
  });

  it('triggers window.print when print button is clicked', () => {
    renderDashboard();
    
    const printBtn = screen.getByTitle('Print List'); 
    fireEvent.click(printBtn);
    
    // Check the spy instead of the raw window object
    expect(printSpy).toHaveBeenCalled();
  });
});
