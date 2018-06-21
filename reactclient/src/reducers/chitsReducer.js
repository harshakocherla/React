import { FETCH_CHITS, POST_CHIT } from '../actions/types';

const initialState = {
  items: [],
  item: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHITS:
      return {
        ...state,
        items: action.payload,
      };

    case POST_CHIT:
      console.log(action);
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
};
