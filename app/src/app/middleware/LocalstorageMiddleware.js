
const localstorageApi = (store) => (next) => (action) => {

  let thunkAction = (dispatch, getState) => {
    localStorage.setItem('redux', JSON.stringify(getState().root.toJS()));
    return dispatch(action)
  }
  return next(thunkAction);
};

export default localstorageApi;
