import { describe, it, expect, beforeEach } from 'vitest';
import '../../../../src/components/Employee/DeleteConfirmationDialog';
import { Employee } from '../../../../src/types/Employee';

describe('DeleteConfirmationDialog', () => {
  let el: any;
  const sample: Employee = {
    id: 2,
    firstName: 'A',
    lastName: 'B',
    dateOfEmployment: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    department: '',
    position: '',
  };

  beforeEach(() => {
    el = document.createElement('delete-confirmation-dialog') as any;
    document.body.appendChild(el);
    el.employee = sample;
  });

  it('emits proceed-delete on proceed', () => {
    let detail: any;
    el.addEventListener('proceed-delete', (e: any) => (detail = e.detail));
    (el as any)._proceed();
    expect(detail).toEqual(sample);
    expect(el.employee).toBeUndefined();
  });

  it('emits cancel-delete on cancel', () => {
    let called = false;
    el.addEventListener('cancel-delete', () => (called = true));
    (el as any)._cancel();
    expect(called).toBe(true);
    expect(el.employee).toBeUndefined();
  });
});
