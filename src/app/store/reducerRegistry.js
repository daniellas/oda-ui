const reducers = {};

const reducerRegistry = (emitChange = null) => ({
  getReducers: () => ({...reducers}),

  register: (key, reducer) => {
    reducers[key] = reducer;

    if (emitChange) emitChange(reducers);
  },

  unregister: key => {
    delete reducers[key];
    if (emitChange) emitChange(reducers);
  },

  setChangeListener: listener => {
    emitChange = listener;
  }
});

export default reducerRegistry();
