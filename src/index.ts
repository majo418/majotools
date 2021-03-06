import * as fs from "./fs"
import * as git from "./git"
import * as json from "./json"
import * as net from "./net"
import * as node from "./node"
import * as prompt from "./prompt"
import * as shell from "./shell"
import * as systemImport from "./systemImport"
import * as string from "./string"
import * as tsc from "./tsc"
import * as tsnode from "./tsnode"
import * as varstream from "./varstream"

import * as cache from "./cache"
import * as cookieParser from "./cookieParser"
import * as basicAuth from "./basicAuth"
import * as httpMiddleware from "./httpMiddleware"

export default {
    cache: cache,
    cookieParser: cookieParser,
    basicAuth: basicAuth,
    httpMiddleware: httpMiddleware,
    fs: fs,
    git: git,
    json: json,
    net: net,
    string: string,
    varstream: varstream,
    prompt: prompt,
    systemImport: systemImport,
    shell: shell,
    node: node,
    tsc: tsc,
    tsnode: tsnode,
}