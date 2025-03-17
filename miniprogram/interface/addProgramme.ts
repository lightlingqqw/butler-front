import HttpClient from "../utils/ajax";
import { ResResult } from "./type";

const http = new HttpClient();


export const createTag = function (params:{name:string}): Promise<ResResult> {
  return http.post('http://localhost:3000/tag', {
    body: {
      name: params.name,
    }
  })
}
