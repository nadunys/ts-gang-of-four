/**
 * Abstract Factory Design Pattern Exports
 */

import {
    AbstractProductA,
    AbstractProductB,
    ConcreteProductA1,
    ConcreteProductA2,
    ConcreteProductB1,
    ConcreteProductB2,
    AbstractFactory,
    ConcreteFactory1,
    ConcreteFactory2
} from './abstract-factory';

export {
    AbstractProductA,
    AbstractProductB,
    ConcreteProductA1,
    ConcreteProductA2,
    ConcreteProductB1,
    ConcreteProductB2,
    AbstractFactory,
    ConcreteFactory1,
    ConcreteFactory2
};

/**
 * Demo execution for Abstract Factory pattern
 * This will be executed when this file is imported from the main menu
 */
console.log('=========================================');
console.log('🏭 Abstract Factory Pattern Demonstration');
console.log('=========================================');
console.log('\nThe Abstract Factory pattern provides an interface for creating');
console.log('families of related or dependent objects without specifying');
console.log('their concrete classes.\n');

/**
 * The client code works with factories and products only through abstract
 * types: AbstractFactory and AbstractProduct. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 */
function clientCode(factory: AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}

// The client code can work with any concrete factory class.
console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1());

console.log('\nClient: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());