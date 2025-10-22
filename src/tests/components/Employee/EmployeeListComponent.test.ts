import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@/components/Employee/EmployeeListComponent';
import store from '@/store';
import { deleteEmployee } from '@/store/slices/employee/employeeSlice';

const tag = 'employee-list-component';

describe('EmployeeListComponent pagination and actions', () => {
  let el: any;
  beforeEach(() => {
    el = document.createElement(tag) as any;
    document.body.appendChild(el);
    (el as any).messages = {
      firstName: 'First', lastName: 'Last', dateOfEmployment: 'DOE', dateOfBirth: 'DOB', phone: 'Phone', email: 'Email', department: 'Dept', position: 'Pos', actions: 'Actions', edit: 'Edit', delete: 'Delete', previous: 'Prev', next: 'Next', page: 'Page', noResults: 'No results'
    };
  });

  it('calculates pagination correctly', () => {
    const employees = Array.from({ length: 12 }).map((_, i) => ({ id: i + 1, firstName: 'a', lastName: 'b', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' }));
    (el as any).employees = employees;
    (el as any)._updateTotalPages();
    expect((el as any).totalPages).toBe(Math.ceil(12 / (el as any).itemsPerPage));

    (el as any).currentPage = 1;
    (el as any).nextPage();
    expect((el as any).currentPage).toBe(2);

    (el as any).prevPage();
    expect((el as any).currentPage).toBe(1);
  });

  it('sets employeeToDelete and cancels', () => {
    const emp = { id: 5, firstName: 'X', lastName: 'Y', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' };
    (el as any)._confirmDelete(emp);
    expect((el as any).employeeToDelete).toEqual(emp);
    (el as any)._onCancelDelete();
    expect((el as any).employeeToDelete).toBeUndefined();
  });

  it('renders no results when empty', async () => {
    (el as any).employees = [];
    await el.updateComplete;
    const td = el.shadowRoot.querySelector('tbody td');
    expect(td.textContent.trim()).toContain((el as any).messages.noResults || 'No result found');
  });

  it('renders rows and edit/delete buttons work', async () => {
    const employees = [{ id: 9, firstName: 'Edit', lastName: 'Me', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' }];
    (el as any).employees = employees;
    await el.updateComplete;
    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);

    const editBtn = el.shadowRoot.querySelector('button');
    const prev = window.history.pushState;
    let pushed = null as any;
    window.history.pushState = (s: any, t: any, u: string) => (pushed = u) as any;
    editBtn.click();
    expect(pushed).toContain('/edit/');
    window.history.pushState = prev;

    const deleteBtn = el.shadowRoot.querySelectorAll('button')[1];
    deleteBtn.click();
    expect((el as any).employeeToDelete).toBeDefined();
  });

  it('handles proceed-delete and cancel-delete from dialog', async () => {
    const emp = { id: 33, firstName: 'D', lastName: 'E', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' };
    (el as any).employeeToDelete = emp;
    await el.updateComplete;

    const dialog = el.shadowRoot.querySelector('delete-confirmation-dialog');
    expect(dialog).toBeTruthy();

    const spy = vi.spyOn(store, 'dispatch');

    dialog.dispatchEvent(new CustomEvent('proceed-delete', { detail: emp }));
    await el.updateComplete;
    expect(spy).toHaveBeenCalled();
    expect((el as any).employeeToDelete).toBeUndefined();

    (el as any).employeeToDelete = emp;
    await el.updateComplete;
    const dialog2 = el.shadowRoot.querySelector('delete-confirmation-dialog');
    dialog2.dispatchEvent(new CustomEvent('cancel-delete'));
    await el.updateComplete;
    expect((el as any).employeeToDelete).toBeUndefined();
    spy.mockRestore();
  });

  it('shows default noResults when messages.noResults is missing', async () => {
    (el as any).messages = {};
    (el as any).employees = [];
    await el.updateComplete;
    const td = el.shadowRoot.querySelector('tbody td');
    expect(td.textContent).toContain('No result found');
  });

  it('_updateTotalPages clamps currentPage when too large', () => {
    const employees = Array.from({ length: 2 }).map((_, i) => ({ id: i + 1, firstName: 'a', lastName: 'b', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' }));
    (el as any).employees = employees;
    (el as any).itemsPerPage = 1;
    (el as any).currentPage = 10;
    (el as any)._updateTotalPages();
    expect((el as any).totalPages).toBe(2);
    expect((el as any).currentPage).toBe(2);
  });

  it('paginatedEmployees returns correct slice on last page', () => {
    const employees = Array.from({ length: 7 }).map((_, i) => ({ id: i + 1, firstName: 'n', lastName: 'n', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' }));
    (el as any).employees = employees;
    (el as any).itemsPerPage = 3;
    (el as any).currentPage = 3; 
    const paged = (el as any).paginatedEmployees;
    expect(paged.length).toBe(1);
  });

  it('nextPage and prevPage are no-ops at boundaries', () => {
    (el as any).employees = Array.from({ length: 4 }).map((_, i) => ({ id: i + 1, firstName: 'x', lastName: 'y', dateOfEmployment: '', dateOfBirth: '', phone: '', email: '', department: '', position: '' }));
    (el as any).itemsPerPage = 2;
    (el as any)._updateTotalPages();
    (el as any).currentPage = (el as any).totalPages;
    (el as any).nextPage();
    expect((el as any).currentPage).toBe((el as any).totalPages);

    (el as any).currentPage = 1;
    (el as any).prevPage();
    expect((el as any).currentPage).toBe(1);
  });
});
