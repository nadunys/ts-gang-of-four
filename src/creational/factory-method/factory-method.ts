/**
 * Factory Method Design Pattern
 * 
 * Intent: Defines an interface for creating an object, but lets subclasses decide
 * which class to instantiate. Factory Method lets a class defer instantiation to subclasses.
 * 
 * Note: This implementation demonstrates both the Factory Method pattern and the Simple Factory pattern
 * to showcase the differences between them.
 */

/**
 * The Product interface declares the operations that all concrete products must implement.
 */
export interface Product {
  operation(): string;
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
export class ConcreteProductA implements Product {
  public operation(): string {
    return 'Result of ConcreteProductA';
  }
}

export class ConcreteProductB implements Product {
  public operation(): string {
    return 'Result of ConcreteProductB';
  }
}

/**
 * The Creator class declares the factory method that returns an object of
 * the Product type. The Creator's subclasses typically provide the
 * implementation of this method.
 */
export abstract class Creator {
  /**
   * Note that the Creator may also provide some default implementation of the
   * factory method.
   */
  public abstract factoryMethod(): Product;

  /**
   * Also note that, despite its name, the Creator's primary responsibility is
   * not creating products. Usually, it contains some core business logic that
   * relies on Product objects, returned by the factory method. Subclasses can
   * indirectly change that business logic by overriding the factory method
   * and returning a different type of product from it.
   */
  public someOperation(): string {
    // Call the factory method to create a Product object.
    const product = this.factoryMethod();
    // Now, use the product.
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
export class ConcreteCreatorA extends Creator {
  /**
   * Note that the signature of the method still uses the abstract product
   * type, even though the concrete product is actually returned from the
   * method. This way the Creator can stay independent of concrete product
   * classes.
   */
  public factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

export class ConcreteCreatorB extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

/**
 * Document Creator Example: A more practical factory method implementation
 */

/**
 * Product interface for documents
 */
export interface Document {
  open(): string;
  save(): string;
  getType(): string;
}

/**
 * Concrete document types
 */
export class PDFDocument implements Document {
  public open(): string {
    return 'Opening PDF document';
  }

  public save(): string {
    return 'Saving PDF document';
  }

  public getType(): string {
    return 'PDF';
  }
}

export class WordDocument implements Document {
  public open(): string {
    return 'Opening Word document';
  }

  public save(): string {
    return 'Saving Word document';
  }

  public getType(): string {
    return 'Word';
  }
}

export class SpreadsheetDocument implements Document {
  public open(): string {
    return 'Opening Spreadsheet document';
  }

  public save(): string {
    return 'Saving Spreadsheet document';
  }

  public getType(): string {
    return 'Spreadsheet';
  }
}

/**
 * Abstract document creator with factory method
 */
export abstract class DocumentCreator {
  // Factory method
  public abstract createDocument(): Document;

  // Business logic that uses the factory method
  public openDocument(): string {
    // Create document using factory method
    const document = this.createDocument();
    
    // Use the document
    return `${document.open()} (${document.getType()})`;
  }

  public saveDocument(): string {
    const document = this.createDocument();
    return `${document.save()} (${document.getType()})`;
  }
}

/**
 * Concrete document creators - each one creates a specific document type
 */
export class PDFCreator extends DocumentCreator {
  public createDocument(): Document {
    return new PDFDocument();
  }
}

export class WordCreator extends DocumentCreator {
  public createDocument(): Document {
    return new WordDocument();
  }
}

export class SpreadsheetCreator extends DocumentCreator {
  public createDocument(): Document {
    return new SpreadsheetDocument();
  }
}

/**
 * Application that uses a factory method to create documents based on file extension
 * 
 * Note: This class actually demonstrates the Simple Factory pattern, not the Factory Method pattern.
 * The difference is:
 * - Factory Method uses inheritance (subclasses) to decide which product to create
 * - Simple Factory uses conditional logic within a single class to decide which product to create
 * 
 * We include this here to show the contrast between these related but different patterns.
 */
export class Application {
  public openDocument(filePath: string): string {
    const creator = this.getCreatorByFileExtension(filePath);
    return creator.openDocument();
  }

  public saveDocument(filePath: string): string {
    const creator = this.getCreatorByFileExtension(filePath);
    return creator.saveDocument();
  }

  private getCreatorByFileExtension(filePath: string): DocumentCreator {
    // Extract file extension
    const extension = filePath.split('.').pop()?.toLowerCase();
    
    // Select creator based on file extension
    switch(extension) {
      case 'pdf':
        return new PDFCreator();
      case 'doc':
      case 'docx':
        return new WordCreator();
      case 'xls':
      case 'xlsx':
      case 'csv':
        return new SpreadsheetCreator();
      default:
        throw new Error(`Unsupported file type: ${extension}`);
    }
  }
}