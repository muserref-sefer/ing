import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/Layout/Header';
import './components/Layout/Main';
import store, { RootState } from './store';
import { setLanguage } from './store/slices/language/languagceSlice';

@customElement('app-root')
class AppRoot extends LitElement {
  @state() language = 'tr';
  @state() messages: any = {};

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(() => this.stateChanged(store.getState()));
  }

  stateChanged(state: RootState) {
    this.language = state.language.language;
    this.messages = state.language.messages;
  }

  private _toggleLanguage() {
    const newLanguage = this.language === 'tr' ? 'en' : 'tr';
    store.dispatch(setLanguage(newLanguage));
  }

  render() {
    return html`
      <header-component .language=${this.language} .messages=${this.messages}></header-component>
      <main-content
        .messages=${this.messages}
      </main-content>
    `;
  }
}
