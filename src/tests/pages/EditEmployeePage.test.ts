import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';

import { EditEmployeePage } from '../../pages/EditEmployeePage';
import store from '../../store';
import { addEmployee } from '../../store/slices/employee/employeeSlice';
import { Employee } from '../../types/Employee';

describe('EditEmployeePage', () => {
  let element: EditEmployeePage;
  
  const mockEmployee: Employee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    dateOfEmployment: '2023-11-10',
    dateOfBirth: '1990-05-05',
    phone: '+123456789',
    email: 'john.doe@example.com',
    department: 'Engineering',
    position: 'Developer',
  };

  beforeEach(async () => {
    store.dispatch(addEmployee(mockEmployee));
    element = await fixture(html`<edit-employee-page .employeeId=${mockEmployee.id}></edit-employee-page>`);
  });

  it('edits an existing employee when form is submitted', async () => {
    const dispatchSpy = sinon.spy(store, 'dispatch');
    const firstNameInput = element.shadowRoot?.querySelector('input[placeholder="First Name"]') as HTMLInputElement;
    const submitButton = element.shadowRoot?.querySelector('button[type="submit"]') as HTMLButtonElement;

    firstNameInput.value = 'Johnny';
    firstNameInput.dispatchEvent(new Event('input'));

    submitButton.click();

    await element.updateComplete;

    expect(dispatchSpy.calledOnce).to.be.true;
    const dispatchedAction = dispatchSpy.getCall(0).args[0];
    expect(dispatchedAction).to.have.property('type', 'employee/updateEmployee');
    expect(dispatchedAction.payload).to.include({
      id: mockEmployee.id,
      firstName: 'Johnny',
    });

    dispatchSpy.restore();
  });
});