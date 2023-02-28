import { GET, POST, request } from "./request";
import { userState } from "@/utils/type";

export const Ajax = {
  // getBanner: () => GET("http://121.196.235.163:3000/banner"),
  getBanner: () => GET("/app/banners"),

  sentCaptcha: (data: userState) =>
    GET("http://121.196.235.163:3000/captcha/sent", data),

  verifyCaptcha: (data: userState) =>
    GET("http://121.196.235.163:3000/captcha/verify", data),

  finduser: (data?: userState) => POST("/app/finduser", data),

  register: (data?: userState) => POST("/app/register", data),

  login: (data?: userState) => POST("/app/login", data),

  sendcaptcha: (data: any) => POST("/app/sendcaptcha", data),

  findpwd: (data: any) => POST("/app/findpwd", data),

  gettoken: (data?: userState) => POST("/app/gettoken", data),

  changepass: (data?: userState) => POST("/app/changepass", data),

  getuserinfo: (data?: userState) => GET("/app/getuserinfo", data),

  uplodafile: (data?: any) => POST("/app/uplodafile", data),

  changeuserinfo: (data?: userState) => POST("/app/changeuserinfo", data),

  addtravels: (data?: any) => POST("/app/addtravels", data),

  getmytravels: (data?: any) => POST("/app/getmytravels", data),

  gettravelbyid: (data?: any) => POST("/app/gettravelbyid", data),

  getalltravels: (data?: any) => POST("/app/getalltravels", data),

  gettravelbanners: (data?: any) => POST("/app/gettravelbanners", data),

  gethomelist: (data?: any) => POST("/app/gethomelist", data),

  changetravels: (data?: any) => POST("/app/changetravels", data),

  getlikelist: (data?: any) => POST("/app/getlikelist", data),

  addlikeone: (data?: any) => POST("/app/addlikeone", data),

  dellikeone: (data?: any) => POST("/app/dellikeone", data),

  getcollectlist: (data?: any) => POST("/app/getcollectlist", data),

  addcollectone: (data?: any) => POST("/app/addcollectone", data),

  delcollectone: (data?: any) => POST("/app/delcollectone", data),
};
