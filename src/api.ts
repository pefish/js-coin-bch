import HttpRequestUtil from '@pefish/js-util-httprequest';

export default class BchApiHelper {
  baseUrl: string;

  constructor(url: string = "https://bcc.zupago.pe/api/addr/") {
    this.baseUrl = url;
  }


  async getBalance(address: string): Promise<string> {
    return (await HttpRequestUtil.getJson(`${this.baseUrl}${address}/balance`)).toString();
  }
}

