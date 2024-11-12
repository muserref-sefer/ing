
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/Employee/EmployeeListComponent';

@customElement('employee-list')
class EmployeeList extends LitElement {
  render() {
      return html`
        <employee-list-component></employee-list-component>`
    }
}