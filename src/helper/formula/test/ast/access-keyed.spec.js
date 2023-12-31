import {AccessKeyed, AccessScope, LiteralString} from '../../src/ast';
import {createSimpleScope} from '../../src/scope';
import test from 'tape';

let expression = new AccessKeyed(new AccessScope('foo', 0), new LiteralString('bar'));

test('AST:AccessKeyed: evaluates member on bindingContext', t => {
  let scope = createSimpleScope({ foo: { bar: 'baz' } });
  t.equal(expression.evaluate(scope), 'baz');
  t.end();
});

test('AST:AccessKeyed: evaluates member on overrideContext', t => {
  let scope = createSimpleScope({});
  scope.overrideContext.foo = { bar: 'baz' };
  t.equal(expression.evaluate(scope), 'baz');
  t.end();
});

test('AST:AccessKeyed: assigns member on bindingContext', t => {
  let scope = createSimpleScope({ foo: { bar: 'baz' } });
  expression.assign(scope, 'bang');
  t.equal(scope.bindingContext.foo.bar, 'bang');
  t.end();
});

test('AST:AccessKeyed: assigns member on overrideContext', t => {
  let scope = createSimpleScope({});
  scope.overrideContext.foo = { bar: 'baz' };
  expression.assign(scope, 'bang');
  t.equal(scope.overrideContext.foo.bar, 'bang');
  t.end();
});

test('AST:AccessKeyed: evaluates null/undefined object', t => {
  let scope = createSimpleScope({ foo: null });
  t.equal(expression.evaluate(scope), undefined);
  scope = createSimpleScope({ foo: undefined });
  t.equal(expression.evaluate(scope), undefined);
  scope = createSimpleScope({});
  t.equal(expression.evaluate(scope), undefined);
  t.end();
});
