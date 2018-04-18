import assert from 'assert';
import gravyTap from '..';

const errorDetails = `  ---
  operator: fail
  at: Test._184‍.r.t (/path/to/file.mjs:5:5)
  stack: |-
    Error: passes
        at Test.assert [as _assert] (/path/to/node_modules/tape/lib/test.js:225:54)
        at Test.bound [as _assert] (/path/to/node_modules/tape/lib/test.js:77:32)
        at Test.fail (/path/to/node_modules/tape/lib/test.js:318:10)
        at Test.bound [as fail] (/path/to/node_modules/tape/lib/test.js:77:32)
        at Test._184‍.r.t (/path/to/test/tape.mjs:5:5)
        at Test.bound [as _cb] (/path/to/node_modules/tape/lib/test.js:77:32)
        at Test.run (/path/to/node_modules/tape/lib/test.js:96:10)
        at Test.bound [as run] (/path/to/node_modules/tape/lib/test.js:77:32)
        at Immediate.next (/path/to/node_modules/tape/lib/results.js:71:15)
        at runCallback (timers.js:672:20)
  ...`;

const output = `TAP version 13
# should pass
not ok 1 passes
${errorDetails}
# should throw
ok 2 throws "threw"
# object.assign
ok 3 should be equivalent
1..3
# tests 3
# pass  2
# fail  1`;

const src = output
  .split('\n')
  .map(l => `console.log('${l}')`)
  .join('\n');

gravyTap(src)
  .then(results => {
    assert.equal(results.tests, 3, '3 test results');
    assert.equal(results.passed, 2, '2 tests passed');
    assert.equal(results.failed, 1, '1 test failed');
    assert.ok(Array.isArray(results.errors), 'errors property is an array');
    assert.equal(results.errors.length, 1, 'errors array has 1 failure');
    assert.equal(results.errors[0].line, 'not ok 1 passes', 'has the failing line');
    assert.equal(results.errors[0].details, `${errorDetails}\n`, 'has the failing details');
    assert.equal(results.output, output, 'output includes full console results');
    console.log('Output assertions passed');
  })
  .catch(err => {
    console.log('Output assertions failed\n');
    console.error(err);
    process.exit(1);
  });
