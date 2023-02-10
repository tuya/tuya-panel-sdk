/* eslint-disable no-console */
import { TYSdk } from 'tuya-panel-kit';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function api(a: string, postData: any, v = '1.0'): Promise<any> {
  const sucStyle = 'background: green; color: #fff;';
  const errStyle = 'background: red; color: #fff;';
  return new Promise((resolve, reject) => {
    TYSdk.native.apiRNRequest(
      {
        a,
        postData,
        v,
      },
      (d: string) => {
        const data = typeof d === 'string' ? JSON.parse(d) : d;
        console.log(`API Success: %c${a}%o`, sucStyle, data);
        resolve(data);
      },
      (err: string) => {
        const e = typeof err === 'string' ? JSON.parse(err) : err;
        console.log(`API Failed: %c${a}%o`, errStyle, e.message || e.errorMsg || e);
        reject(err);
      }
    );
  });
}

export const parseJSON = (str: string) => {
  let rst;
  if (str && {}.toString.call(str) === '[object String]') {
    // 当JSON字符串解析
    try {
      rst = JSON.parse(str);
    } catch (e) {
      // 出错，用eval继续解析JSON字符串
      try {
        // eslint-disable-next-line
        rst = eval(`(${str})`);
      } catch (e2) {
        // 当成普通字符串
        rst = str;
      }
    }
  } else {
    rst = typeof str === 'undefined' ? {} : str;
  }

  return rst;
};
