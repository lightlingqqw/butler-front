import HttpClient from "../utils/ajax";
import { ResResult } from "./type";

const http = new HttpClient();


export const login = function (params:{code:string}): Promise<ResResult<{token:string}>> {
  return http.post('http://localhost:3000/auth/wechat-login', {
    body: {
      code: params.code,
    }
  })
}
