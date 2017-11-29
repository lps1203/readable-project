import { GET_ALL_CATEGORIES } from '../actions/categoryAction'

const initialCategoryState = []

function categoryReducer(state = initialCategoryState, action) {
  const { type, ...rest } = action
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return Object.keys(rest).reduce((memo, key) => {
        memo.push(rest[key]['name'])
        return memo
      }, [])
    default: 
      return state
  }
}

export default categoryReducer