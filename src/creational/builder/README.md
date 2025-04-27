# Builder Design Pattern

## Intent
Separate the construction of a complex object from its representation so that the same construction process can create different representations.

## Motivation
The Builder pattern is useful when:
- The algorithm for creating a complex object should be independent of the parts that make up the object and how they're assembled.
- The construction process must allow different representations for the object that's constructed.

## Applicability
Use the Builder pattern when:
- The construction of an object is complex and should be separated from its representation.
- You need to create different immutable objects using the same construction process.
- You want to prevent "telescoping constructor" issues (constructors with many parameters).

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
- **Builder**: Specifies an abstract interface for creating parts of a Product object.
- **ConcreteBuilder**: Constructs and assembles parts of the product by implementing the Builder interface. Defines and tracks the representation it creates.
- **Director**: Constructs an object using the Builder interface.
- **Product**: Represents the complex object being built.

## Benefits
- Allows you to vary a product's internal representation.
- Isolates code for construction and representation.
- Gives you finer control over the construction process.
- Can provide a clean API for object construction.

## TypeScript Implementation Notes
The implementation in this directory demonstrates:
- A `Product` class that represents the complex object being built
- A `Builder` interface that specifies how to build the parts
- A `ConcreteBuilder` class that implements the building steps
- A `Director` class that manages the construction process
- A client code example showing how to use the pattern

## Sample Usage
```typescript
// Create a director and a builder
const director = new Director();
const builder = new ConcreteBuilder1();
director.setBuilder(builder);

// Build a minimal product
director.buildMinimalViableProduct();
const minimalProduct = builder.getProduct();

// Build a full-featured product
director.buildFullFeaturedProduct();
const fullProduct = builder.getProduct();

// Custom product without using director
builder.buildPartA();
builder.buildPartC();
const customProduct = builder.getProduct();
```