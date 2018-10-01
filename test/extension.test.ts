//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

import { doAction } from '../src/json-organizer';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

    // Defines a Mocha unit test
    test("converts JSON to JS", () => {
        const js = doAction(`{
            "string": "qwe\\n\\t'rty",
            "number": 1.23,
            "boolean": true,
            "array": [{ "n": 1, "b": false }, null],
            "object": { "null": null }
        }`);
        assert.equal(js, `{
    string: 'qwe\\n\\t\\'rty',
    number: 1.23,
    boolean: true,
    array: [{
        n: 1,
        b: false
    }, null],
    object: {
        null: null
    }
}`
        );
    });
});
