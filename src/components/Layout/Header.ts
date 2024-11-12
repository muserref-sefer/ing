import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import store from '../../store';
import { setLanguage } from '../../store/slices/language/languagceSlice';

@customElement('header-component')
class HeaderComponent extends connect(store)(LitElement) {

  @property({ type: String }) language: 'tr' | 'en' = 'tr';
  @property({ type: Object }) messages: any;

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      background-color: #fff;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1em;
      background-color: #fff;
      color: white;
    }
    header .logo {
      display: block;
      height: 40px;
      margin-right: 1em;
    }
    header h1 {
      font-size: 1.5em;
      margin: 0;
    }

    @media (max-width: 768px) {
      header {
        align-items: start;
        flex-direction: column;
        padding: 0.5em;
      }
      nav {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.5em;
        margin-bottom: 0 !important;
      }
    }

    nav {
      margin: 1em 0;
    }
    nav a {
      padding: 0.5em 1em;
      text-decoration: none;
      background-color: #ff7a00;
      color: white;
      border-radius: 5px;
      margin-right: 1em;
    }
    .language-selector {
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1.2em;
      padding: 0.5em;
    }
  `;

  private _toggleLanguage() {
    const newLanguage = this.language === 'tr' ? 'en' : 'tr';
    store.dispatch(setLanguage(newLanguage));
  }

  render() {
    return html`
      <header>
        <a href="/">
          <img src="https://www.ing.com.tr/documents/IngBank/assets/img/logo.png" alt="Logo" class="logo" />
        </a>
        <nav>
          <a href="/">${this.messages.employeeList}</a>
          <a href="/add">${this.messages.addEmployee}</a>
          <button class="language-selector" @click=${this._toggleLanguage}>
            ${this.language === 'tr' ? '🇬🇧' : '🇹🇷'}
          </button>
        </nav>
      </header>
    `;
  }
}

export default HeaderComponent;
