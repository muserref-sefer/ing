import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import store, { RootState } from '../../store';
import { Employee } from '../../types/Employee';

@customElement('employee-form-dialog')
class EmployeeFormDialog extends connect(store)(LitElement) {
  @property({ type: Object }) employee: Employee = {
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
  @property({ type: Function }) onSubmit!: (employee: Employee) => void;
  @state() messages: any;

  stateChanged(state: RootState) {
    this.messages = state.language.messages;
  }

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 1em;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }

    input[type="text"],
    input[type="date"],
    input[type="email"],
    input[type="number"] {
      padding: 0.75em 1em;
      margin: 0.5em 0;
      font-size: 1em;
      color: #333;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 5px;
      outline: none;
      transition: all 0.3s ease;
    }

    button {
      padding: 0.75em 1em;
      margin: 0.5em 0;
      font-size: 1em;
      color: #fff;
      background-color: #ff7900;
      border: 1px solid #ddd;
      border-radius: 5px;
      outline: none;
      transition: all 0.3s ease;
    }
  `;

  render() {
    return html`
      <form @submit=${this._submitForm}>
        <input type="text" placeholder=${this.messages.firstName} .value=${this.employee.firstName} @input=${this._update('firstName')} required />
        <input type="text" placeholder=${this.messages.lastName} .value=${this.employee.lastName} @input=${this._update('lastName')} required />
        <input type="date" placeholder=${this.messages.dateOfEmployment} .value=${this.employee.dateOfEmployment} @input=${this._update('dateOfEmployment')} required />
        <input type="date" placeholder=${this.messages.dateOfBirth} .value=${this.employee.dateOfBirth} @input=${this._update('dateOfBirth')} required />
        <input type="text" placeholder=${this.messages.phone} .value=${this.employee.phone} @input=${this._update('phone')} required />
        <input type="email" placeholder=${this.messages.email} .value=${this.employee.email} @input=${this._update('email')} required />
        <input type="text" placeholder=${this.messages.department} .value=${this.employee.department} @input=${this._update('department')} required />
        <input type="text" placeholder=${this.messages.position} .value=${this.employee.position} @input=${this._update('position')} required />
        <button type="submit">${this.messages.submit}</button>
      </form>
    `;
  }

  private _update(field: keyof Employee) {
    return (event: Event) => {
      this.employee = { ...this.employee, [field]: (event.target as HTMLInputElement).value };
    };
  }

  private _submitForm(event: Event) {
    event.preventDefault();
    this.onSubmit(this.employee);
  }
}
