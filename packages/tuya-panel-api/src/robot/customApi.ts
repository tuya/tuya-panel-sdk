import Base64 from 'base64-js';
import _ from 'lodash';

type FileType = 'blob' | 'text';

function xmlRequestFile(url: string, fileType: FileType): Promise<string> {
  return new Promise((resolve, reject) => {
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.timeout = 10000;
    xmlRequest.open('GET', url, true);
    xmlRequest.responseType = fileType; // 这里是关键，它指明返回的数据的类型是二进制
    xmlRequest.onreadystatechange = function (e) {
      // debugger;
      if (xmlRequest.readyState === 4) {
        if (xmlRequest.status === 200) {
          resolve(xmlRequest.response);
        } else {
          reject(new Error(`${xmlRequest.status}`));
        }
      }
    };
    xmlRequest.ontimeout = function (e) {
      reject(
        new Error(
          `status: ${xmlRequest.status} \nreadyState: ${xmlRequest.readyState} \nerror: ${e} `
        )
      );
    };
    xmlRequest.send(null);
  });
}

/**
 * 下载文件，解析数据
 * @param {string} url
 */
export async function downloadFile(url: string, fileType: FileType = 'text'): Promise<string> {
  let response: string;
  try {
    response = await xmlRequestFile(url, fileType);
  } catch (e) {
    console.log('downloadFileError', e);
    // throw CustomError.mixinError(e, 'ui');
  }
  if (fileType === 'text') {
    return response;
  }
  const bytes = Base64.toByteArray(response);
  const text = _(bytes)
    .map(d => _.padStart(d.toString(16), 2, '0'))
    .value()
    .join('');
  return text;
}

export async function downloadImage(url: string): Promise<string> {
  let response: string;
  try {
    response = await xmlRequestFile(url, 'blob');
  } catch (e) {
    console.log('downloadImageError', e);
    // throw e;
  }
  return response;
}

/** ------------------------------------------------------------------- */
