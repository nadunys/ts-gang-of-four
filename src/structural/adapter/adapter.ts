/**
 * Adapter Design Pattern
 * 
 * Intent: Converts the interface of a class into another interface clients expect.
 * Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.
 */

/**
 * The Target defines the domain-specific interface used by the client code.
 */
export interface Target {
  request(): string;
}

/**
 * The Adaptee contains some useful behavior, but its interface is incompatible
 * with the existing client code. The Adaptee needs some adaptation before the
 * client code can use it.
 */
export class Adaptee {
  public specificRequest(): string {
    return 'Special behavior of the Adaptee.';
  }
}

/**
 * The Adapter makes the Adaptee's interface compatible with the Target's
 * interface via composition.
 */
export class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  public request(): string {
    return `Adapter: (TRANSLATED) ${this.adaptee.specificRequest()}`;
  }
}

/**
 * More practical example: File format converters
 */

/**
 * The target interface for JSON data processing
 */
export interface JSONProcessor {
  processJSONData(data: string): string;
}

/**
 * The adaptee is a legacy XML processor that we want to reuse
 */
export class XMLProcessor {
  public processXMLData(data: string): string {
    // Simulate processing XML data
    console.log('Processing XML data...');
    return `Processed XML Data: ${data}`;
  }
}

/**
 * The XMLToJSONAdapter allows the client to use the XMLProcessor 
 * as if it were a JSONProcessor
 */
export class XMLToJSONAdapter implements JSONProcessor {
  private xmlProcessor: XMLProcessor;
  
  constructor(xmlProcessor: XMLProcessor) {
    this.xmlProcessor = xmlProcessor;
  }
  
  public processJSONData(jsonData: string): string {
    // Convert JSON to XML (simplified for demonstration)
    const xmlData = this.convertJSONToXML(jsonData);
    
    // Use the adaptee to process the XML
    const result = this.xmlProcessor.processXMLData(xmlData);
    
    // Convert result back to JSON format
    return this.convertXMLToJSON(result);
  }
  
  private convertJSONToXML(jsonData: string): string {
    // In a real implementation, this would convert JSON to XML
    // This is simplified for demonstration
    console.log('Converting JSON to XML...');
    return `<root>${jsonData}</root>`;
  }
  
  private convertXMLToJSON(xmlData: string): string {
    // In a real implementation, this would convert XML to JSON
    // This is simplified for demonstration
    console.log('Converting XML back to JSON...');
    return `{"result": "${xmlData}"}`;
  }
}