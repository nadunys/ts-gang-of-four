/**
 * Prototype Pattern Example
 * 
 * This example demonstrates how the Prototype pattern allows you to clone objects
 * without being coupled to their concrete classes.
 */
import { ConcretePrototype } from './prototype';

console.log('Prototype Pattern Example');
console.log('-----------------------');

// Create an original prototype instance with a string primitive
const original = new ConcretePrototype(
  'original value',
  { 
    prop1: 'property1',
    prop2: 'property2',
    nestedProp: 'nested value'
  }
);

// Clone the prototype
const clone = original.clone();

// Verify that the clone is a different instance
console.log('Original prototype: ', original);
console.log('Cloned prototype: ', clone);
console.log('Are the objects equal?', original === clone);
console.log('Are their primitives equal?', original.primitive === clone.primitive);
console.log('Are their components equal?', original.component === clone.component);
console.log('Are component values the same?', JSON.stringify(original.component) === JSON.stringify(clone.component));

// Demonstrate that the circular reference was handled properly
console.log('Original circular reference points back to the original object:', 
  original.circularReference.prototype === original);
console.log('Cloned circular reference points back to the cloned object:', 
  clone.circularReference.prototype === clone);

// Modify a property in the clone to demonstrate independence
console.log('\nModifying the clone:');
clone.primitive = 'modified value';
clone.component.prop1 = 'modified property';
console.log('Original primitive:', original.primitive);
console.log('Cloned primitive:', clone.primitive);
console.log('Original component prop1:', original.component.prop1);
console.log('Cloned component prop1:', clone.component.prop1);