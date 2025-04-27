---
sidebar_position: 2
---

# Builder Pattern

## Intent
Separate the construction of a complex object from its representation, allowing the same construction process to create different representations.

## Motivation & Problem
When object creation involves complex steps that should be independent from the object itself. The pattern helps when an object needs to be created with many optional parameters or configurations, avoiding the "telescoping constructor" problem.

## Applicability
Use the Builder Pattern when:
- The algorithm for creating a complex object should be independent of the parts that make up the object and how they're assembled
- The construction process must allow different representations for the object that's constructed
- You want to avoid constructors with numerous parameters ("telescoping constructor")
- You need to create complex immutable objects

## Structure
```
+------------+       +-------------+
|  Director  |------>|   Builder   |
+------------+       +-------------+
                           ^
                           |
                +--------------------+
                |  ConcreteBuilder  |---> Product
                +--------------------+
```

## Participants
- **Builder**: Specifies an abstract interface for creating parts of a Product object
- **ConcreteBuilder**: Constructs and assembles parts of the product by implementing the Builder interface
- **Director**: Constructs an object using the Builder interface
- **Product**: Represents the complex object being built

## Implementation
```typescript
// The product class
class Product {
    private parts: string[] = [];
    
    public add(part: string): void {
        this.parts.push(part);
    }
    
    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}`);
    }
}

// The builder interface
interface Builder {
    reset(): void;
    buildPartA(): void;
    buildPartB(): void;
    buildPartC(): void;
}

// Concrete builder
class ConcreteBuilder implements Builder {
    private product: Product;
    
    constructor() {
        this.reset();
    }
    
    public reset(): void {
        this.product = new Product();
    }
    
    public buildPartA(): void {
        this.product.add('Part A');
    }
    
    public buildPartB(): void {
        this.product.add('Part B');
    }
    
    public buildPartC(): void {
        this.product.add('Part C');
    }
    
    public getProduct(): Product {
        const result = this.product;
        this.reset();
        return result;
    }
}

// Director class
class Director {
    private builder: Builder;
    
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }
    
    public buildMinimalViableProduct(): void {
        this.builder.buildPartA();
    }
    
    public buildFullFeaturedProduct(): void {
        this.builder.buildPartA();
        this.builder.buildPartB();
        this.builder.buildPartC();
    }
}

// Usage
const director = new Director();
const builder = new ConcreteBuilder();
director.setBuilder(builder);

console.log('Standard basic product:');
director.buildMinimalViableProduct();
builder.getProduct().listParts();

console.log('Standard full featured product:');
director.buildFullFeaturedProduct();
builder.getProduct().listParts();

console.log('Custom product:');
builder.buildPartA();
builder.buildPartC();
builder.getProduct().listParts();
```

### TypeScript-Specific Implementation Notes
- Use interfaces to define the Builder contract
- Use method chaining for a more fluent interface
- Consider using TypeScript's optional parameters as an alternative for simple cases
- Leverage TypeScript's type system to ensure correctness

## Real-World Examples
- Document generators creating different formats (PDF, HTML, plain text)
- Meal preparation systems (burger with different ingredients)
- UI element construction with many configuration options
- Complex database query builders
- Test data generators

## Advantages & Disadvantages

### Advantages
- Allows you to vary a product's internal representation
- Isolates code for construction and representation
- Gives you finer control over the construction process
- Provides a clean API for object construction with many parameters

### Disadvantages
- Requires creating a separate ConcreteBuilder for each different product type
- Requires the builder classes to be mutable
- May introduce unnecessary complexity for simple objects
- Code duplication when products don't share a common interface

## Related Patterns
- **Factory Method**: Builder focuses on step-by-step construction, while Factory Method emphasizes class selection
- **Abstract Factory**: Builder returns the product as a final step, while Abstract Factory returns the product immediately
- **Composite**: Builders can use the Composite pattern to build tree structures
- **Fluent Interface**: Not a GoF pattern but often used with Builder for method chaining

## Example Code
You can find the complete implementation of this pattern in our repository:
- [Builder Implementation](https://github.com/nadunys/ts-gang-of-four/tree/main/src/creational/builder)
