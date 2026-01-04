import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import { vi } from 'vitest';

const renderDashboard = () => render(
  <BrowserRouter>
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  </BrowserRouter>
);

describe('Dashboard Component', () => {
  let printSpy;

  beforeEach(() => {
    printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    localStorage.clear();
    const mockEmployees = [
      { id: '1', name: 'Alice Smith', gender: 'Female', state: 'New York', status: 'Active' },
      { id: '2', name: 'Bob Jones', gender: 'Male', state: 'Texas', status: 'Inactive' }
    ];
    localStorage.setItem('employees', JSON.stringify(mockEmployees));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays the correct total employee count in stats', () => {
    renderDashboard();
    // Find the stats card with blue border (Total Employees)
    const totalEmployeesCard = screen.getByText('Total Employees').closest('[class*="border-l-blue"]');
    const countElement = totalEmployeesCard.querySelector('.text-3xl');
    expect(countElement).toHaveTextContent('2');
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
