import { FETCH_USERS, POST_USER } from '../actions/types';

const initialState = {
  items: [],
  item: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        items: action.payload,
      };
    case POST_USER:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
};
