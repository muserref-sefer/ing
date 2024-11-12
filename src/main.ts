import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './index';
import store from './store';

@customElement('app-main')
class AppMain extends LitElement {
  render() {
    return html`
      <lit-redux-provider .store=${store}>
        <app-root></app-root>
      </lit-redux-provider>
    `;
  }
}
