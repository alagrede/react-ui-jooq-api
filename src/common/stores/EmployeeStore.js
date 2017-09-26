import webApi from "../tools/WebApi";
import appUtil from "../tools/AppUtil";
import EventEmitter from 'events';

export class EmployeeStore extends EventEmitter {

  url = '/';
  findOneUrl = '/findOne';
  getAllDepartmentUrl = '/getAllDepartment';

  criteria = "";
  employees = [];

  selectedEmployee = {};
  departments = [];

  pageNumber = 0;
  pageSize = 5;
  sortDirection = "asc";
  sortField = "id";
  nbrPages = 1;
  clientCount = 0;


  constructor() {
    super();
  }

  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  get params() {
    return "?page="+this.pageNumber+"&size="+this.pageSize+"&sort="+this.sortField+","+this.sortDirection
        +"&searchTerm="+this.criteria;
  }

  nextPage = () => {
    this.pageNumber++;
    this.getAll();
  }

  previousPage = () => {
    if(this.pageNumber > 0)
      this.pageNumber--;
    this.getAll();
  }

  getAll() {
      webApi.get(this.url + this.params)
      .then(res => {
          this.employees = res.data.content;
          this.employeesCount = res.data.totalElements;
          this.pageSize = res.data.size;
          this.nbrPages = res.data.totalPages;
          this.emitChange();
      });
  }

  sort = (columnName) => {
      // On change le sens du tri
      if (this.sortField == columnName) {
        if (this.sortDirection == "desc") {
          this.sortDirection = "asc";
        } else {
          this.sortDirection = "desc";
        }
      }
      // On change la colonne de tri
      this.sortField = columnName;
      this.getAll();
  }

  updateFilters = (e) => {
      e.preventDefault();
      this.pageNumber = 0;
      this.refreshPage();
  }

  loadEmployee = (id, callback) => {
      webApi.get(this.findOneUrl + "?id=" + id)
      .then(res => {
          callback(res.data);
      });
  }

  loadDepartment = () => {
      webApi.get(this.getAllDepartmentUrl)
      .then(res => {
          this.departments = res.data;
          this.emitChange();
      });
  }

  saveEmployee = (employee, callback) => {
     if (employee.id) { //update
        webApi.put(this.url, {properties: employee})
        .then(res => {
          callback();
        }).catch(res => {
          callback(res);
        });

     } else { // create
        webApi.post(this.url, {properties: employee})
        .then(res => {
          callback();
        }).catch(res => {
          callback(res);
        });
     }
      //TODO erreurs
    }

  deleteEmployee = (employeeId, callback) => {
      webApi.delete(this.url + "?id=" + employeeId)
      .then(res => {
        callback();
      });    
  }

}

export default new EmployeeStore
