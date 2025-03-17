import { statisticsVO } from "../pages/statistics/statistics";
import HttpClient from "../utils/ajax";
import { ResResult } from "./type";

const http = new HttpClient();


export const getStatisticsData = function (params:{date:string}): Promise<ResResult<statisticsVO>> {
  return http.post(`http://localhost:3000/statistics/${params.date}`,{

  })
}
