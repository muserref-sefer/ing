import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../src/components/Employee/EmployeeFormDialog';
import '../../../src/pages/EditEmployeePage';
import store from '../../../src/store';

describe('EditEmployeePage', () => {
  let el: any;
  beforeEach(() => {
    el = document.createElement('edit-employee-page') as any;
    el.employeeId = 123;
    document.body.appendChild(el);
    (el as any).messages = { editEmployee: 'Edit' };
  });

  it('dispatches updateEmployee and navigates on submit', () => {
    const sample = { id: 123, firstName: 'X', lastName: 'Y', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' };
    const spy = vi.spyOn(store, 'dispatch');
    const prev = window.history.pushState;
    let pushed: any = null;
    window.history.pushState = (_s: any, _t: any, u: string) => (pushed = u) as any;

    (el as any)._editEmployee(sample);

    expect(spy).toHaveBeenCalled();
    expect(pushed).toBe('/');

    spy.mockRestore();
    window.history.pushState = prev;
  });

  it('renders not found when no employee', async () => {
    (el as any).employee = undefined;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).toContain('Employee not found');
  });

  it('renders form when employee exists', async () => {
    const sample = { id: 123, firstName: 'X', lastName: 'Y', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' };
    (el as any).employee = sample;
    await el.updateComplete;
    const form = el.shadowRoot.querySelector('employee-form-dialog');
    expect(form).toBeTruthy();
  });

  it('stateChanged assigns employee from store', () => {
    const mockState = { employees: { employees: [{ id: 123, firstName: 'X' }] }, language: { messages: { editEmployee: 'Edit' } } } as any;
    (el as any).employeeId = 123;
    (el as any).stateChanged(mockState);
    expect((el as any).employee).toBeDefined();
    expect((el as any).messages.editEmployee).toBe('Edit');
  });
});
