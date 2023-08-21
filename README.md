[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-YES-green.svg)](https://github.com/agorapp-dao/motoko-editor/graphs/commit-activity)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![GitHub](https://img.shields.io/twitter/follow/axsaucedo.svg?label=Follow)](https://twitter.com/agorappdao)

# Motoko Editor
The Motoko Editor is a standalone interactive coding environment where users can become proficient with the Motoko programming language by practicing in near real-time the theoretical concepts that they learn related to Internet Computer Protocol's development. Users practice the theory they have learned by solving related coding exercises -no local setup needed. ICP builders can use AgorApp to learn how to build ICP DApps with Motoko, submit their code and then programmatically validate their solutions against the test-cases run by the Motoko Editor application.
The Motoko Editor application is being [integrated with AgorApp](https://motoko.agorapp.dev/course/motoko-tutorial/introduction).


## AgorApp ![AgorApp-logo](/motoko-editor/public/images/AgorAppLogo.svg)
[AgorApp](https://agorapp.dev/) is a browser-based IDE for web3 development. It provides a Codecademy-style interactive coding environment where users can learn-by-coding blockchain development - from domain-specific languages such as Motoko to auditing smart contracts by cracking CTF challenges or learning how to build on top of onchain protocols (DeFi, SocialFi etc.). The AgorApp IDE will be extended to a low-code/rapid-prototyping IDE with support for native ICP dev plugins (i.e.: fuzzers and static analyzers) and for the full life-cycle of Canister development (development, testing and deployment), a marketplace for web3 components, fine-tuned LLM for code completion and a template engine to scaffold common ICP canister design patterns or ICP smart contract standards.


## Run locally

```
pnpm install
pnpm dev
```

## Run with Docker

```
pnpm docker-build
pnpm docker-run
```
