[![zkID-interface](https://img.shields.io/badge/zkid-interface-yellowgreen?style=flat-square)](https://zkid.app)

# zkID-interface

Website: [zcloak.network](https://zcloak.network)

App: [zkid.app](https://zkid.app)

Discord: [zCloak](https://discord.gg/j3mATwNVSH)

Twitter: [@zCloakNetwork](https://twitter.com/zcloaknetwork)

## Overiview

This repo is split to some packages:

- [app](packages/app/) This is the main entry point. It handles BaseFram, router and Header.
- [app-config](packages/app-config/) This is config for app, such as endpoints, kilt config, assets.
- [extension-core](packages/extension-core/) This is core for [zCloak ID Wallet](https://chrome.google.com/webstore/detail/zcloak-id-wallet/hkdbehojhcibpbcdpjphajfbgigldjkh).
- [page-dashboard](packages/page-dashboard/) Dashboard page.
- [page-home](packages/page-home/) Home page.
- [page-tutorial](packages/page-tutorial/) Tutorial page.
- [react-components](packages/react-components/) App internal shared components for react.
- [react-hooks](packages/react-hooks/) App internal shared react hooks.

## Development

### Run local

`$ yarn install`

`$ yarn start`

### Production build

`$ yarn install`

`$ yarn build`

build assets in `packages/app/build`
