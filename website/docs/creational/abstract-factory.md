---
sidebar_position: 1
---

# Abstract Factory Pattern

## Intent
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.

## Motivation & Problem
When a system needs to be independent of how its products are created, composed, and represented, and when the system is configured with one of multiple families of products. Abstract Factory solves the problem of creating entire product families without specifying their concrete classes.

## Applicability
Use the Abstract Factory Pattern when:
- A system should be independent of how its products are created, composed, and represented
- A system should be configured with one of multiple families of products
- A family of related product objects is designed to be used together, and you need to enforce this constraint
- You want to provide a class library of products, and you want to reveal just their interfaces, not their implementations

## Structure
```
┌───────────────────┐       ┌───────────────────┐
│  AbstractFactory  │<─────>│  AbstractProduct  │
└───────┬───────────┘       └───────┬───────────┘
        │                           │
        │                           │
┌───────▼───────────┐       ┌───────▼───────────┐
│  ConcreteFactory  │──────>│  ConcreteProduct  │
└───────────────────┘       └───────────────────┘
```

## Participants
- **AbstractFactory**: Declares an interface for operations that create abstract product objects
- **ConcreteFactory**: Implements the operations to create concrete product objects
- **AbstractProduct**: Declares an interface for a type of product object
- **ConcreteProduct**: Defines a product object to be created by the corresponding concrete factory
- **Client**: Uses only interfaces declared by AbstractFactory and AbstractProduct classes

## Implementation
```typescript
// Abstract Product A
interface AbstractProductA {
  usefulFunctionA(): string;
}

// Concrete Products A
class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
    return 'The result of Product A1';
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
    return 'The result of Product A2';
  }
}

// Abstract Product B
interface AbstractProductB {
  usefulFunctionB(): string;
  collaborateWith(collaborator: AbstractProductA): string;
}

// Concrete Products B
class ConcreteProductB1 implements AbstractProductB {
  public usefulFunctionB(): string {
    return 'The result of Product B1';
  }

  public collaborateWith(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of B1 collaborating with (${result})`;
  }
}

class ConcreteProductB2 implements AbstractProductB {
  public usefulFunctionB(): string {
    return 'The result of Product B2';
  }

  public collaborateWith(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of B2 collaborating with (${result})`;
  }
}

// Abstract Factory
interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

// Concrete Factories
class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

// Client code
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.collaborateWith(productA));
}

// Usage
console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1());

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());
```

### TypeScript-Specific Implementation Notes
- Use TypeScript interfaces to define abstract products and factory contracts
- Leverage TypeScript's type system to ensure correct product combinations
- Use method return type annotations to clarify product relationships

## Real-World Examples
- UI toolkit with different themes (Material, iOS, Windows) providing consistent UI elements
- Cross-platform application development with platform-specific components
- Different database types with consistent interfaces (MongoDB, MySQL, PostgreSQL)
- Furniture shop with different styles (Modern, Victorian, Art Deco)

## Advantages & Disadvantages

### Advantages
- Isolates concrete classes from client code
- Makes exchanging product families easy
- Promotes consistency among products
- Supports the Single Responsibility Principle by separating product creation logic

### Disadvantages
- Adding new kinds of products is difficult and requires changing the AbstractFactory interface
- Increased complexity due to numerous interfaces and classes
- Implementation can be challenging when products have complex interdependencies

## Related Patterns
- **Factory Method**: Abstract Factory is often implemented using Factory Methods
- **Singleton**: Abstract Factories are often implemented as Singletons
- **Prototype**: Abstract Factory can be implemented using Prototype pattern when product families share structure
- **Bridge**: Abstract Factory can be used with Bridge to separate interface from implementation

## Example Code
You can find the complete implementation of this pattern in our repository:
- [Abstract Factory Implementation](https://github.com/nadunys/ts-gang-of-four/tree/main/src/creational/abstract-factory)
