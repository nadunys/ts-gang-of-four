/**
 * Adapter Design Pattern Demo
 * 
 * This example demonstrates how the Adapter pattern allows classes with
 * incompatible interfaces to work together.
 */
import { Target, Adaptee, Adapter, JSONProcessor, XMLProcessor, XMLToJSONAdapter } from './adapter';

console.log('Adapter Pattern Example');
console.log('-----------------------');

// Example with basic adapter
function clientCode(target: Target): void {
  console.log(target.request());
}

console.log('Client: I can work with Target objects:');
const target = new class implements Target {
  public request(): string {
    return 'Target: The default target\'s behavior.';
  }
};
clientCode(target);

console.log('\nClient: The Adaptee class has an incompatible interface:');
const adaptee = new Adaptee();
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('\nClient: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);

// Example with XML to JSON adapter
console.log('\n\nPractical Example: XML to JSON Adapter');
console.log('-------------------------------------');

function processJSONWithClient(processor: JSONProcessor, data: string): void {
  console.log('Client: Processing JSON data...');
  const result = processor.processJSONData(data);
  console.log(`Client: Result: ${result}`);
}

// Create the XML processor (adaptee)
const xmlProcessor = new XMLProcessor();

// Try to use it directly - this would be incompatible
console.log('Direct XMLProcessor usage:');
const xmlResult = xmlProcessor.processXMLData('<data>Test XML</data>');
console.log(`Result: ${xmlResult}`);

// Use the adapter to make it work with JSON data
console.log('\nUsing XMLToJSONAdapter:');
const xmlToJsonAdapter = new XMLToJSONAdapter(xmlProcessor);
processJSONWithClient(xmlToJsonAdapter, '{"data": "Test JSON"}');