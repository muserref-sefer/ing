import { describe, it, expect } from 'vitest';
import '../../pages/EmployeeListPage';

describe('EmployeeListPage', () => {
  it('renders employee-list-component', async () => {
    const el = document.createElement('employee-list') as any;
    document.body.appendChild(el);
    await el.updateComplete;
    const found = el.shadowRoot.querySelector('employee-list-component');
    expect(found).toBeTruthy();
  });
});
