const INITIAL_STATE = {
  completeAll: null,
};

export const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "COMPLETE_ALL":
      return {
        ...state,
        completeAll: action.payload,
      };
    default:
      return state;
  }
};
