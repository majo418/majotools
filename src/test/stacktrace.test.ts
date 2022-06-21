import "mocha"
import { expect } from 'chai';
import { getStackTrace, getStackTraceByError, parseStackTraceElement } from "../stack"
import { uniqueStringify } from "../json"
import { exampleStackTraceElements } from "./examples"

describe('getStackTrace()', async function () {
    it('getStackTrace', async function () {
        let filter: boolean = true
        expect(uniqueStringify(
            getStackTrace()
                .split("\n")
                .slice(2)
                .map((v) => parseStackTraceElement(v))
                .reverse()
                .filter((v) => {
                    if (v.module.endsWith("stacktrace.test.ts")) {
                        filter = false
                    }
                    return !filter
                })
                .reverse()
                .map((v) => {
                    const index = v.module.indexOf("/majotools/")
                    if (index != -1) {
                        v.module = "?" + v.module.substring(index + 1)
                    }
                    return v
                })
        )).is.equals(uniqueStringify([
            {
                "method": "Context.<anonymous>",
                "module": "?src/test/stacktrace.test.ts",
                "suffix": "",
                "line": 11,
                "char": 26
            },
            {
                "method": "step",
                "module": "?src/test/stacktrace.test.ts",
                "suffix": "",
                "line": 33,
                "char": 23
            },
            {
                "method": "Object.next",
                "module": "?src/test/stacktrace.test.ts",
                "suffix": "",
                "line": 14,
                "char": 53
            },
            {
                "method": "none",
                "module": "?src/test/stacktrace.test.ts",
                "suffix": " ",
                "line": 8,
                "char": 71
            },
            {
                "method": "new Promise",
                "module": "<anonymous>",
                "suffix": ""
            },
            {
                "method": "__awaiter",
                "module": "?src/test/stacktrace.test.ts",
                "suffix": "",
                "line": 4,
                "char": 12
            },
            {
                "method": "Context.<anonymous>",
                "module": "?src/test/stacktrace.test.ts",
                "suffix": "",
                "line": 47,
                "char": 24
            }
        ]))
    })
})