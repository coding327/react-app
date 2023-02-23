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
