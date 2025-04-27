const fs = require('fs');
const path = require('path');

const patternCategories = ['creational', 'structural', 'behavioral'];
const baseDir = path.join(__dirname, 'src');
const docsDir = path.join(__dirname, 'website', 'docs');

// List of all design patterns we want to include
const allPatterns = {
  creational: ['abstract-factory', 'builder', 'factory-method', 'prototype', 'singleton'],
  structural: ['adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy'],
  behavioral: [
    'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator',
    'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor'
  ]
};

// Function to capitalize a pattern name for display
const formatPatternName = (pattern) => {
  return pattern.split('-')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
};

// Generate placeholder content for patterns without README files
const generatePlaceholderContent = (category, pattern) => {
  const patternName = formatPatternName(pattern);
  return `---
sidebar_position: ${allPatterns[category].indexOf(pattern) + 1}
---

# ${patternName} Pattern

> This pattern documentation is coming soon.

## Intent
${getPatternIntent(pattern)}

## Structure
*Documentation in progress*

## Implementation Example
*Documentation in progress*

## Real-World Examples
*Documentation in progress*

## Example Code
Once implemented, the complete code for this pattern will be available at:
- [${patternName} Implementation](https://github.com/nadunys/ts-gang-of-four/tree/main/src/${category}/${pattern})
`;
};

// Function to provide a brief intent for placeholder files
function getPatternIntent(pattern) {
  const intents = {
    // Structural patterns
    'adapter': 'Converts the interface of a class into another interface clients expect. Adapter lets classes work together that couldn\'t otherwise because of incompatible interfaces.',
    'bridge': 'Decouples an abstraction from its implementation so that the two can vary independently.',
    'composite': 'Composes objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.',
    'decorator': 'Attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.',
    'facade': 'Provides a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.',
    'flyweight': 'Uses sharing to support large numbers of fine-grained objects efficiently.',
    'proxy': 'Provides a surrogate or placeholder for another object to control access to it.',
    
    // Behavioral patterns
    'chain-of-responsibility': 'Avoids coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chains the receiving objects and passes the request along the chain until an object handles it.',
    'command': 'Encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.',
    'interpreter': 'Given a language, defines a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.',
    'iterator': 'Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.',
    'mediator': 'Defines an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly.',
    'memento': 'Without violating encapsulation, captures and externalizes an object\'s internal state so that the object can be restored to this state later.',
    'observer': 'Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.',
    'state': 'Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.',
    'strategy': 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.',
    'template-method': 'Defines the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm\'s structure.',
    'visitor': 'Represents an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.'
  };
  
  return intents[pattern] || 'This design pattern helps solve common design problems.';
}

// Function to update sidebar.ts after migration
const updateSidebar = () => {
  const sidebarPath = path.join(__dirname, 'website', 'sidebars.ts');
  
  // Create the sidebar items for each category
  const categoryItems = {};
  
  patternCategories.forEach(category => {
    const categoryDir = path.join(docsDir, category);
    if (fs.existsSync(categoryDir)) {
      const docs = fs.readdirSync(categoryDir)
        .filter(file => file.endsWith('.md'))
        .map(file => `'${category}/${path.basename(file, '.md')}'`);
      
      if (docs.length > 0) {
        categoryItems[category] = docs;
      }
    }
  });

  // Generate the new sidebar content
  let newSidebar = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  patternsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },`;

  // Add each category with its items
  patternCategories.forEach(category => {
    if (categoryItems[category]?.length > 0) {
      const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
      
      newSidebar += `
    {
      type: 'category',
      label: '${categoryLabel} Patterns',
      items: [
        ${categoryItems[category].join(',\n        ')}
      ],
    },`;
    }
  });

  // Close the sidebar configuration
  newSidebar += `
  ],
};

export default sidebars;`;

  // Write the updated sidebar
  fs.writeFileSync(sidebarPath, newSidebar);
  console.log('Updated sidebars.ts');
};

// Function to fix broken links in index.tsx
const fixHomepageLinks = () => {
  // Make sure the first pattern of each category exists
  const categoriesFirstPattern = {
    'creational': 'factory-method',
    'structural': 'adapter',
    'behavioral': 'chain-of-responsibility'
  };
  
  // Ensure the first pattern of each category has a documentation file
  Object.entries(categoriesFirstPattern).forEach(([category, pattern]) => {
    const docPath = path.join(docsDir, category, `${pattern}.md`);
    if (!fs.existsSync(docPath)) {
      // Create directory if it doesn't exist
      const categoryDir = path.join(docsDir, category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }
      
      // Generate placeholder content
      const content = generatePlaceholderContent(category, pattern);
      fs.writeFileSync(docPath, content);
      console.log(`✅ Created placeholder file for ${category}/${pattern}`);
    }
  });
  
  console.log('Homepage links should now be valid');
};

// Main migration function
const migratePatternDocs = () => {
  console.log('Starting migration of pattern documentation to Docusaurus...');
  
  // Ensure the docs directory exists
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  // Fix homepage links first to ensure they're valid
  fixHomepageLinks();
  
  // Process each category
  patternCategories.forEach(category => {
    const categoryDir = path.join(baseDir, category);
    const docsCategoryDir = path.join(docsDir, category);
    
    // Create the category directory in docs if it doesn't exist
    if (!fs.existsSync(docsCategoryDir)) {
      fs.mkdirSync(docsCategoryDir, { recursive: true });
    }
    
    // Process each expected pattern for this category
    allPatterns[category].forEach((pattern, patternIndex) => {
      const readmePath = path.join(categoryDir, pattern, 'README.md');
      const docPath = path.join(docsCategoryDir, `${pattern}.md`);
      
      // Check if the doc file already exists
      if (!fs.existsSync(docPath)) {
        if (fs.existsSync(readmePath)) {
          // If README exists, convert it to a doc file
          let content = fs.readFileSync(readmePath, 'utf8');
          
          // Skip the file path comment if present
          if (content.startsWith('//')) {
            const lineEndIndex = content.indexOf('\n');
            if (lineEndIndex > 0) {
              content = content.substring(lineEndIndex + 1);
            }
          }
          
          // Add frontmatter with sidebar position
          const frontmatter = `---
sidebar_position: ${patternIndex + 1}
---

`;
          
          // Add GitHub repository link at the end if not already present
          let repoLink = '';
          if (!content.includes('github.com/nadunys/ts-gang-of-four')) {
            repoLink = `\n\n## Example Code
You can find the complete implementation of this pattern in our repository:
- [${formatPatternName(pattern)} Implementation](https://github.com/nadunys/ts-gang-of-four/tree/main/src/${category}/${pattern})
`;
          }
          
          // Create the final content
          const finalContent = frontmatter + content + repoLink;
          
          // Write the file
          fs.writeFileSync(docPath, finalContent);
          console.log(`✅ Migrated ${category}/${pattern}`);
        } else {
          // Create a placeholder file if README doesn't exist
          const content = generatePlaceholderContent(category, pattern);
          fs.writeFileSync(docPath, content);
          console.log(`📄 Created placeholder for ${category}/${pattern}`);
        }
      } else {
        console.log(`⏭️ Skipping ${category}/${pattern} (already exists)`);
      }
    });
  });
  
  // Update sidebars.ts with all migrated docs
  updateSidebar();
  
  console.log('Migration complete! You can now build your Docusaurus site.');
};

// Execute the migration
migratePatternDocs();