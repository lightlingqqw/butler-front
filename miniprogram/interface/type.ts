export interface ResResult<U=any,K=any> {
  result:number;
  message?:string;
  data?:U;
  row?:K;
}