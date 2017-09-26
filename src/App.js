import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import logo from './logo.svg';
import './App.css';

import employeeStore from './common/stores/EmployeeStore';
import EditClient from './components/EditClient';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = {}
  }

  componentDidMount() {
    // Subscribe to changes
    employeeStore.addChangeListener(this.handleChange);
    employeeStore.getAll();
  }

  componentWillUnmount() {
    // Clean up listener
    employeeStore.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState(this.state);
  }

  openModal(id, event) {
    if (event.target.name != "deleteAction") {
      this.setState({selectedEmployeeId: id});
      this.setState({modalIsOpen: true});
    }
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  deleteEmployee(id) {
    employeeStore.deleteEmployee(id, () => {
      employeeStore.getAll();
    });
  }


  render() {

    let store = employeeStore;
    let clientCount = store.clientCount;
    let pageNumber = store.pageNumber;
    let nbrPages = store.nbrPages;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

          <table id="clientsList" role="grid" aria-readonly="true" className="table table-striped no-userselection listTable table-bordered">
              <thead>
              <tr scope="row">
              <th className="hidden-sm hidden-xs"><a onClick={() => store.sort('name')}>Name</a></th>
              <th><a onClick={() => store.sort('age')}>Age</a></th>
              <th><a onClick={() => store.sort('years')}>Years</a></th>
              <th>Department</th>
              <th>Actions</th> 
              </tr>
              </thead>
              <tbody>
              {store.employees.map(employee =>
                  <tr key={employee.id} onClick={(event) => this.openModal(employee.id, event)}>
                      <td className="hidden-sm hidden-xs">{employee.name}</td>
                      <td>{employee.age}</td>
                      <td>{employee.years}</td>
                      <td>{employee.department.name}</td>
                      <td><button name="deleteAction" className="btn btn-default" onClick={() => this.deleteEmployee(employee.id)}>X
                        <span className="sr-only">delete employee {employee.name}</span>
                        </button>
                      </td>
                  </tr>
              )}                                    
              </tbody>
          </table>

          <nav id="pagination" className="center text-center">
              <ul className="pagination">
                  <li className="{this.props.pageNumber == 0 ? 'disabled' : ''}">
                      <a onClick={store.previousPage} title="Aller à la page précédente"><span className="fa fa-arrow-left"></span></a>
                  </li>
                  <li><span>{pageNumber+1}/{nbrPages}</span></li>
                  <li>
                      <a onClick={store.nextPage} title="Aller à la page suivante"><span className="fa fa-arrow-right"></span></a>
                  </li>
              </ul>
          </nav>

          <button className="btn btn-primary" onClick={(event) => {this.openModal(0, event)}}>
            Ajouter
          </button>

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Edit an employee"
            shouldCloseOnOverlayClick={true}>

            <EditClient 
              employeeStore={store} 
              selectedEmployeeId={this.state.selectedEmployeeId} 
              closeModal={this.closeModal} />

          </Modal>

      </div>
    );
  }
}

export default App;
