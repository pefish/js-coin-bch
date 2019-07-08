/** @module */
import '@pefish/js-node-assist'
import BaseWalletHelper from '@pefish/js-coin-btc/lib/base/base_bitcoinjs_lib'
import ErrorHelper from '@pefish/js-error'
import bchaddr from 'bchaddrjs'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

export default class Wallet extends BaseWalletHelper {
  decimals: number = 8;
  bitcoinLib: any

  public constructor () {
    super()
    this.bitcoinLib = require('@pefish/bch-bitcoinjs-lib')
  }

  parseNetwork (network): object {
    if (network === `mainnet`) {
      return {
        messagePrefix: '\x18Bitcoin Cash Signed Message:\n',
        bech32: 'bc',
        bip32: {
          public: 0x0488b21e,
          private: 0x0488ade4
        },
        pubKeyHash: 0x00,
        scriptHash: 0x05,
        wif: 0x80
      }
    } else if (network === `testnet`) {
      return {
        messagePrefix: '\x18Bitcoin Cash Signed Message:\n',
        bech32: 'tb',
        bip32: {
          public: 0x043587cf,
          private: 0x04358394
        },
        pubKeyHash: 0x6f,
        scriptHash: 0xc4,
        wif: 0xef
      }
    } else {
      throw new ErrorHelper(`network error`)
    }
  }

  async _signUtxos (txBuilder, utxos, network) {
    txBuilder.enableBitcoinCash(true)
    const hashType = this.bitcoinLib.Transaction.SIGHASH_ALL | this.bitcoinLib.Transaction.SIGHASH_BITCOINCASHBIP143
    utxos.forEach((utxo, index) => {
      const { balance, wif } = utxo
      const keyPair = this.bitcoinLib.ECPair.fromWIF(wif, this.bitcoinLib.networks[network])
      txBuilder.sign(index, keyPair, null, hashType, balance.toNumber())
    })
    return txBuilder.build()
  }

  /**
   * 获取地址格式。Format.Cashaddr  Format.Bitpay 。。。
   * @param addr
   * @returns {string}
   */
  detectAddressFormat (addr) {
    return bchaddr.detectAddressFormat(addr)
  }

  detectAddressNetwork (addr) {
    return bchaddr.detectAddressNetwork(addr)
  }

  detectAddressType (addr) {
    return bchaddr.detectAddressType(addr)
  }

  getLegacyAddrFromCashAddr (cashAddress) {
    return bchaddr.toLegacyAddress(cashAddress)
  }

  getBitpayAddrFromLegacyAddr (legacyAddr) {
    return bchaddr.toBitpayAddress(legacyAddr)
  }

  getCashAddrFromLegacyAddr (legacyAddr) {
    return bchaddr.toCashAddress(legacyAddr)
  }
}
