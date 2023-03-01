import { Ajax } from "@/api/api";

export const NumAdd = () => {
  return {
    type: "NumAdd",
  };
};

export const ChangeNum = (payload: number) => {
  return {
    type: "ChangeNum",
    payload,
  };
};

export const getuserinfoasync = async (payload?: any) => {
  let res: any = await Ajax.getuserinfo(payload);
  console.log(res.result);
  return {
    type: "getuserinfoasync",
    payload: res.result,
  };
};

export const setuserinfo = (payload?: any) => {
  return {
    type: "setuserinfo",
    payload,
  };
};

export const getMyLikes = async (payload?: any, params?: any) => {
  let res: any = await Ajax.getlikelist(payload, params)
  return {
    type: 'getMyLikes',
    payload: res.result
  }
}

export const getMyCollects = async (payload?: any, params?: any) => {
  let res: any = await Ajax.getcollectlist(payload, params)
  return {
    type: 'getMyCollects',
    payload: res.result
  }
}
