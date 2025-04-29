/**
 * Bridge Design Pattern
 * 
 * Intent: Decouples an abstraction from its implementation so that the two can vary independently.
 */

/**
 * The Abstraction defines the interface for the "control" part of the two class
 * hierarchies. It maintains a reference to an object of the Implementation
 * hierarchy and delegates all of the real work to this object.
 */
export abstract class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public abstract operation(): string;
}

/**
 * You can extend the Abstraction without changing the Implementation classes.
 */
export class RefinedAbstraction extends Abstraction {
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `RefinedAbstraction: Working with:\n${result}`;
  }
}

/**
 * The Implementation defines the interface for all implementation classes. It
 * doesn't have to match the Abstraction's interface. In fact, the two
 * interfaces can be entirely different. Typically the Implementation interface
 * provides only primitive operations, while the Abstraction defines higher-
 * level operations based on those primitives.
 */
export interface Implementation {
  operationImplementation(): string;
}

/**
 * Each Concrete Implementation corresponds to a specific platform and
 * implements the Implementation interface using that platform's API.
 */
export class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return 'ConcreteImplementationA: Here\'s the result on platform A.';
  }
}

export class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return 'ConcreteImplementationB: Here\'s the result on platform B.';
  }
}

/**
 * More practical example: UI rendering on different platforms
 */

/**
 * The Abstraction: UI Component
 */
export abstract class UIComponent {
  protected renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  public abstract render(): string;
}

/**
 * Refined Abstractions: Different UI components
 */
export class Button extends UIComponent {
  public render(): string {
    return `Button: ${this.renderer.renderControl("Button")}`;
  }
}

export class Checkbox extends UIComponent {
  public render(): string {
    return `Checkbox: ${this.renderer.renderControl("Checkbox")}`;
  }
}

/**
 * The Implementation: Platform Renderers
 */
export interface Renderer {
  renderControl(controlType: string): string;
}

/**
 * Concrete Implementations: Platform specific rendering
 */
export class WebRenderer implements Renderer {
  public renderControl(controlType: string): string {
    return `Rendering ${controlType} as HTML element for web platform`;
  }
}

export class MobileRenderer implements Renderer {
  public renderControl(controlType: string): string {
    return `Rendering ${controlType} as native control for mobile platform`;
  }
}

export class DesktopRenderer implements Renderer {
  public renderControl(controlType: string): string {
    return `Rendering ${controlType} as desktop GUI component`;
  }
}