import HttpRequestUtil from '@pefish/js-util-httprequest';
import ErrorHelper from '@pefish/js-error';

export default class BchApiHelper {
  _baseUrl: string;

  constructor(url = "https://bcc.zupago.pe/api/addr/",) {
    this._baseUrl = url;
  }


  async getBalance(address) {
    try {
      const result = await HttpRequestUtil.getJson(`${this._baseUrl}${address}/balance`);
      return result;
    } catch (e) {
      throw new ErrorHelper(e);
    }
  }
}

