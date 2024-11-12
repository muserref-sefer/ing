import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import store, { RootState } from '../../store';
import { deleteEmployee } from '../../store/slices/employee/employeeSlice';
import { Employee } from '../../types/Employee';

import './DeleteConfirmationDialog';

@customElement('employee-list-component')
export class EmployeeListComponent extends connect(store)(LitElement) {
  @state() employees: Employee[] = [];
  @state() currentPage: number = 1;
  @state() itemsPerPage: number = 5;
  @state() totalPages: number = 1;
  @state() messages: any;
  @state() employeeToDelete?: Employee;

  static styles = css`
    .table-container {
      overflow-y: auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-top: 1em;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 0.75em;
      border: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f7f7f7;
    }

    .actions {
      display: flex;
      gap: 0.5em;
    }
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 1em;
      align-items: center;
    }
    button {
      padding: 0.5em 1em;
      margin: 0 0.5em;
      border: none;
      background-color: #ff7a00;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
    button[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .pagination {
        gap: 0.5em;
      }
      .actions {
        justify-content: center;
      }
    }
  `;

  stateChanged(state: RootState) {
    this.employees = state.employees.employees;
    this.messages = state.language.messages;
    this._updateTotalPages();
  }

  private _updateTotalPages() {
    this.totalPages = Math.max(1, Math.ceil(this.employees.length / this.itemsPerPage));
    this.currentPage = Math.min(this.currentPage, this.totalPages);
  }

  private get paginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.employees.slice(startIndex, endIndex);
  }

  private nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  private prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  render() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>${this.messages.firstName}</th>
              <th>${this.messages.lastName}</th>
              <th>${this.messages.dateOfEmployment}</th>
              <th>${this.messages.dateOfBirth}</th>
              <th>${this.messages.phone}</th>
              <th>${this.messages.email}</th>
              <th>${this.messages.department}</th>
              <th>${this.messages.position}</th>
              <th>${this.messages.actions}</th>
            </tr>
          </thead>
          <tbody>
            ${this.paginatedEmployees.length > 0
              ? this.paginatedEmployees.map(
                  (employee) => html`
                    <tr>
                      <td>${employee.firstName}</td>
                      <td>${employee.lastName}</td>
                      <td>${employee.dateOfEmployment}</td>
                      <td>${employee.dateOfBirth}</td>
                      <td>${employee.phone}</td>
                      <td>${employee.email}</td>
                      <td>${employee.department}</td>
                      <td>${employee.position}</td>
                      <td class="actions">
                        <button @click=${() => this._editEmployee(employee)}>${this.messages.edit}</button>
                        <button @click=${() => this._confirmDelete(employee)}>${this.messages.delete}</button>
                      </td>
                    </tr>
                  `
                )
              : html`
                  <tr>
                    <td colspan="9" style="text-align: center;">${this.messages.noResults ?? 'No result found'}</td>
                  </tr>
                `}
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <button @click=${this.prevPage} ?disabled=${this.currentPage === 1}>${this.messages.previous}</button>
        <span>${this.messages.page} ${this.currentPage} / ${this.totalPages}</span>
        <button @click=${this.nextPage} ?disabled=${this.currentPage === this.totalPages}>${this.messages.next}</button>
      </div>

      ${this.employeeToDelete
        ? html`
            <delete-confirmation-dialog
              .employee=${this.employeeToDelete}
              @proceed-delete=${this._onDeleteConfirmed}
              @cancel-delete=${this._onCancelDelete}
            ></delete-confirmation-dialog>
          `
        : ''}
    `;
  }

  private _editEmployee(employee: Employee) {
    window.history.pushState({}, '', `/edit/${employee.id}`);
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  private _confirmDelete(employee: Employee) {
    this.employeeToDelete = employee;
  }

  private _onDeleteConfirmed(event: CustomEvent) {
    const employee = event.detail as Employee;
    store.dispatch(deleteEmployee(employee.id));
    this.employeeToDelete = undefined;
  }

  private _onCancelDelete() {
    this.employeeToDelete = undefined;
  }
}
