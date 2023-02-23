export const defaultState = {
  num: 200,
  userInfo: null
};

export const reducers = (state = defaultState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case "NumAdd":
      return { ...state, num: state.num + 1 };
      break;
    case "ChangeNum":
      return { ...state, num: state.num + payload };
      break;
    case "getuserinfoasync":
      return { ...state, userInfo: payload };
      break;
    case "setuserinfo":
      return { ...state, userInfo: payload };
      break;
    default:
      return state;
      break;
  }
};
