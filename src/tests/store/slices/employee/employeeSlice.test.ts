import { describe, it, expect } from 'vitest';
import reducer, { setEmployees, addEmployee, updateEmployee, deleteEmployee } from '@/store/slices/employee/employeeSlice';
import { Employee } from '@/types/Employee';

const sample: Employee = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  dateOfEmployment: '2020-01-01',
  dateOfBirth: '1990-01-01',
  phone: '123',
  email: 'a@b.com',
  department: 'Eng',
  position: 'Dev'
};

describe('employee slice reducers', () => {
  it('should set employees', () => {
    const state = reducer(undefined, setEmployees([sample]));
    expect(state.employees).toHaveLength(1);
    expect(state.employees[0].id).toBe(1);
  });

  it('should add employee', () => {
    const state = reducer({ employees: [] }, addEmployee(sample));
    expect(state.employees).toHaveLength(1);
  });

  it('should update employee when exists', () => {
    const updated = { ...sample, firstName: 'Jane' };
    const state = reducer({ employees: [sample] }, updateEmployee(updated));
    expect(state.employees[0].firstName).toBe('Jane');
  });

  it('should not update when employee missing', () => {
    const updated = { ...sample, id: 999 };
    const state = reducer({ employees: [sample] }, updateEmployee(updated));
    expect(state.employees[0].id).toBe(1);
  });

  it('should delete employee', () => {
    const state = reducer({ employees: [sample] }, deleteEmployee(1));
    expect(state.employees).toHaveLength(0);
  });
});
