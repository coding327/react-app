import { GET, POST, request } from "./request";

export const Ajax = {
  getBanner: () => GET("http://121.196.235.163:3000/banner"),

  todoRegister: (data: any) => POST("/api/register", data),

  todoLogin: (data: any) => POST("/api/login", data),
};



