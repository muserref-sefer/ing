import { Router } from '@lit-labs/router';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../pages/AddEmployeePage';
import '../../pages/EditEmployeePage';
import '../../pages/EmployeeListPage';

@customElement('main-content')
class MainContentComponent extends LitElement {
  private router = new Router(this, [
    { path: '/', render: () => html`<employee-list></employee-list>` },
    { path: '/add', render: () => html`<add-employee-page></add-employee-page>` },
    { path: '/edit/:id', render: (params) => html`<edit-employee-page .employeeId=${Number(params.id)}></edit-employee-page>` },
  ]);

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('location-changed', () => {
      this.router.goto(window.location.pathname);
    });
  }

  disconnectedCallback() {
    window.removeEventListener('location-changed', () => {
      this.router.goto(window.location.pathname);
    });
    super.disconnectedCallback();
  }

  render() {
    return html`${this.router.outlet()}`;
  }
}
