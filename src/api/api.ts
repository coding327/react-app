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
};
