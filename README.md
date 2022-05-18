[![zkID-interface](https://img.shields.io/badge/zkid-interface-yellowgreen?style=flat-square)](https://zkid.app)

# zkID-interface

## Overiview

This repo is split to some packages:

- [app](packages/app/) This is the main entry point. It handles BaseFram, router and Header.
- [app-config](packages/app-config/) This is config for app, such as endpoints, kilt config, assets.
- [page-home](packages/page-home/) Home page.
- [page-tutorial](packages/page-tutorial/) Tutorial page.
- [react-components](packages/react-components/) App internal shared components for react.
- [react-hooks](packages/react-hooks/) App internal shared react hooks.
- [react-wallet](packages/react-wallet/) An wallet provider for react dapp, use [web3-react](https://github.com/NoahZinsmeister/web3-react)
- [service](packages/service/) Backend services for zcloak.
- [web3-query](packages/web3-query/) Web3 querys, it includes `multicall`, and subscribe chain data, use [ethers](https://github.com/ethers-io/ethers.js/)
- [zkid-core](packages/zkid-core/) This is core for zkid-interface, such as: implement call for [zCloak-contracts](https://github.com/zCloak-Network/zCloak-contracts), [zCloak ID Wallet](https://chrome.google.com/webstore/detail/zcloak-id-wallet/hkdbehojhcibpbcdpjphajfbgigldjkh) protocal implement.

## Development

### Run local

`$ yarn install`

`$ yarn start`

### Production build

`$ yarn install`

`$ yarn build`

build assets in `packages/app/build`
