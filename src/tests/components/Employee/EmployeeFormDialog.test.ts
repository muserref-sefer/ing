import { describe, it, expect, beforeEach } from 'vitest';
import '../../../components/Employee/EmployeeFormDialog';

const tag = 'employee-form-dialog';

describe('EmployeeFormDialog', () => {
  let el: any;
  beforeEach(() => {
    el = document.createElement(tag) as any;
    document.body.appendChild(el);
    // provide a no-op messages to avoid undefined in placeholders
    (el as any).messages = {
      firstName: 'First',
      lastName: 'Last',
      dateOfEmployment: 'DOE',
      dateOfBirth: 'DOB',
      phone: 'Phone',
      email: 'Email',
      department: 'Dept',
      position: 'Pos',
      submit: 'Submit'
    };
    (el as any).employee = { id: 1, firstName: '', lastName: '', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' };
  });

  it('updates fields via _update and submits', () => {
    const update = (el as any)._update('firstName');
    const fakeEvent = { target: { value: 'Mustafa' } } as any;
    update(fakeEvent);
    expect((el as any).employee.firstName).toBe('Mustafa');

    let submitted: any;
    (el as any).onSubmit = (emp: any) => (submitted = emp);
    (el as any)._submitForm({ preventDefault: () => {} } as any);
    expect(submitted.firstName).toBe('Mustafa');
  });
});
