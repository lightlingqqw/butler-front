import HttpClient from "../utils/ajax";
import { ResResult } from "./type";

const http = new HttpClient();


export const createTag = function (params:{tagName:string;programme_id:string;deadline:string;}): Promise<ResResult> {
  return http.post('http://localhost:3000/tag', {
    body: {
      tagName: params.tagName,
      programme_id:params.programme_id,
      deadline:params.deadline
    }
  })
}


export const accept = function (params?:{id:number}): Promise<ResResult> {
  return http.post('http://localhost:3000/relationships/1/accept', {
    body: {
    }
  })
}
