/**
 * TypeScript Design Patterns (Gang of Four)
 * 
 * Interactive menu system to explore and demonstrate all 23 GoF design patterns.
 */

import * as readline from 'readline';
import * as path from 'path';
import { execSync } from 'child_process';

// Pattern interface
interface PatternInfo {
  name: string;
  path: string;
}

// Define pattern categories and their implementations
const patterns: {
  creational: Record<string, PatternInfo>;
  structural: Record<string, PatternInfo>;
  behavioral: Record<string, PatternInfo>;
} = {
  creational: {
    '1': { name: 'Singleton', path: 'creational/singleton' },
    '2': { name: 'Abstract Factory', path: 'creational/abstract-factory' },
    '3': { name: 'Factory Method', path: 'creational/factory-method' },
    '4': { name: 'Builder', path: 'creational/builder' },
    '5': { name: 'Prototype', path: 'creational/prototype' }
  },
  structural: {
    '6': { name: 'Adapter', path: 'structural/adapter' },
    '7': { name: 'Bridge', path: 'structural/bridge' },
    '8': { name: 'Composite', path: 'structural/composite' },
    '9': { name: 'Decorator', path: 'structural/decorator' },
    '10': { name: 'Facade', path: 'structural/facade' },
    '11': { name: 'Flyweight', path: 'structural/flyweight' },
    '12': { name: 'Proxy', path: 'structural/proxy' }
  },
  behavioral: {
    '13': { name: 'Chain of Responsibility', path: 'behavioral/chain-of-responsibility' },
    '14': { name: 'Command', path: 'behavioral/command' },
    '15': { name: 'Interpreter', path: 'behavioral/interpreter' },
    '16': { name: 'Iterator', path: 'behavioral/iterator' },
    '17': { name: 'Mediator', path: 'behavioral/mediator' },
    '18': { name: 'Memento', path: 'behavioral/memento' },
    '19': { name: 'Observer', path: 'behavioral/observer' },
    '20': { name: 'State', path: 'behavioral/state' },
    '21': { name: 'Strategy', path: 'behavioral/strategy' },
    '22': { name: 'Template Method', path: 'behavioral/template-method' },
    '23': { name: 'Visitor', path: 'behavioral/visitor' }
  }
};

/**
 * Displays a formatted menu of all design patterns
 */
function printMenu(): void {
  console.clear();
  console.log('\n🏗️ TypeScript Design Patterns (Gang of Four) 🏗️');
  console.log('===========================================\n');
  
  console.log('🔹 CREATIONAL PATTERNS');
  console.log('-------------------');
  Object.entries(patterns.creational).forEach(([key, value]) => {
    console.log(`  ${key}: ${value.name}`);
  });
  
  console.log('\n🔹 STRUCTURAL PATTERNS');
  console.log('-------------------');
  Object.entries(patterns.structural).forEach(([key, value]) => {
    console.log(`  ${key}: ${value.name}`);
  });
  
  console.log('\n🔹 BEHAVIORAL PATTERNS');
  console.log('-------------------');
  Object.entries(patterns.behavioral).forEach(([key, value]) => {
    console.log(`  ${key}: ${value.name}`);
  });
  
  console.log('\n  0: Exit');
  console.log('\n===========================================');
}

/**
 * Run a specific pattern example
 */
function runPatternDemo(patternPath: string): void {
  const fullPath = path.join(__dirname, patternPath, 'index.ts');
  console.log(`\n🚀 Running ${patternPath} example...\n`);
  
  try {
    // Using ts-node to run the example
    execSync(`npx ts-node "${fullPath}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`\n❌ Error: The pattern example at ${patternPath} is not implemented yet.`);
    console.error('You can implement it by adding an index.ts file in that directory.\n');
  }
}

/**
 * Get pattern info from user selection
 */
function getPatternFromSelection(selection: string): PatternInfo | null {
  // Combine all pattern categories
  const allPatterns: Record<string, PatternInfo> = {
    ...patterns.creational,
    ...patterns.structural,
    ...patterns.behavioral
  };
  
  return allPatterns[selection] || null;
}

/**
 * The main menu function
 */
function showMenu(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  printMenu();
  
  rl.question('\n👉 Select a pattern to demonstrate (0-23): ', (answer) => {
    if (answer === '0') {
      console.log('\nExiting. Thanks for exploring design patterns!');
      rl.close();
      return;
    }
    
    const pattern = getPatternFromSelection(answer);
    
    if (pattern) {
      rl.close();
      runPatternDemo(pattern.path);
      
      // After running the pattern, ask if the user wants to continue
      const continueRL = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      continueRL.question('\n🔄 Press Enter to return to the main menu...', () => {
        continueRL.close();
        showMenu();
      });
    } else {
      console.log('\n❌ Invalid selection. Please try again.');
      rl.close();
      showMenu();
    }
  });
}

// Start the interactive menu
showMenu();