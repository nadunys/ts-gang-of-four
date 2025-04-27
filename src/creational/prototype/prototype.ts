/**
 * Prototype Design Pattern
 * 
 * Intent: Lets you copy existing objects without making your code dependent on
 * their classes.
 */

/**
 * The Prototype interface declares the cloning method. In most cases, this
 * is just a single clone method.
 */
export interface Prototype<T> {
  /**
   * The clone method returns a new object that is a copy of the current instance.
   */
  clone(): T;
}

/**
 * Concrete implementation of the Prototype interface.
 * Simplified by assuming all values are strings.
 */
export class ConcretePrototype implements Prototype<ConcretePrototype> {
  public primitive: string;
  public component: Record<string, string>;
  public circularReference: ComponentWithBackReference;

  constructor(primitive: string, component: Record<string, string> = {}, circularReference?: ComponentWithBackReference) {
    this.primitive = primitive;
    this.component = { ...component };
    
    // If circular reference is not provided, create it
    if (!circularReference) {
      this.circularReference = new ComponentWithBackReference(this);
    } else {
      this.circularReference = circularReference;
    }
  }

  /**
   * The clone method creates a deep copy of current object.
   */
  public clone(): ConcretePrototype {
    // Clone simple primitives
    const clone = new ConcretePrototype(this.primitive);
    
    // Clone string-based component object
    clone.component = { ...this.component };
    
    // For a deep copy, we copy each string property
    Object.keys(this.component).forEach(key => {
      clone.component[key] = this.component[key];
    });

    // Clone the object with back reference
    clone.circularReference = new ComponentWithBackReference(clone);
    
    return clone;
  }
}

/**
 * This is a helper class that contains a reference back to the main prototype.
 * This demonstrates how to handle circular references in prototype pattern.
 */
export class ComponentWithBackReference {
  public prototype: ConcretePrototype;

  constructor(prototype: ConcretePrototype) {
    this.prototype = prototype;
  }
}