/**
 * Builder Design Pattern
 * 
 * Intent: Separate the construction of a complex object from its representation so
 * that the same construction process can create different representations.
 */

// The Product class represents a complex object that requires step-by-step construction
class Product {
    private parts: string[] = [];

    public addPart(part: string): void {
        this.parts.push(part);
    }

    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}`);
    }
}

// The Builder interface specifies methods for creating the different parts
// of the Product objects
interface Builder {
    reset(): void;
    buildPartA(): void;
    buildPartB(): void;
    buildPartC(): void;
}

// ConcreteBuilder1 follows the Builder interface and provides specific implementations
// of the building steps. Your program may have several different Builders.
class ConcreteBuilder1 implements Builder {
    private product!: Product;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.product = new Product();
    }

    // All production steps work with the same product instance
    public buildPartA(): void {
        this.product.addPart('PartA1');
    }

    public buildPartB(): void {
        this.product.addPart('PartB1');
    }

    public buildPartC(): void {
        this.product.addPart('PartC1');
    }

    /**
     * Concrete Builders are supposed to provide their own methods for
     * retrieving results. That's because various types of builders may create
     * entirely different products that don't follow the same interface.
     * Therefore, such methods cannot be declared in the base Builder interface
     * (at least in a statically typed programming language).
     *
     * Usually, after returning the end result to the client, a builder instance is
     * expected to be ready to start producing another product. That's why it's a
     * usual practice to call the reset method at the end of the `getProduct`
     * method. However, this behavior is not mandatory, and you can make your
     * builders wait for an explicit reset call from the client code before
     * disposing of the previous result.
     */
    public getProduct(): Product {
        const result = this.product;
        this.reset();
        return result;
    }
}

// The Director is only responsible for executing the building steps in a particular
// sequence. It's helpful when producing products according to a specific order or
// configuration.
class Director {
    private builder!: Builder;

    /**
     * The Director works with any builder instance that the client code passes
     * to it. This way, the client code may alter the final type of the newly
     * assembled product.
     */
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    /**
     * The Director can construct several product variations using the same
     * building steps.
     */
    public buildMinimalViableProduct(): void {
        this.builder.buildPartA();
    }

    public buildFullFeaturedProduct(): void {
        this.builder.buildPartA();
        this.builder.buildPartB();
        this.builder.buildPartC();
    }
}

export { Product, Builder, ConcreteBuilder1, Director };