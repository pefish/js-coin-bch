export default class BchApiHelper {
    baseUrl: string;
    constructor(url?: string);
    getBalance(address: string): Promise<string>;
}
