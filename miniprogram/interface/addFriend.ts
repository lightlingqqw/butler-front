import HttpClient from "../utils/ajax";
import { ResResult } from "./type";

const http = new HttpClient();


export const add = function (params:{toUserId:string;}): Promise<ResResult> {
  return http.post('http://localhost:3000/relationship', {
    body: {
      toUserId: params.toUserId,
    }
  })
}
