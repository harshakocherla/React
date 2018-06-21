import { FETCH_USERS, POST_USER, DELETE_USER } from './types';
import axios from 'axios';

export const postUser = postuser => dispatch => {
  fetch('https://wzumu6h1b6.execute-api.us-east-1.amazonaws.com/dev/user', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: postuser,
  })
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: POST_USER,
        payload: user,
      }),
    )
    .catch(err => err);
};

export const fetchUsers = () => dispatch => {
  axios
    .get('https://wzumu6h1b6.execute-api.us-east-1.amazonaws.com/dev/users')
    .then(users =>
      dispatch({
        type: FETCH_USERS,
        payload: users.data,
      }),
    )
    .catch(err => {
      if (err) return err;
    });
};
export const deleteuser = id => dispatch => {
  console.log(id, 'delete this id');

  axios
    .delete(
      `https://wzumu6h1b6.execute-api.us-east-1.amazonaws.com/dev/user/${id}`,
    )
    .then(chit => {
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    });
};
