/* eslint no-console: 0 */
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import gravyTap from '..';

const src = fs.readFileSync(path.resolve(process.cwd(), 'test/bundle.js')).toString();

const specs = {
  chrome: {
    total: 3,
    pass: 3,
    fail: 0,
  },
  'internet explorer': {
    rejects: true,
  },
};

Object.keys(specs)
  .reduce(
    (acc, browser) =>
      acc.then(() => {
        const spec = specs[browser];
        const caps = { browserName: browser };

        return gravyTap(src, { capabilities: caps })
          .then(results => {
            // throw is rejection was expected
            if (spec.rejects) throw new Error('Runner was expected to reject');

            assert.strictEqual(results.tests, spec.total, `${spec.total} total tests`);
            assert.strictEqual(results.passed, spec.pass, `${spec.pass} tests pass`);
            assert.strictEqual(results.failed, spec.fail, `${spec.fail} tests fail`);
            console.log(`${browser} - assertions passed`);
          })
          .catch(err => {
            // swallow rejection is it's expected
            if (!spec.rejects) throw err;
            console.log(`${browser} - assertions passed`);
          });
      }),
    Promise.resolve()
  )
  .catch(err => {
    console.log('Output assertions failed');
    console.error(err);
    process.exit(1);
  });
