# Singleton Pattern

## Intent
Ensures that a class has only one instance and provides a global point of access to it.

## Explanation
The Singleton pattern is a creational design pattern that restricts the instantiation of a class to a single instance. This is useful when exactly one object is needed to coordinate actions across the system.

## When to use
* When there must be exactly one instance of a class, and it must be accessible to clients from a well-known access point
* When the sole instance should be extensible by subclassing, and clients should be able to use an extended instance without modifying their code

## Structure
```
+-----------------+
|   Singleton     |
+-----------------+
| - instance      |
+-----------------+
| + getInstance() |
+-----------------+
```

## Real-world examples
* Database connection pools
* Configuration managers
* Logger instances
* Hardware access points (like printer spoolers)

## Implementation details
* Private constructor to prevent direct instantiation
* Static method to manage the instance
* Lazy initialization (create on first use)
* Thread safety considerations in multithreaded environments

## TypeScript implementation notes
In TypeScript, we implement the Singleton pattern by:
1. Making the constructor private
2. Creating a static instance variable
3. Providing a static method for retrieving the instance

## Pros and Cons

### Pros
* You can be sure that a class has only a single instance
* The singleton object is initialized only when it's requested for the first time
* You gain a global access point to that instance

### Cons
* Violates the Single Responsibility Principle (class manages its own creation)
* Can mask bad design, such as components knowing too much about each other
* Requires special treatment in a multithreaded environment
* Makes unit testing more difficult