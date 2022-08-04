# Example Essay Edition Creator

## Zora Metabolism Hackathon

* Presentation: [coming soon]
* Deployed example (rinkeby): https://zora-essay-edition-minter.vercel.app/create

### What does this use?

1. [@zoralabs/nft-drop-contracts](https://github.com/ourzora/zora-drops-contracts)
2. [Rainbowkit](https://github.com/rainbow-me/rainbowkit)
3. [WAGMI](https://wagmi.sh/)
4. [Ethers](https://docs.ethers.io/v5/)
5. [@uiw/react-markdown-editor](http://uiw.gitee.io/react-markdown-editor/)
6. [degen](https://degen-xyz.vercel.app/)
7. [pinata](https://docs.pinata.cloud/)

### How to get this running?

1. Add `PINATA_JWT_KEY` to `.env.local` or to the server env key. This will not be exposed to users and is required to pin content to pinata. (Welcome to switch out `pages/api/publish.js` to use another pinning service too :D)
2. Update rainbow provider in `pages/_app.tsx` to use a custom RPC endpoint

### What files are important?

1. `pages/create.tsx` Create an Essay edition page
2. `pages/index.tsx` Nothing really here ;)
3. `pages/editions/[id.tsx]` View an edition page
4. `pages/_app.tsx` App wrapper file that integrates rainbowkit/WAGMI/ethers and degen theming support
5. `components/image-generator.js` Update this file to update the automatic cover image generator
6. `components/markdown-editor.tsx` Use the markdown editor
7. `next.config.js` Updates to next config to 1. disable react strict mode and 2. remove imports for markdown editor css integration.
8. `tsconfig.json` Typescript configuration for next.js