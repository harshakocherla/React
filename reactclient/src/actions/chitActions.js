import { FETCH_CHITS, POST_CHIT, DELETE_CHIT } from './types';
import axios from 'axios';

export const postChits = postchits => dispatch => {
  console.log(postchits, 'chitActions');

  // axios({
  //   method: 'POST',
  //   url: 'http://localhost:4444/chits',
  //   data: postchits,
  // })
  fetch('https://wzumu6h1b6.execute-api.us-east-1.amazonaws.com/dev/chit', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: postchits,
  })
    .then(res => res.json())
    .then(chits => {
      console.log(chits, 'chits', postchits, 'jsonchits');

      return dispatch({
        type: POST_CHIT,
        payload: chits,
      });
    })
    .catch(err => err);
};

export const fetchchits = () => dispatch => {
  axios
    .get('https://wzumu6h1b6.execute-api.us-east-1.amazonaws.com/dev/chits')
    .then(chits =>
      dispatch({
        type: FETCH_CHITS,
        payload: chits.data,
      }),
    )
    .catch(err => {
      if (err) return err;
    });
};

export const deletechit = id => dispatch => {
  console.log(id, 'delete this id');

  axios
    .delete(
      `https://wzumu6h1b6.execute-api.us-east-1.amazonaws.com/dev/chit/${id}`,
    )
    .then(chit => {
      dispatch({
        type: DELETE_CHIT,
        payload: id,
      });
    });
};
