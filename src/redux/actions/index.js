export * from './actions';

export const asyncActionGenerator = type => ({
  request: payload => ({ type: `${type}_REQUEST`, payload }),
  success: payload => ({ type: `${type}_SUCCESS`, payload }),
  failure: payload => ({ type: `${type}_FAILURE`, payload }),
  add: payload =>({type: `${type}_ADD`, payload}),
  edit: payload =>({type: `${type}_EDIT`, payload}),
  delete: payload =>({type: `${type}_DELETE`, payload}),
  clear: () => ({ type: `${type}_CLEAR` }),
  increment: payload =>({type: `${type}_INCREMENT`, payload}),
  decrement: payload =>({type: `${type}_DECREMENT`, payload}),
});

export const setError = payload => ({ type: "ERROR_SET", payload });
export const clearError =() => ({ type: "ERROR_CLEAR" });
