import assert from 'assert';
import gravyTap from '..';

const output = `TAP version 13
# should pass
ok 1 passes
# should throw
ok 2 throws "threw"
# object.assign
ok 3 should be equivalent
1..3
# tests 3
# pass  3
# ok`;

const src = output
  .split('\n')
  .map(l => `console.log('${l}')`)
  .join('\n');

gravyTap(src)
  .then(results => {
    assert.equal(results.tests, 3, '3 test results');
    assert.equal(results.passed, 3, '3 tests passed');
    assert.equal(results.failed, 0, 'no tests failed');
    assert.ok(Array.isArray(results.errors), 'errors property is an array');
    assert.equal(results.errors.length, 0, 'errors array is empty');
    assert.equal(results.output, output, 'output includes full console results');
    console.log('Output assertions passed');
  })
  .catch(err => {
    console.log('Output assertions failed');
    console.error(err);
    process.exit(1);
  });
