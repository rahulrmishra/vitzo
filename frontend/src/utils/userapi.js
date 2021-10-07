import { API_BASE_URL } from "./constants";

const request = (options) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: 'application/json'
    });
    if (localStorage.getItem(ACCESS_TOKEN)) {
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      );
    }
  
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);
  
    return fetch(options.url, options).then(
      (response) =>
        response.json().then((json) => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        }),
      3000
    );
  };

  export function getUserList() {
    return request({
      url: API_BASE_URL + 'users.php?pageNo=1',
      method: "GET",
    });
  }  
