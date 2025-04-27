# Abstract Factory Pattern

## Intent
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.

## Applicability
Use the Abstract Factory pattern when:
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

## Real-World Analogies
Consider a furniture shop. Different types of furniture (chairs, sofas, tables) can be created in different styles (modern, Victorian, art deco). When a client orders a furniture set, all pieces should be in the same style. Using the Abstract Factory pattern, each style would be a concrete factory that ensures all furniture pieces match.

## Benefits
- It isolates concrete classes: The Abstract Factory pattern helps control the classes of objects that an application creates
- It makes exchanging product families easy: The class of a concrete factory appears only once in an application
- It promotes consistency among products: When product objects are designed to work together, it's important that an application use objects from only one family

## Drawbacks
- Adding new kinds of products is difficult: Extending abstract factories to produce new kinds of Products is complicated because the AbstractFactory interface fixes the set of products that can be created