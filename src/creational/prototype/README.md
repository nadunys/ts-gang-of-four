# Prototype Pattern

## What is it?
The Prototype Pattern lets you create new objects by copying existing ones. This means you don’t need to depend on the class of the object you’re copying.

## Why use it?
Use the Prototype Pattern when:
- You want to create objects based on a sample (prototype).
- You want to avoid creating a lot of factory classes.
- You need to copy objects with different states easily.

## How does it work?
1. Create a prototype interface with a `clone` method.
2. Implement the `clone` method in your classes.
3. Decide if you need a shallow copy (simple copy) or a deep copy (copy everything, even nested objects).

## Examples in real life
- Copying a document in a word processor.
- Cloning characters or items in a game.
- Creating object variations without manual setup.

## Structure
```plaintext
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

## Pseudocode
```typescript
// Prototype interface
interface Prototype {
    clone(): Prototype;
}

// Concrete Prototype
class ConcretePrototype implements Prototype {
    private data: string;

    constructor(data: string) {
        this.data = data;
    }

    // Clone method
    public clone(): ConcretePrototype {
        return new ConcretePrototype(this.data);
    }
}

// Usage
const original = new ConcretePrototype("Sample Data");
const copy = original.clone();
console.log(original === copy); // false
console.log(copy);
```

## Handling Circular References

When implementing the Prototype Pattern, you may encounter circular references in your objects. A circular reference occurs when two or more objects reference each other, creating a loop. This can make cloning more complex, especially for deep copies.

### Example of Circular Reference
```typescript
class Node implements Prototype {
    public value: string;
    public next: Node | null = null;

    constructor(value: string) {
        this.value = value;
    }

    public clone(): Node {
        const clonedNode = new Node(this.value);
        if (this.next) {
            clonedNode.next = this.next.clone();
        }
        return clonedNode;
    }
}

// Usage
const first = new Node("first");
const second = new Node("second");
first.next = second;
second.next = first; // Circular reference

const clonedFirst = first.clone();
console.log(clonedFirst);
```

### How to Handle It
To handle circular references:
1. Use a map or dictionary to keep track of already cloned objects.
2. Check if an object has already been cloned before creating a new copy.

### Example with Circular Reference Handling
```typescript
class NodeWithMap implements Prototype {
    public value: string;
    public next: NodeWithMap | null = null;

    constructor(value: string) {
        this.value = value;
    }

    public clone(map = new Map()): NodeWithMap {
        if (map.has(this)) {
            return map.get(this);
        }

        const clonedNode = new NodeWithMap(this.value);
        map.set(this, clonedNode);

        if (this.next) {
            clonedNode.next = this.next.clone(map);
        }

        return clonedNode;
    }
}

// Usage
const firstNode = new NodeWithMap("first");
const secondNode = new NodeWithMap("second");
firstNode.next = secondNode;
secondNode.next = firstNode; // Circular reference

const clonedFirstNode = firstNode.clone();
console.log(clonedFirstNode);
```

### Key Points
- Circular references require special handling to avoid infinite loops.
- Use a map to track already cloned objects during the cloning process.

## Advantages
- You can copy objects without depending on their classes.
- Saves time by reusing pre-built objects.
- Makes creating complex objects easier.

## Disadvantages
- Copying objects with nested structures can be tricky.
- Deep copying can use a lot of resources.
- Needs careful implementation to avoid errors.