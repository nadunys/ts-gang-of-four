/**
 * Bridge Design Pattern Demo
 * 
 * This example demonstrates how the Bridge pattern decouples an abstraction
 * from its implementation, allowing them to vary independently.
 */
import { 
  Abstraction, 
  RefinedAbstraction, 
  Implementation, 
  ConcreteImplementationA, 
  ConcreteImplementationB,
  UIComponent,
  Button,
  Checkbox,
  WebRenderer,
  MobileRenderer,
  DesktopRenderer
} from './bridge';

console.log('Bridge Pattern Example');
console.log('---------------------');

// Basic bridge pattern example
function clientCode(abstraction: Abstraction): void {
  console.log(abstraction.operation());
}

// Using different implementations with the same abstraction
console.log('Client: Using ConcreteImplementationA:');
let implementation = new ConcreteImplementationA();
let abstraction = new RefinedAbstraction(implementation);
clientCode(abstraction);

console.log('\nClient: Using ConcreteImplementationB:');
implementation = new ConcreteImplementationB();
abstraction = new RefinedAbstraction(implementation);
clientCode(abstraction);

// Practical example: UI components rendered on different platforms
console.log('\n\nPractical Example: UI Component Rendering');
console.log('--------------------------------------');

// Create different renderers (implementations)
const webRenderer = new WebRenderer();
const mobileRenderer = new MobileRenderer();
const desktopRenderer = new DesktopRenderer();

// Create different UI components with different renderers
const webButton = new Button(webRenderer);
const mobileButton = new Button(mobileRenderer);
const desktopButton = new Button(desktopRenderer);
const webCheckbox = new Checkbox(webRenderer);
const mobileCheckbox = new Checkbox(mobileRenderer);

// Render components on different platforms
console.log('Rendering components on different platforms:');
console.log(webButton.render());
console.log(mobileButton.render());
console.log(desktopButton.render());
console.log(webCheckbox.render());
console.log(mobileCheckbox.render());

// The Bridge pattern allows us to add new UI components or platforms
// without changing existing code
console.log('\nAdding a new component without changing renderers:');
class RadioButton extends UIComponent {
  public render(): string {
    return `RadioButton: ${this.renderer.renderControl("RadioButton")}`;
  }
}

const webRadioButton = new RadioButton(webRenderer);
const mobileRadioButton = new RadioButton(mobileRenderer);

console.log(webRadioButton.render());
console.log(mobileRadioButton.render());