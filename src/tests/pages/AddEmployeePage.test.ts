import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';

import { AddEmployeePage } from '../../pages/AddEmployeePage';
import store from '../../store';

describe('AddEmployeePage', () => {
  let element: AddEmployeePage;

  beforeEach(async () => {
    element = await fixture(html`<add-employee-page></add-employee-page>`);
  });

  it('adds a new employee when form is submitted', async () => {
    const dispatchSpy = sinon.spy(store, 'dispatch');
    const firstNameInput = element.shadowRoot?.querySelector('input[placeholder="First Name"]') as HTMLInputElement;
    const lastNameInput = element.shadowRoot?.querySelector('input[placeholder="Last Name"]') as HTMLInputElement;
    const emailInput = element.shadowRoot?.querySelector('input[placeholder="Email"]') as HTMLInputElement;
    const submitButton = element.shadowRoot?.querySelector('button[type="submit"]') as HTMLButtonElement;

    firstNameInput.value = 'Jane';
    firstNameInput.dispatchEvent(new Event('input'));
    lastNameInput.value = 'Doe';
    lastNameInput.dispatchEvent(new Event('input'));
    emailInput.value = 'jane.doe@example.com';
    emailInput.dispatchEvent(new Event('input'));

    submitButton.click();

    await element.updateComplete;

    expect(dispatchSpy.calledOnce).to.be.true;
    const dispatchedAction = dispatchSpy.getCall(0).args[0];
    expect(dispatchedAction).to.have.property('type', 'employee/addEmployee');
    expect(dispatchedAction.payload).to.include({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
    });
    dispatchSpy.restore();
  });
});
