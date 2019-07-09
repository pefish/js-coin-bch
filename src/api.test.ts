import '@pefish/js-node-assist'
import assert from "assert"
import Api from './api'

describe('WalletHelper', () => {

  let api

  before(async () => {
    api = new Api()
  })

  it('getBalance', async () => {
    try {
      const result = await api.getBalance("1LuZmXJfzf73ooUcC7BHKB92gjLEGv7eCh")
      global.logger.error('result', result)
      // assert.strictEqual(helper.isAddress(result[`address`]), true)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})

