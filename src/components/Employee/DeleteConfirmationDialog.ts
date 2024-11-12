import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import store, { RootState } from '../../store';
import { Employee } from '../../types/Employee';

@customElement('delete-confirmation-dialog')
class DeleteConfirmationDialog extends connect(store)(LitElement) {
  @property({ type: Object }) employee?: Employee;
  @state() messages: any;

  stateChanged(state: RootState) {
    this.messages = state.language.messages;
  }
  
  static styles = css`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialog {
      background: white;
      padding: 1.5em;
      border-radius: 8px;
      width: 300px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      text-align: center;
      position: relative;
    }
    .dialog h3 {
      color: #ff7a00;
      margin: 0 0 1em;
    }
    .dialog p {
      font-size: 0.9em;
      margin-bottom: 1.5em;
    }
    .dialog-actions {
      display: flex;
      gap: 1em;
    }
    .dialog-actions button {
      flex: 1;
      padding: 0.5em;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .dialog-actions .proceed {
      background-color: #ff7a00;
      color: white;
    }
    .dialog-actions .cancel {
      background-color: #e0e0e0;
      color: #333;
    }
  `;

  render() {
    if (!this.employee) return html``;

    return html`
      <div class="dialog-overlay">
        <div class="dialog">
          <h3>${this.messages.areYouSure}</h3>
          <p>${this.employee.firstName} ${this.employee.lastName} ${this.messages.willBeDeleted}.</p>
          <div class="dialog-actions">
            <button class="proceed" @click=${this._proceed}>${this.messages.proceed}</button>
            <button class="cancel" @click=${this._cancel}>${this.messages.cancel}</button>
          </div>
        </div>
      </div>
    `;
  }

  private _proceed() {
    this.dispatchEvent(new CustomEvent('proceed-delete', { detail: this.employee }));
    this.employee = undefined;
  }

  private _cancel() {
    this.dispatchEvent(new CustomEvent('cancel-delete'));
    this.employee = undefined;
  }
}
