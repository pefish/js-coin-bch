import '@pefish/js-node-assist'
import assert from "assert"
import Wallet from './wallet'

describe('helper', () => {

  let helper
  const network = `mainnet`

  before(async () => {
    helper = new Wallet()
  })

  it('getAll', async () => {
    try {
      const masterPair = helper.getMasterPairBySeed(`3af29c97ae94a45788c170d052a7d115cd838d51790aa0b68747af1a53b1b241a6d02a502196e6db10ea7cb9d5ffe510bee2a689e915dc8feeb30d3ad1`, network)
      const result = helper.deriveAllByXprivPath(masterPair['xpriv'], `m/2/3444`, network)
      result['legacyAddress'] = helper.getAddressFromPublicKey(result['publicKey'], 'p2pkh', network)
      // global.logger.error('result', result)
      assert.strictEqual(result[`wif`], `KxyKusnHrTQ8pRtijy64B6uehCJC9WwqRNX7x5hab4GmoxDYTbo1`)
      assert.strictEqual(result[`legacyAddress`], `1MmhSp8yave2Kxjnqtw7NfeyWjRmSeLLyd`)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getCashAddrFromLegacyAddr', async () => {
    try {
      const cashAddress = helper.getCashAddrFromLegacyAddr(`1MmhSp8yave2Kxjnqtw7NfeyWjRmSeLLyd`)
      assert.strictEqual(cashAddress, `bitcoincash:qr3ad9r0qmv744z8ps7s4wgmytu8lagsgcp5ez4yd7`)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getAllFromWif', async () => {
    try {
      const result = helper.getAllFromWif('KxyKusnHrTQ8pRtijy64B6uehCJC9WwqRNX7x5hab4GmoxDYTbo1', network)
      result['legacyAddress'] = helper.getAddressFromPublicKey(result['publicKey'], 'p2pkh', network)
      // global.logger.error(result)
      assert.strictEqual(result[`legacyAddress`], `1MmhSp8yave2Kxjnqtw7NfeyWjRmSeLLyd`)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})

