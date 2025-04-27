# Factory Method Pattern

## Intent
The Factory Method Pattern defines an interface for creating objects but lets subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to its subclasses.

## Motivation & Problem
When a class can't anticipate the type of objects it needs to create, or when a class wants its subclasses to specify the objects it creates. Factory Method helps decouple object creation from the code that uses the objects.

## Applicability
Use the Factory Method Pattern when:
- A class cannot anticipate the class of objects it must create
- A class wants its subclasses to specify the objects it creates
- Classes delegate responsibility to one of several helper subclasses, and you want to localize the knowledge of which helper subclass is the delegate

## Structure
```
+-------------------+          +-------------------+
|     Creator       |          |     Product       |
|-------------------|          |-------------------|
| factoryMethod()   |<-------->| operation()       |
| someOperation()   |          |                   |
+-------------------+          +-------------------+
        /\                              /\
        |                               |
+-------+-------+          +-----------+-----------+
|               |          |           |           |
|ConcreteCreatorA|    +-----------+  +-----------+
|factoryMethod() |    |ConcreteProductA| |ConcreteProductB|
|               |    +-----------+  +-----------+
+---------------+
```

## Participants
- **Product**: Defines the interface of objects the factory method creates
- **ConcreteProduct**: Implements the Product interface
- **Creator**: Declares the factory method, which returns a Product object
- **ConcreteCreator**: Overrides the factory method to return an instance of a ConcreteProduct

## Implementation
```typescript
// Product interface
interface Product {
  operation(): string;
}

// Concrete Products
class ConcreteProductA implements Product {
  operation(): string {
    return "Result of ConcreteProductA";
  }
}

class ConcreteProductB implements Product {
  operation(): string {
    return "Result of ConcreteProductB";
  }
}

// Creator
abstract class Creator {
  abstract factoryMethod(): Product;
  
  someOperation(): string {
    const product = this.factoryMethod();
    return `Creator: Working with ${product.operation()}`;
  }
}

// Concrete Creators
class ConcreteCreatorA extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

// Usage
const creator1 = new ConcreteCreatorA();
console.log(creator1.someOperation()); // "Creator: Working with Result of ConcreteProductA"

const creator2 = new ConcreteCreatorB();
console.log(creator2.someOperation()); // "Creator: Working with Result of ConcreteProductB"
```

### TypeScript-Specific Implementation Notes
- Use TypeScript interfaces to define the Product contract
- Use abstract classes for Creator when you want to provide default implementation
- Leverage TypeScript's type system to ensure type safety

## Real-World Examples
- Document creation applications that handle different file formats (PDF, Word, Spreadsheet)
- UI frameworks that create platform-specific components
- Connection factories that create different database connections
- Payment processing systems that handle different payment methods

## Advantages & Disadvantages

### Advantages
- **Loose Coupling**: Creates objects without tightly coupling creator and concrete products
- **Single Responsibility**: Moves product creation code to dedicated classes
- **Open/Closed**: Extend with new products without changing existing code
- **Scalable**: Easy to add new product types to the system

### Disadvantages
- **Complexity**: Requires creating many classes, which can be overkill for simple cases
- **Indirection**: Introduces additional levels of abstraction
- **Parallel Hierarchies**: Often requires maintaining parallel class hierarchies for products and creators

## Related Patterns
- **Abstract Factory**: Often implemented using Factory Methods
- **Template Method**: Factory Methods are usually called within Template Methods
- **Prototype**: Factory Method can use Prototype to create products