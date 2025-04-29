# Bridge Pattern

## Intent
The Bridge Pattern decouples an abstraction from its implementation so that the two can vary independently. It involves an interface acting as a bridge between the abstract class and implementor classes.

## Motivation & Problem
When you need to handle multiple variants of a concept (like different shapes in different colors), creating a class for every combination leads to an explosion of classes. The Bridge pattern solves this by separating the dimensions of variation into separate hierarchies.

## Applicability
Use the Bridge Pattern when:
- You want to avoid a permanent binding between an abstraction and its implementation
- Both the abstractions and implementations should be extensible through subclasses
- Changes in the implementation shouldn't impact the client code
- You want to hide implementation details from the client
- You have a proliferation of classes resulting from a coupled interface and numerous implementations

## Structure
```
┌───────────┐          ┌───────────┐
│  Client   │─────────▶│Abstraction│
└───────────┘          └─────┬─────┘
                            │
                            │ has-a
                            │
                            ▼
                     ┌──────────────┐
                     │Implementation│◀────┐
                     └──────────────┘     │
                            ▲             │
                            │             │
          ┌────────────────┬┴────────────┐
          │                │             │
┌─────────┴──────┐ ┌───────┴───────┐     │
│ConcreteImpl A  │ │ConcreteImpl B │     │
└────────────────┘ └───────────────┘     │
                                         │
┌────────────────────┐    ┌─────────────┴────┐
│RefinedAbstraction 1│───▶│   Abstraction    │
└────────────────────┘    └──────────────────┘
```

## Participants
- **Abstraction**: Defines the abstract interface and maintains a reference to the Implementation
- **RefinedAbstraction**: Extends the interface defined by Abstraction
- **Implementation**: Defines the interface for implementation classes
- **ConcreteImplementation**: Implements the Implementation interface

## Implementation
```typescript
// Abstraction
abstract class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public abstract operation(): string;
}

// Implementation
interface Implementation {
  operationImplementation(): string;
}

// Refined Abstraction
class RefinedAbstraction extends Abstraction {
  public operation(): string {
    return `RefinedAbstraction: ${this.implementation.operationImplementation()}`;
  }
}

// Concrete Implementations
class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return 'Result from platform A';
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return 'Result from platform B';
  }
}

// Usage
const implementationA = new ConcreteImplementationA();
const abstraction = new RefinedAbstraction(implementationA);
console.log(abstraction.operation());
```

### TypeScript-Specific Implementation Notes
- TypeScript interfaces make implementing the Bridge pattern straightforward
- Dependency injection through constructors is a clean way to establish the bridge
- Abstract classes can be used effectively to define the abstraction layer

## Real-World Examples
- GUI frameworks that separate widget rendering from platform-specific implementation
- Drivers that connect applications to different database systems
- Remote controls (abstraction) and devices they control (implementation)
- Cross-platform applications that maintain consistent functionality across different operating systems
- Graphics rendering systems that work with different underlying graphics APIs

## Advantages & Disadvantages

### Advantages
- Decouples interface from implementation
- Improves extensibility (you can add new abstractions and implementations independently)
- Hides implementation details from the client
- Follows Open/Closed Principle - open for extension, closed for modification

### Disadvantages
- Increases complexity when applied to highly cohesive classes
- Might be overkill for simple applications
- Requires designing the application correctly from the start

## Related Patterns
- **Adapter**: Changes the interface of an existing object, while Bridge separates an interface from its implementation
- **Abstract Factory**: Can be used with Bridge to create appropriate implementation objects
- **Strategy**: Similar to Bridge but focuses on switching algorithms rather than implementations
- **Composite**: Can be used in conjunction with Bridge to create tree structures with different implementations