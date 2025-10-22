import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../src/components/Employee/EmployeeFormDialog';
import '../../../src/pages/AddEmployeePage';
import store from '../../../src/store';

describe('AddEmployeePage', () => {
  let el: any;
  beforeEach(() => {
    el = document.createElement('add-employee-page') as any;
    document.body.appendChild(el);
    (el as any).messages = { addEmployee: 'Add' };
  });

  it('dispatches addEmployee and navigates on submit', () => {
    const sample = { id: 1, firstName: 'A', lastName: 'B', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' };
    const spy = vi.spyOn(store, 'dispatch');
    const prev = window.history.pushState;
    let pushed: any = null;
    window.history.pushState = (_s: any, _t: any, u: string) => (pushed = u) as any;

    // call private handler directly
    (el as any)._addEmployee(sample);

    expect(spy).toHaveBeenCalled();
    expect(pushed).toBe('/');

    spy.mockRestore();
    window.history.pushState = prev;
  });

  it('updates messages via stateChanged', () => {
    const mockState = { language: { messages: { addEmployee: 'Add' } }, employees: { employees: [] } } as any;
    (el as any).stateChanged(mockState);
    expect((el as any).messages.addEmployee).toBe('Add');
  });
});
