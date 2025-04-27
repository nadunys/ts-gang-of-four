# Singleton Pattern

## What is it?
The Singleton Pattern ensures that a class has only one instance and provides a way to access it globally.

## Why use it?
Use the Singleton Pattern when:
- You need only one instance of a class to coordinate actions across your system.
- You want a single, shared object that can be accessed from anywhere.

## How does it work?
1. The class has a private constructor to stop direct creation of objects.
2. A static method is used to create or return the single instance.
3. The instance is created only when needed (lazy initialization).

## Examples in real life
- A single database connection shared across the app.
- A logger that writes messages to a file.
- A configuration manager that stores app settings.

## Structure
```plaintext
+-------------------+
|   Singleton       |
|-------------------|
| - instance: Type  |
|-------------------|
| + getInstance():  |
|   Type            |
+-------------------+
```

## Pseudocode
```typescript
class Singleton {
    private static instance: Singleton;

    // Private constructor to prevent direct instantiation
    private constructor() {}

    // Static method to get the single instance
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

// Usage
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
console.log(singleton1 === singleton2); // true
```

## Advantages
- Ensures only one instance exists.
- Saves resources by creating the instance only when needed.
- Provides a global access point to the instance.

## Disadvantages
- Makes testing harder because of the global state.
- Can lead to bad design if overused.
- Needs extra care in multithreaded programs.