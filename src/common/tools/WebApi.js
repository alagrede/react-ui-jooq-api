import axios from 'axios';
import appUtil from './AppUtil';

class WebAPI {

  createClient() {
    let instance = axios.create({
      baseURL: appUtil.serverUrl()
    });
    
    instance.defaults.timeout = 2500;
    instance.defaults.maxRedirects = 0;
    // Alter defaults after instance has been created 
    instance.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    instance.defaults.headers.common['Content-Type'] = "application/json";
    instance.defaults.headers.common['Cache-Control'] = "no-cache";
    instance.defaults.headers.common['Pragma'] = "no-cache";
    instance.defaults.headers.common['If-Modified-Since'] = new Date().getMilliseconds();

/*
    instance.interceptors.request.use(function (config) {

        if (window.location.search.indexOf("?token=") != -1) {
            let token = window.location.search.split("?token=")[1];
            if (config.url.indexOf("?") != -1) {
                config.url = config.url + "&token=" + token;
            } else {
                config.url = config.url + "?token=" + token;
            }
        }

        return config;

    }, function (error) {
        return Promise.reject(error);
    });
*/

/*
    instance.interceptors.response.use(function (response) {
    
        if (typeof response.headers["x-auth-token"] !== "undefined") {

            var raw_token = response.headers["x-auth-token"];
            window.localStorage.setItem("X-AUTH-TOKEN", raw_token);

            var token = JSON.parse(atob(raw_token.split('.')[0]));
            window.localStorage.setItem("userId", token.userId);
            window.localStorage.setItem("name", token.name);
            window.localStorage.setItem("email", token.email);

            var authorities = "";
            for (var i = 0; i < token.authorities.length; i++) {
                authorities += token.authorities[i].authority +",";
            }

            if (authorities.lastIndexOf(",") == (authorities.length -1)) {
                authorities = authorities.substr(0, authorities.length -1); // retrait de la derniere ','
            }
            window.localStorage.setItem("authorities", authorities);
        }
        return response;

    }, function (error) {
        let isLoggedIn = window.localStorage.getItem("X-AUTH-TOKEN") != null;
        // Not logged -> redirect to login page
        if (!isLoggedIn) {
            if (window.authServerUrl != undefined) {
                window.location.replace(window.authServerUrl + "/login/");
            } else {
                window.location.replace(appUtil.serverUrl());
            }
        }
        return Promise.reject(error);
    });

*/
    return instance;  
  }      


  post(url, content){
    return this.createClient().post(url, content);
  }
 
  put(url, content){
    return this.createClient().put(url, content);
  }

  get(url) {
  	return this.createClient().get(url);
  }
    
  delete(url) {
  	return this.createClient().delete(url);
  }

}

const webApi = new WebAPI();

export default webApi;
export { WebAPI };
