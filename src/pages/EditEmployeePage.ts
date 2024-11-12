import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import store, { RootState } from '../store';
import { updateEmployee } from '../store/slices/employee/employeeSlice';
import { Employee } from '../types/Employee';

import '../components/Employee/EmployeeFormDialog';

@customElement('edit-employee-page')
export class EditEmployeePage extends connect(store)(LitElement) {
  @property({ type: Number }) employeeId!: number;
  @state() employee: Employee | undefined;
  @state() messages: any;

  stateChanged(state: RootState) {
    this.employee = state.employees.employees.find(emp => emp.id === this.employeeId);
    this.messages = state.language.messages;
  }

  render() {
    if (!this.employee) return html`<p>Employee not found</p>`;

    return html`
      <h3>${this.messages.editEmployee}</h3>
      <employee-form-dialog .employee=${this.employee} .onSubmit=${this._editEmployee}></employee-form-dialog>
    `;
  }

  private _editEmployee = (employee: Employee) => {
    store.dispatch(updateEmployee(employee));
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new CustomEvent('location-changed'));
  };
}
