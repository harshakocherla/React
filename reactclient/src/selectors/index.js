import { createSelector } from 'reselect';

const getChits = state => {
  console.log(state.chits, 'chits selsector');

  return state.chits;
};

const getUsers = state => {
  console.log(state.users, 'users selsector');

  return state.users;
};

export const getChitID = createSelector([getChits], chits => {
  console.log(chits.items);

  if (chits.items.length > 0) {
    return chits.items.reduce((acc, current, index) => {
      return [...acc, current.id];
    }, []);
  } else {
    return [];
  }
});

export const getUserID = createSelector([getUsers], user => {
  console.log(user.items);

  if (user.items.length > 0) {
    return user.items.reduce((acc, current, index) => {
      return [...acc, [current.id, `${current.lastName} ${current.firstName}`]];
    }, []);
  } else {
    return [];
  }
});
