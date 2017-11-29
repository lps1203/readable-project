import * as BackendAPI from '../utils/api'

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

export function getAllCategories() {
  return function(dispatch) {
    return BackendAPI.getAllCategories() 
      .then((data) => 
        dispatch({
          type: GET_ALL_CATEGORIES,
          ...data.categories
        }) 
    )
  }
}
