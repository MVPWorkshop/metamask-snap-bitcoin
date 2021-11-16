# MetaMask Snap Bitcoin

MetaMask Snap to enable MetaMask users interaction with Bitcoin Blockchain.

## Getting started

### Prerequisites

Be sure to have installed the following

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install) 
- [MetaMask]()

### Getting MetaMask running in your local environment

> We strongly recommend using a Chromium browser in a profile without other versions of MetaMask installed.
>
> When installing nodejs dependencies, note that some steps ask you to use `yarn setup` instead of `yarn install`.

* clone the MetaMask [extension repo](https://github.com/MetaMask/metamask-extension)
* checkout [the latest snaps branch](https://github.com/MetaMask/metamask-extension/tree/snaps)
* in the repo root directory, execute `yarn setup` and then `yarn start`
* in Chrome, navigate to `chrome://extensions`
* make sure 'Developer Mode' is enabled on the far right, then click 'Load unpacked' on the far left
* navigate to the MetaMask repo, and then `./dist/chrome` and click 'Select Folder'
  
At this point, you should see MetaMask added to your browser as an extension. We recommend using a dummy seed phrase for development.

### Installation

1) Clone the repo
```
gti clone https://github.com/MVPWorkshop/metamask-snap-bitcoin.git
cd metamask-snap-bitcoin
```
2) Install packages
```
yarn install
```
3) Run
```
yarn start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
Snap is running at [http://localhost:8081](http://localhost:8081). \
Bitcoin Node is running at [http://localhost:5000](http://localhost:5000).
