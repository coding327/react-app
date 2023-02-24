export const defaultState = {
  num: 200,
  userInfo: null, // 用户信息
  paths: {
    from: '', // 从哪来
    to: '', // 到哪去
  }
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
    case "changepaths":
      return {...state, paths: payload}
      break
    default:
      return state;
      break;
  }
};
