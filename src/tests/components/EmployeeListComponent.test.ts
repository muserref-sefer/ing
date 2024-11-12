import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { EmployeeListComponent } from '../../components/Employee/EmployeeListComponent';
import store from '../../store';
import { addEmployee, deleteEmployee } from '../../store/slices/employee/employeeSlice';
import { setLanguage } from '../../store/slices/language/languagceSlice';

describe('EmployeeListComponent', () => {
  let element: EmployeeListComponent;

  beforeEach(async () => {
    element = await fixture(html`<employee-list-component></employee-list-component>`);
  });

  it('renders employees', async () => {
    const newEmployee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2023-11-10',
      dateOfBirth: '1990-05-05',
      phone: '+123456789',
      email: 'john.doe@example.com',
      department: 'Engineering',
      position: 'Developer'
    };
    store.dispatch(addEmployee(newEmployee));
    element.requestUpdate();
    await element.updateComplete;
    expect(element.shadowRoot?.textContent).to.contain('John');
  });

  it('displays no result message when there are no employees', async () => {
    store.dispatch(deleteEmployee(1));
    element.requestUpdate();
    await element.updateComplete;
    expect(element.shadowRoot?.textContent).to.contain(element.messages.noResults || 'No result found');
  });

  it('should change language to Turkish', async () => {
    store.dispatch(setLanguage('tr'));
    element.requestUpdate();
    await element.updateComplete;
    expect(element.messages.firstName).to.equal('İsim'); 
  });

  it('should change language to English', async () => {
    store.dispatch(setLanguage('en'));
    element.requestUpdate();
    await element.updateComplete;
    expect(element.messages.firstName).to.equal('First Name'); 
  });
});
