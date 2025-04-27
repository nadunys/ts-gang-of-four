# Factory Method Pattern

## What is it?
The Factory Method Pattern defines an interface for creating objects but lets subclasses decide which class to instantiate. It allows a class to defer instantiation to its subclasses, promoting loose coupling and adherence to the Open/Closed principle.

## Why use it?
Use the Factory Method Pattern when:
- You don't know the exact types of objects your code will need to create ahead of time
- You want to let subclasses specify the objects they create
- You want to delegate responsibility of object creation to specialized classes
- You need to provide a hook for subclasses to extend parts of a framework

## How does it work?
1. Define a **Product** interface that declares operations all products must implement
2. Create **Concrete Products** that implement the Product interface
3. Declare an abstract **Creator** class with a factory method that returns Product objects
4. Implement **Concrete Creators** that override the factory method to return specific Product instances

## Examples in real life
- Document creation applications that handle different file formats (PDF, Word, Spreadsheet)
- UI frameworks that create platform-specific components
- Connection factories that create different database connections
- Payment processing systems that handle different payment methods

## Structure
```plaintext
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
|               |    |ConcreteProductA| |ConcreteProductB|
|               |    +-----------+  +-----------+
+---------------+
```

## Pseudocode
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
console.log(creator1.someOperation());

const creator2 = new ConcreteCreatorB();
console.log(creator2.someOperation());
```

## Document Handling Example

In document editing applications, the Factory Method pattern can elegantly handle different document types (PDF, Word, Spreadsheet).

### Key Components

1. **Document Interface**: Defines common operations for all document types
   ```typescript
   interface Document {
     open(): string;
     save(): string;
     getType(): string;
   }
   ```

2. **Concrete Documents**: Various document types implementing the interface
   ```typescript
   class PDFDocument implements Document { ... }
   class WordDocument implements Document { ... }
   class SpreadsheetDocument implements Document { ... }
   ```

3. **Document Creator**: Abstract class with factory method
   ```typescript
   abstract class DocumentCreator {
     abstract createDocument(): Document;
     
     openDocument(): string {
       const document = this.createDocument();
       return document.open();
     }
   }
   ```

4. **Concrete Creators**: Create specific document types
   ```typescript
   class PDFCreator extends DocumentCreator { ... }
   class WordCreator extends DocumentCreator { ... }
   ```

5. **Application Logic**: Uses factory method to create appropriate document handler
   ```typescript
   class Application {
     openDocument(filePath: string): string {
       const creator = this.getCreatorByFileExtension(filePath);
       return creator.openDocument();
     }
     
     // Factory method that selects creator based on the file extension
     private getCreatorByFileExtension(filePath: string): DocumentCreator {
       const extension = filePath.split('.').pop()?.toLowerCase();
       switch(extension) {
         case 'pdf': return new PDFCreator();
         case 'doc': return new WordCreator();
         // etc.
       }
     }
   }
   ```

### Usage Example

```typescript
// Create document creators directly
const pdfCreator = new PDFCreator();
console.log(pdfCreator.openDocument()); // "Opening PDF document (PDF)"

// Or use the application to select the right creator automatically
const app = new Application();
console.log(app.openDocument("report.pdf")); // "Opening PDF document (PDF)"
console.log(app.openDocument("letter.docx")); // "Opening Word document (Word)"
```

## Factory Method vs Simple Factory

Our implementation actually demonstrates both patterns to highlight their differences:

### Factory Method Pattern
The `DocumentCreator` hierarchy in our implementation is a true Factory Method pattern:
- It uses **inheritance** (subclasses) to decide which product to create
- The factory method is declared in a base class and implemented by subclasses
- The business logic (opening/saving documents) is separated from product creation
- Each creator is responsible for creating one specific product type

```typescript
abstract class DocumentCreator {
  abstract createDocument(): Document; // Subclasses implement this
  
  // Business logic uses the factory method
  openDocument(): string {
    const document = this.createDocument();
    return document.open();
  }
}

class PDFCreator extends DocumentCreator {
  createDocument(): Document {
    return new PDFDocument(); // This subclass creates PDFs
  }
}
```

### Simple Factory Pattern
The `Application.getCreatorByFileExtension()` method demonstrates a Simple Factory:
- It uses **conditional logic** within a single class to decide which object to create
- Selection is based on an input parameter (file extension)
- No inheritance is used to defer the creation decision

```typescript
class Application {
  private getCreatorByFileExtension(filePath: string): DocumentCreator {
    const extension = filePath.split('.').pop()?.toLowerCase();
    
    // Conditional logic to select the right creator
    switch(extension) {
      case 'pdf': return new PDFCreator();
      case 'doc': return new WordCreator();
      // etc.
    }
  }
}
```

### When to Use Each
- **Use Factory Method** when you want to:
  - Allow subclasses to extend the system with new product types
  - Defer the creation logic to specialized classes
  - Implement framework code that doesn't know which concrete classes it will use

- **Use Simple Factory** when you want to:
  - Encapsulate object creation in one place
  - Hide creation details from client code
  - Avoid complexity when you don't need the full flexibility of the Factory Method

## Advantages
- **Loose Coupling**: Creates objects without tightly coupling creator and concrete products
- **Single Responsibility**: Moves product creation code to dedicated classes
- **Open/Closed**: Extend with new products without changing existing code
- **Scalable**: Easy to add new product types to the system

## Disadvantages
- **Complexity**: Requires creating many classes, which can be overkill for simple cases
- **Indirection**: Introduces additional levels of abstraction
- **Parallel Hierarchies**: Often requires maintaining parallel class hierarchies for products and creators