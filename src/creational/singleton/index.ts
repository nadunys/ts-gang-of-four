/**
 * Singleton Pattern Example
 * 
 * This example demonstrates how the Singleton pattern ensures that a class
 * has only one instance and provides a global point of access to it.
 */
import { Singleton } from './singleton';

console.log('Singleton Pattern Example');
console.log('-----------------------');

const instance1 = Singleton.getInstance();
console.log(instance1.someBusinessLogic());

const instance2 = Singleton.getInstance();

console.log('Do both variables contain the same instance?', instance1 === instance2);
