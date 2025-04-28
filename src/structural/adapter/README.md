# Adapter Pattern

## Intent
The Adapter Pattern converts the interface of a class into another interface clients expect. It allows classes to work together that couldn't otherwise due to incompatible interfaces.

## Motivation & Problem
When you have an existing class with a useful behavior, but its interface is incompatible with the specific interface your client code requires. For example, integrating a third-party library with your application when their interfaces don't match.

## Applicability
Use the Adapter Pattern when:
- You want to use an existing class, but its interface isn't compatible with the interface you need
- You want to create a reusable class that cooperates with classes that don't necessarily have compatible interfaces
- You need to use several existing subclasses, but it's impractical to adapt their interface by subclassing each one

## Structure
```
┌───────────┐          ┌───────────┐
│  Client   │          │  Target   │
└───────────┘          └───────────┘
      │                      ▲
      │                      │
      │ uses                 │ implements
      │                      │
      ▼                ┌───────────┐         ┌───────────┐
                       │  Adapter  │─────────▶  Adaptee  │
                       └───────────┘ adapts  └───────────┘
```

## Participants
- **Target**: Defines the domain-specific interface that Client uses
- **Client**: Collaborates with objects conforming to the Target interface
- **Adaptee**: Contains some useful behavior, but its interface is incompatible with the existing client code
- **Adapter**: Makes the Adaptee's interface compatible with the Target interface

## Implementation
```typescript
// Target interface
interface Target {
  request(): string;
}

// The class with useful behavior but incompatible interface
class Adaptee {
  public specificRequest(): string {
    return 'Special behavior of the Adaptee.';
  }
}

// Adapter makes Adaptee's interface work with Target's
class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  public request(): string {
    return `Adapter: (TRANSLATED) ${this.adaptee.specificRequest()}`;
  }
}

// Usage
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
console.log(adapter.request());
```

### TypeScript-Specific Implementation Notes
- TypeScript interfaces make implementing adapters straightforward
- Object composition is preferred over inheritance for adapter implementation in TypeScript
- Using generics can make adapters more flexible

## Real-World Examples
- Card readers which act as adapters between memory cards and a computer
- Power adapters that convert one type of plug to another
- Language translators adapting between people speaking different languages
- ORMs adapting database query interfaces to object-oriented code
- API wrappers that adapt third-party libraries to a common interface

## Advantages & Disadvantages

### Advantages
- Allows classes with incompatible interfaces to work together
- Follows Single Responsibility Principle by separating interface conversion from primary business logic
- Enhances reusability of existing code
- Improves maintainability when dealing with legacy or third-party code

### Disadvantages
- Increases overall code complexity by adding new classes
- Sometimes requires a significant amount of code to adapt complex interfaces
- Can be less efficient than refactoring code to directly use target interfaces

## Related Patterns
- **Bridge**: Similar in structure to Adapter, but has a different intent. Bridge is designed upfront to let abstractions and implementations vary independently.
- **Decorator**: Enhances an object without changing its interface, while Adapter changes the interface.
- **Proxy**: Provides a surrogate for another object without changing its interface, unlike Adapter.
- **Facade**: Simplifies a complex subsystem interface, while Adapter makes incompatible interfaces compatible.