import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeForm from '../components/EmployeeForm';
import { vi } from 'vitest';

describe('EmployeeForm Component', () => {
  const mockOnSave = vi.fn();
  const mockOnClose = vi.fn();

  it('validates required fields on submit', () => {
    render(<EmployeeForm onSave={mockOnSave} onClose={mockOnClose} />);
    const submitBtn = screen.getByRole('button', { name: /Save Employee/i });
    
    fireEvent.click(submitBtn);
    // Should not call onSave if fields are empty
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('fills data correctly when in Edit mode', () => {
    const existingEmployee = {
      name: 'John Doe',
      gender: 'Male',
      dob: '1990-01-01',
      state: 'California',
      status: 'Active'
    };
    
    render(<EmployeeForm employee={existingEmployee} onSave={mockOnSave} onClose={mockOnClose} />);
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('California')).toBeInTheDocument();
  });
});
