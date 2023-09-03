import axios from "./axios";

export function fetchListCategories() {
    let response = axios
      .get(`categories.php`)
      .then(async (response) => {
        return response;
      })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  
    return response;
  }


export function fetchRecipes(category) {
    let response = axios
      .get(`filter.php?c=${category}`)
      .then(async (response) => {
        return response;
      })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  
    return response;
  }

  export function fetchDetailRecipes(id) {
    let response = axios
      .get(`lookup.php?i=${id}`)
      .then(async (response) => {
        return response;
      })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  
    return response;
  }