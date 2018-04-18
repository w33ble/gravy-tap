import test from 'tape';

test('should pass', t => {
  t.plan(1);
  t.pass('passes', 't.passes');
});

test('should throw', t => {
  t.plan(1);
  t.throws(
    () => {
      throw new Error('threw');
    },
    /threw/,
    'throws "threw"'
  );
});

test('object.assign', t => {
  t.plan(1);
  const obj = { one: 1 };
  const obj2 = Object.assign({}, obj, { two: 2 });
  t.deepEqual(obj2, { one: 1, two: 2 });
});
