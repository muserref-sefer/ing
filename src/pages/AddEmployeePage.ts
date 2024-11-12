import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import store, { RootState } from '../store';
import { addEmployee } from '../store/slices/employee/employeeSlice';
import { Employee } from '../types/Employee';

import { connect } from 'pwa-helpers';
import '../components/Employee/EmployeeFormDialog';

@customElement('add-employee-page')
export class AddEmployeePage extends connect(store)(LitElement) {
  @state() messages: any;

  private employee: Employee = {
    id: Date.now(),
    firstName: '',
    lastName: '',
    dateOfEmployment: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    department: '',
    position: '',
  };

  stateChanged(state: RootState) {
    this.messages = state.language.messages;
  }

  render() {
    return html`
      <h3>${this.messages.addEmployee}</h3>
      <employee-form-dialog .employee=${this.employee} .onSubmit=${this._addEmployee}></employee-form-dialog>
    `;
  }

  private _addEmployee = (employee: Employee) => {
    store.dispatch(addEmployee(employee));
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new CustomEvent('location-changed'));
  };
}
