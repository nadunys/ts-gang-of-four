/**
 * Factory Method Pattern Example
 * 
 * This example demonstrates how the Factory Method pattern defines an interface
 * for creating an object, but lets subclasses decide which class to instantiate.
 */
import { 
  Creator, 
  ConcreteCreatorA, 
  ConcreteCreatorB,
  Application,
  DocumentCreator,
  PDFCreator,
  WordCreator,
  SpreadsheetCreator
} from './factory-method';

console.log('Factory Method Pattern Example');
console.log('-----------------------------');

// Basic demonstration
console.log('\n1. Basic Factory Method Pattern:');
console.log('--------------------------------');

function clientCode(creator: Creator): void {
  console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
  console.log(creator.someOperation());
}

console.log('Client code working with Creator A:');
clientCode(new ConcreteCreatorA());
console.log('');

console.log('Client code working with Creator B:');
clientCode(new ConcreteCreatorB());

// Document example - more practical implementation
console.log('\n\n2. Document Handling Example:');
console.log('----------------------------');

// Individual document creators
console.log('\nUsing specific document creators:');
const pdfCreator = new PDFCreator();
const wordCreator = new WordCreator();
const spreadsheetCreator = new SpreadsheetCreator();

console.log(pdfCreator.openDocument());
console.log(pdfCreator.saveDocument());

console.log(wordCreator.openDocument());
console.log(spreadsheetCreator.openDocument());

// Application that selects the appropriate factory based on file extension
console.log('\nUsing Application that selects factory based on file extension:');
const app = new Application();

console.log(app.openDocument('report.pdf'));
console.log(app.openDocument('letter.docx'));
console.log(app.saveDocument('budget.xlsx'));
console.log(app.saveDocument('data.csv'));

// Testing with unsupported format
try {
  console.log(app.openDocument('image.jpg'));
} catch (error) {
  console.log(`Error handled: ${(error as Error).message}`);
}