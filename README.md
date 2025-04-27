# TypeScript Design Patterns (Gang of Four)

This project implements all 23 Gang of Four (GoF) design patterns in TypeScript. The patterns are organized into three categories:

## 🏗️ Creational Patterns

Patterns that deal with object creation mechanisms:

- **Factory Method**: Creates objects without specifying the exact class to create
- **Abstract Factory**: Creates families of related objects
- **Builder**: Separates construction from representation
- **Prototype**: Creates objects by cloning existing objects
- **Singleton**: Ensures a class has only one instance

## 🧱 Structural Patterns

Patterns that focus on object composition:

- **Adapter**: Allows objects with incompatible interfaces to collaborate
- **Bridge**: Separates an abstraction from its implementation
- **Composite**: Composes objects into tree structures
- **Decorator**: Adds responsibilities to objects dynamically
- **Facade**: Provides a simplified interface to a set of interfaces
- **Flyweight**: Minimizes memory usage by sharing data with similar objects
- **Proxy**: Provides a surrogate for another object

## 🔄 Behavioral Patterns

Patterns that focus on communication between objects:

- **Chain of Responsibility**: Passes a request along a chain of handlers
- **Command**: Turns a request into a stand-alone object
- **Interpreter**: Implements a specialized language
- **Iterator**: Accesses elements of a collection sequentially
- **Mediator**: Reduces coupling between classes by centralizing communication
- **Memento**: Captures and restores an object's internal state
- **Observer**: Notifies dependent objects about state changes
- **State**: Alters an object's behavior when its state changes
- **Strategy**: Encapsulates interchangeable algorithms
- **Template Method**: Defines the skeleton of an algorithm
- **Visitor**: Separates algorithms from the objects they operate on

## 🚀 Getting Started

### Prerequisites

- Node.js
- TypeScript

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Interactive Menu

The project includes an interactive menu to explore all design patterns easily:

```bash
npm start
```

This will display a menu where you can select any of the 23 design patterns to run their examples.

### Running Individual Examples

Each design pattern has its own example implementation. To run a specific pattern directly:

```bash
npx ts-node src/{category}/{pattern-name}/index.ts
```

For example, to run the Singleton pattern:

```bash
npx ts-node src/creational/singleton/index.ts
```

### Development Mode

To run with hot reloading during development:

```bash
npm run dev
```

## 📚 Project Structure

```
src/
├── index.ts       # Interactive menu system
├── creational/    # Creational design patterns
├── structural/    # Structural design patterns
└── behavioral/    # Behavioral design patterns
```

Each pattern folder contains:
- Implementation files
- A README.md with detailed explanation
- Example usage

## 📖 References

- [Refactoring.guru - Design Patterns](https://refactoring.guru/design-patterns) - An excellent resource with visual explanations and code examples for all design patterns
- Design Patterns: Elements of Reusable Object-Oriented Software by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides (the "Gang of Four")