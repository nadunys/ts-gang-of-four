# Singleton Pattern

## Intent
The Singleton Pattern ensures that a class has only one instance and provides a global access point to this instance.

## Motivation & Problem
When you need exactly one instance of a class that's accessible from multiple parts of your application. For example, a single database connection shared by different parts of a program.

## Applicability
Use the Singleton Pattern when:
- You need exactly one instance of a class, and it must be accessible to clients from a well-known access point.
- You want to have strict control over global variables.
- You need to coordinate actions across your system through a single point.

## Structure
```
+-------------------+
|   Singleton       |
|-------------------|
| - instance: Type  |
|-------------------|
| - constructor()   |
| + getInstance():  |
|   Type            |
+-------------------+
```

## Participants
- **Singleton**: The class that defines the getInstance() method to let clients access its unique instance. The class is responsible for creating and maintaining its own unique instance.

## Implementation
```typescript
class Singleton {
    private static instance: Singleton;

    // Private constructor prevents direct instantiation
    private constructor() {}

    // Static method for accessing the singleton instance
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    
    // Business methods
    public someBusinessLogic() {
        // ...
    }
}

// Usage
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
console.log(singleton1 === singleton2); // true
```

### TypeScript-Specific Implementation Notes
- TypeScript's access modifiers (private, protected, public) make implementing singletons cleaner
- Use private static instance and private constructor to enforce the pattern
- Consider making the class final (non-extendable) in languages that support it

## Real-World Examples
- Database connection pools
- Logger instances
- Configuration managers
- Application state stores
- File system access managers
- Print spoolers

## Advantages & Disadvantages

### Advantages
- Ensures a class has only one instance
- Provides a global access point to that instance
- Lazy initialization only when needed
- Can be extended to allow a controlled number of instances

### Disadvantages
- Makes unit testing more difficult (global state)
- Can hide dependencies instead of making them explicit
- Requires special treatment in multithreaded environments
- Violates the single responsibility principle

## Related Patterns
- **Factory Method**: Singleton can use factory method for creating the instance
- **Facade**: Often implemented as a singleton
- **State**: State objects are frequently implemented as singletons