/**
 * Builder Design Pattern Exports
 */

import { Product, Builder, ConcreteBuilder1, Director } from './builder';

export { Product, Builder, ConcreteBuilder1, Director };

/**
 * Demo execution for Builder pattern
 * This will be executed when this file is imported from the main menu
 */
console.log('=========================================');
console.log('🏗️  Builder Pattern Demonstration');
console.log('=========================================');
console.log('\nThe Builder pattern separates the construction of a complex');
console.log('object from its representation so that the same construction');
console.log('process can create different representations.\n');

/**
 * Client code that demonstrates the Builder pattern
 */
function clientCode(): void {
    const director = new Director();
    const builder = new ConcreteBuilder1();
    director.setBuilder(builder);

    console.log('Standard basic product:');
    director.buildMinimalViableProduct();
    builder.getProduct().listParts();

    console.log('Standard full featured product:');
    director.buildFullFeaturedProduct();
    builder.getProduct().listParts();

    // Remember, the Builder pattern can be used without a Director class.
    console.log('Custom product:');
    builder.buildPartA();
    builder.buildPartC();
    builder.getProduct().listParts();
}

// Run the demonstration
clientCode();