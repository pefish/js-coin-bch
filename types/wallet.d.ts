/** @module */
import '@pefish/js-node-assist';
import { BtcWallet } from '@pefish/js-coin-btc';
declare global {
    namespace NodeJS {
        interface Global {
            logger: any;
        }
    }
}
export default class Wallet extends BtcWallet {
    decimals: number;
    bitcoinLib: any;
    constructor();
    parseNetwork(network: any): object;
    _signUtxos(txBuilder: any, utxos: any, network: any): Promise<any>;
    /**
     * 获取地址格式。Format.Cashaddr  Format.Bitpay 。。。
     * @param addr
     * @returns {string}
     */
    detectAddressFormat(addr: any): any;
    detectAddressNetwork(addr: any): any;
    detectAddressType(addr: any): any;
    getLegacyAddrFromCashAddr(cashAddress: any): any;
    getBitpayAddrFromLegacyAddr(legacyAddr: any): any;
    getCashAddrFromLegacyAddr(legacyAddr: any): any;
}
