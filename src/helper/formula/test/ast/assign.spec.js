import {AccessScope, Assign} from '../../src/ast';
import {createOverrideContext} from '../../src/scope';
import test from 'tape';

test('AST:Assign: can chain assignments', t => {
  const foo = new Assign(new AccessScope('foo'), new AccessScope('bar'));
  const scope = { overrideContext: createOverrideContext(undefined) };
  foo.assign(scope, 1);
  t.equal(scope.overrideContext.foo, 1);
  t.equal(scope.overrideContext.bar, 1);
  t.end();
});
