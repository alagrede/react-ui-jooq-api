import React, { Component } from 'react';
import axios from 'axios';
import AppUtil from '../common/tools/AppUtil';

class EditClient extends Component {

  constructor(props) {
    super(props);  
    this.edit = this.edit.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = AppUtil.handleInputChange.bind(this);

    this.state = {
        error: "",
        selectedEmployee: {
            department_id: 1 // the default department
        },
        departments: [] 
    };
  }

  componentWillMount() {
    // Subscribe to changes
    this.props.employeeStore.addChangeListener(this.handleChange);
    this.loadData();
  }

  componentWillUnmount() {
    // Clean up listener
    this.props.employeeStore.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Know data your looking for
    this.setState({departments: this.props.employeeStore.departments});
    //this.setState(this.state);
  }


  loadData() {
    this.props.employeeStore.loadDepartment();

    if (this.props.selectedEmployeeId != 0) {
        this.props.employeeStore.loadEmployee(this.props.selectedEmployeeId, (r) => { 
            this.setState({selectedEmployee: r}); 
        });
    }
  }

  edit(e) {
    e.preventDefault();
    this.props.employeeStore.saveEmployee(this.state.selectedEmployee, (error) => {
        if (error){
            AppUtil.removeErrors();
            AppUtil.displayErrors(error.response.data);
            //this.setState({error: error.response.data});
        } else {
            //this.setState({error: ""});
            this.props.employeeStore.getAll();
            this.props.closeModal();
        }
    });    
  }

  render() {

      let selectedEmployee = this.state.selectedEmployee;

        return (

            <form onSubmit={this.edit}>
                
                <h2>Edition employé</h2>
                
                {/* <ErrorHeader error={this.state.error} /> */}
                
                <div className="form-group">
                    <label htmlFor="code">Name</label>
                    <input 
                        className="form-control" 
                        id="name" 
                        name="selectedEmployee.name" 
                        value={selectedEmployee.name}
                        onChange={this.handleInputChange} />    
                </div>
                <div className="form-group">
                    <label htmlFor="code">Age</label>
                    <input 
                        className="form-control" 
                        id="age" 
                        name="selectedEmployee.age" 
                        value={selectedEmployee.age}
                        onChange={this.handleInputChange} />    
                </div>
                <div className="form-group">
                    <label htmlFor="code">Years</label>
                    <input 
                        className="form-control" 
                        id="years" 
                        name="selectedEmployee.years" 
                        value={selectedEmployee.years}
                        onChange={this.handleInputChange} />    
                </div>

                 
                <div className="form-group">
                    <label htmlFor="departmentEditInput" className="col-xs-3 control-label">Type de client</label>
                    
                    <select id="departmentEditInput" name="selectedEmployee.department_id" 
                        value={selectedEmployee.department_id} 
                        onChange={this.handleInputChange} className="form-control">
                        {this.state.departments.map(department => 
                            <option key={department.id} value={department.id}>{department.name}</option>
                        )}
                    </select> 
                </div>
                
                <div className="form-group">
                    <input className="btn btn-success" type="submit" value="Sauvegarder" />
                </div>
            </form>

      )
    }
}

export default EditClient

/*
function ErrorHeader(props) {
    if (props.error != "") {

        let rows = [];
        for (let i=0; i < props.error.length; i++) {
            rows.push(<span key={props.error[i].field}>{props.error[i].field} {props.error[i].defaultMessage}<br/></span>);
        }

       return (
           <div className="error">{rows}</div>
        );
    } else {
        return null;
    }
}
*/