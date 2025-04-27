/**
 * Singleton Design Pattern
 * 
 * Intent: Ensures that a class has only one instance and provides a global point
 * of access to it.
 */

export class Singleton {
  private static instance: Singleton;
  
  // The Singleton's constructor should always be private to prevent direct
  // construction calls with the `new` operator.
  private constructor() {
    // Initialize any properties or state here
  }

  /**
   * The static method that controls access to the singleton instance.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  public someBusinessLogic(): string {
    return 'I am a singleton instance!';
  }
}