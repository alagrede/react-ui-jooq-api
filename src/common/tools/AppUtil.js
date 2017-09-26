
class AppUtil {

  serverUrl() {
	  if (window.wsUrl != undefined) {
		  return window.wsUrl;
	  } else {
		  return 'http://localhost:8080/';
	  }
  }

  handleInputChange(e) {
    let state = this.state;
    let path = e.target.name.split('.');
    //changeByArray(state, path, e.target.value);

    let newValue = e.target.value;
    let obj = state;
    let i = 0;
    while (i < path.length - 1) {
      obj = obj[path[i++]];
    }
    if (newValue === parseInt(newValue, 10)) {
        obj[path[i]] = parseInt(newValue);
    } else {
        obj[path[i]] = newValue;
    }

    return this.setState(state);
  }
  /*
  changeByArray(hash, array, newValue) {
    let obj = hash;
    let i = 0;
    while (i < array.length - 1) {
      obj = obj[array[i++]];
    }
    if (newValue === parseInt(newValue, 10)) {
        obj[array[i]] = parseInt(newValue);
    } else {
        obj[array[i]] = newValue;
    }
  }
*/
/*
   mergeProps(source, other) {
          for(var k in other) {
        if (typeof source[k] !== 'object') {
          source[k]=other[k];
        }
     } 
  }

  resetProps(source) {
     for(var k in source) {
        if (typeof source[k] !== 'object') {
          if (k == "version") {
            source[k]=0;
          } else if (k.startsWith("is")) { // boolean always false
            source[k]=false;
          } else {
            source[k]="";
          }
        }
     } 
  }
*/
  /*
   * Retourne true si l'utilisateur connecté (localeStorage) contient au moins unes des permissions données en paramètres 
  */
  hasAnyPerm(permissions) {
   if (permissions) {
        for (let perm of permissions) {
          for (let userPerm of window.localStorage.getItem("authorities").split(",")) {
            if (userPerm == perm) {
              return true;
            } 
          }
        }
   }

   return false;
  }

 /*
  *  Retourne true si l'utilisateur connecté (localeStorage) contient la permission donnée en paramètre
  */
  hasPerm(permission) {
    if (window.localStorage.getItem("authorities") != null) {
      for (let userPerm of window.localStorage.getItem("authorities").split(",")) {
        if (userPerm == permission) {
          return true;
        } 
      }
    }
    
    return false;
  }


  displayErrors(errors) {

    if (errors instanceof Array) { // on suppose qu'il s'agit d'une erreur global
      for (var i = 0; i < errors.length; i++) {
        if (document.querySelector("#" + errors[i].field) instanceof Object) {
          document.querySelector("#" + errors[i].field).parentNode.className += "has-error";
          let referenceNode = document.querySelector("#" + errors[i].field);
          let el = document.createElement('span');
          el.className = "form-error";
          el.innerHTML = errors[i].field + " " + errors[i].defaultMessage;
          referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        } else {
            //TODO
          //this.notification.error(errors[i].field + "=>" + errors[i].defaultMessage);
        }
      }
    } else {
        //TODO
      //this.notification.error(errors.error + "=>" + errors.message);
    }
  }

  removeErrors() {
    let els = document.querySelectorAll(".form-group");
    for (var i = 0, len = els.length; i < len; i++) {
        els[i].classList.remove("has-error");
    }

    Array.prototype.forEach.call( document.querySelectorAll(".form-error"), function( node ) {
        node.parentNode.removeChild( node );
    });
    
    //$(".form-group").removeClass("has-error");
    //$(".form-error").remove();
  }
 
}

const appUtil = new AppUtil();

export default appUtil;
export { AppUtil };
