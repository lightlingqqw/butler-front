enum HttpMethod {
  GET = 'GET',
  POST = 'POST'
}

type optionsType = {
  method?:HttpMethod,
  body?:any;
  headers?:any;
}

type configType = {
  baseURL:string;
  timeout:number;
  headers:any;
}

type responseType = {
  message:string;
}

class HttpClient {

  private defaultConfig: configType;
  private config:configType;
  private interceptors:{
    request:Array<any>;
    response:Array<any>;
  };
  private requestQueue:Map<any,any>;

  constructor(config:configType = {} as configType ) {
    // 默认配置
    this.defaultConfig = {
      baseURL: '', // 基础 URL
      timeout: 10000, // 请求超时时间
      headers: {
        'Content-Type': 'application/json', // 默认请求头
      },
    };

    // 合并配置
    this.config = { ...this.defaultConfig, ...config };

    // 拦截器
    this.interceptors = {
      request: [],
      response: [],
    };

    // 请求队列（用于取消请求）
    this.requestQueue = new Map();
  }

  // 发送请求
  request(url:string,options:optionsType) {
    const {
      method,
      body,
      headers
    } = options;
    // 合并请求头
    const finalHeaders = { ...this.config.headers, ...headers };

    // 处理请求拦截器
    let requestConfig = {
      method,
      url: `${this.config.baseURL}${url}`,
      body,
      headers: finalHeaders,
    };

    // 执行请求拦截器
    for (const interceptor of this.interceptors.request) {
      requestConfig = interceptor(requestConfig);
    }

    // 返回 Promise
    return new Promise((resolve, reject) => {
      // 生成请求 ID（用于取消请求）
      const requestId = `${method}-${url}-${Date.now()}`;

      // 发起请求
      const requestTask = wx.request({
        url: requestConfig.url,
        method: requestConfig.method,
        data: requestConfig.body,
        header: requestConfig.headers,
        timeout: this.config.timeout,
        success: (response) => {
          // 执行响应拦截器
          let responseData = response.data;
          for (const interceptor of this.interceptors.response) {
            responseData = interceptor(responseData);
          }

          // 请求成功
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve(responseData);
          } else {
            // 请求失败
            reject(new Error('请求失败'));
          }
        },
        fail: (error) => {
          // 网络错误
          reject(new Error(error.errMsg || '网络错误'));
        },
        complete: () => {
          // 请求完成，从队列中移除
          this.requestQueue.delete(requestId);
        },
      });

      // 将请求任务加入队列
      this.requestQueue.set(requestId, requestTask);
    });
  }

  // 添加请求拦截器
  addRequestInterceptor(interceptor:any) {
    this.interceptors.request.push(interceptor);
  }

  // 添加响应拦截器
  addResponseInterceptor(interceptor:any) {
    this.interceptors.response.push(interceptor);
  }

  // 取消请求
  cancelRequest(requestId:string) {
    if (this.requestQueue.has(requestId)) {
      const requestTask = this.requestQueue.get(requestId);
      requestTask.abort();
      this.requestQueue.delete(requestId);
    }
  }

  // GET 请求
  get(url:string,options:Omit<optionsType,'body'|'method'>) {
    return this.request(`${url}`,
      {
        method:HttpMethod.GET, 
        headers:options.headers
      }
    );
  }

  // POST 请求
  post(url:string, options:Omit<optionsType,'method'>):Promise<any> {
    return this.request(url, 
      {
        method:HttpMethod.POST, 
        headers:options.headers,
        body:options.body
      }
      );
  }

}

export default HttpClient;