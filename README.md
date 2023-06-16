Razz
====

## Overview

[Razz](https://razz.herokuapp.com/) is an open-source planning poker application with GitHub integration.
Use consensus-based estimation with your team to assign estimates to your GitHub issues.

## Stack Information
| Concern                | Solution                                                        |
| ---------------------- | --------------------------------------------------------------- |
| Server                 | [Node](https://nodejs.org/)                                     |
| Server Framework       | [Express.js](https://expressjs.com/)                            |
| Session                | [tough-cookie](https://github.com/salesforce/tough-cookie)      |
| Real-time Connectivity | [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)      |
| UI Framework           | [React](https://facebook.github.io/react/)                      |
| UI Routing             | [React Router](https://reactrouter.com/en/main)                 |
| UI Components          | [MUI](https://mui.com/)                                         |
| Build                  | [Vite](https://github.com/vitejs/vite)                          |
| Integration            | [vite-express](https://github.com/szymmis/vite-express)         |

### Prerequisites

- [Node](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/cli/install/)

### Installation

```bash
$ git clone https://github.com/button-inc/razz.git
$ cd razz
$ cp .env.example .env # Add your own vars here
$ yarn
$ yarn dev
```

- By default, the app will run at: http://localhost:3000/

### Deploy

```bash
$ git push heroku main
```

## Razz Developers

- [Thomas Mastromonaco](https://github.com/tmastrom)


## Attribution

favicon by <a href="https://freeicons.io/profile/127310">Pongsakorn</a> on <a href="https://freeicons.io">freeicons.io</a>

## License

Copyright (c) 2023 [Button](https://www.button.is/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
