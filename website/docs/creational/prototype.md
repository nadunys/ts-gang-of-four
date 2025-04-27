---
sidebar_position: 4
---

# Prototype Pattern

## Intent
The Prototype Pattern lets you create new objects by copying existing ones without making your code dependent on their classes.

## Motivation & Problem
When creating an object is more expensive or complex than copying an existing one, or when your code shouldn't depend on the concrete classes of objects you need to create. This pattern is especially useful when object creation requires accessing resources that are expensive to access or initialize.

## Applicability
Use the Prototype Pattern when:
- Classes to instantiate are specified at runtime
- You want to avoid building a class hierarchy of factories that parallels the hierarchy of products
- Instances of a class can have one of only a few different combinations of state
- Object creation is expensive compared to cloning
- You need to keep the number of classes in a system to a minimum

## Structure
```
+-------------------+
|   Prototype       |
|-------------------|
| + clone(): Type   |
+-------------------+
        /\
         |
+-------------------+
| ConcretePrototype |
|-------------------|
| + clone(): Type   |
+-------------------+
```

## Participants
- **Prototype**: Declares an interface for cloning itself
- **ConcretePrototype**: Implements the operation for cloning itself
- **Client**: Creates a new object by asking a prototype to clone itself

## Implementation
```typescript
// Prototype interface
interface Prototype<T> {
    clone(): T;
}

// Concrete Prototype
class ConcretePrototype implements Prototype<ConcretePrototype> {
    public primitive: any;
    public component: object;
    public circularReference: ComponentWithBackReference;

    public clone(): ConcretePrototype {
        const clone = Object.create(this);
        
        // Clone primitive field values
        clone.primitive = this.primitive;
        
        // Clone simple object - this works only for simple objects
        clone.component = Object.create(this.component);

        // Clone the object with back reference
        // Must handle circular references carefully
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this }
        };
        
        return clone;
    }
}

class ComponentWithBackReference {
    public prototype: ConcretePrototype;
    
    constructor(prototype: ConcretePrototype) {
        this.prototype = prototype;
    }
}

// Usage
const p1 = new ConcretePrototype();
p1.primitive = 245;
p1.component = new Date();
p1.circularReference = new ComponentWithBackReference(p1);

const p2 = p1.clone();

// Check if the primitive field values have been copied
console.log(p1.primitive === p2.primitive); // true

// Check that component references are different objects
console.log(p1.component !== p2.component); // true

// Check that circular references didn't cause infinite recursion
console.log(p1.circularReference !== p2.circularReference); // true
console.log(p1.circularReference.prototype !== p2.circularReference.prototype); // true
```

### TypeScript-Specific Implementation Notes
- Use interfaces to define the Prototype contract
- TypeScript's generics can enforce type safety in clone operations
- Consider using the structured clone API for deep cloning
- Use Object.create() for shallow cloning of objects
- Be careful with circular references, which require special handling

## Real-World Examples
- Object caching systems to reduce resource usage
- Cloning configurations with slight variations
- Duplicating complex data structures like documents
- Copy-paste functionality in applications
- Saving/restoring object states or creating snapshots

## Advantages & Disadvantages

### Advantages
- You can clone objects without coupling to their concrete classes
- You can get rid of repeated initialization code in favor of cloning
- You can produce complex objects more conveniently
- You get an alternative to inheritance when dealing with configuration presets

### Disadvantages
- Cloning complex objects with circular references might be challenging
- Deep cloning can be resource-intensive for complex objects
- Each concrete prototype might require special handling for proper cloning

## Related Patterns
- **Abstract Factory**: Prototype can be used when the number of classes is large or dynamic
- **Composite**: Prototypes can be used to clone complex Composite structures
- **Decorator**: Designs that make heavy use of Composite and Decorator patterns often benefit from Prototype as well
- **Memento**: Can be used together with Prototype to store and restore object snapshots

## Example Code
You can find the complete implementation of this pattern in our repository:
- [Prototype Implementation](https://github.com/nadunys/ts-gang-of-four/tree/main/src/creational/prototype)
