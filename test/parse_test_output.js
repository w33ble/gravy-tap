/* eslint no-console: 0 */

/*
  This set of tests runs a real test bundle and checks that the tests
  pass (or fail) correctly
*/

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const gravyTap = require('..');

const testBundle = 'test/bundle.js';
const src = fs.readFileSync(path.resolve(process.cwd(), testBundle)).toString();

// describes expected output, keyed by browser
const specs = {
  chrome: {
    total: 3,
    pass: 3,
    fail: 0,
  },
  'internet explorer': {
    rejects: /Object.+assign/,
  },
};

const failedReject = 'expected to reject, but passed';

Object.keys(specs)
  .reduce(
    (acc, browser) =>
      acc.then(() => {
        const spec = specs[browser];
        const caps = { browserName: browser };

        console.log(`>> Running tests in '${browser}'`);
        return gravyTap(src, { capabilities: caps })
          .then(results => {
            // throw is rejection was expected
            if (spec.rejects) throw failedReject;

            assert.strictEqual(results.tests, spec.total, `${spec.total} total tests`);
            assert.strictEqual(results.passed, spec.pass, `${spec.pass} tests pass`);
            assert.strictEqual(results.failed, spec.fail, `${spec.fail} tests fail`);
            console.log(`>> PASSED ${browser} assertions`);
          })
          .catch(err => {
            // if there was a reject from gravy-tap, re-throw it
            if (!spec.rejects) throw err;

            // if reject was due to unexpected pass, throw error
            if (err === failedReject) {
              console.log(`>> FAILED ${browser} ${failedReject}`);
              throw new Error(failedReject);
            }

            // check reject message, throw new error if it does not match
            if (spec.rejects.test(err.message)) {
              console.log(`>> PASSED ${browser} rejected with expected error`);
            } else {
              console.log(`>> FAILED ${browser} rejected with wrong message`);
              throw err;
            }
          });
      }),
    Promise.resolve()
  )
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
