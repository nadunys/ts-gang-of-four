import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  patternsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Creational Patterns',
      items: [
        'creational/abstract-factory',
        'creational/builder',
        'creational/factory-method',
        'creational/prototype',
        'creational/singleton'
      ],
    },
    {
      type: 'category',
      label: 'Structural Patterns',
      items: [
        'structural/adapter',
        'structural/bridge',
        'structural/composite',
        'structural/decorator',
        'structural/facade',
        'structural/flyweight',
        'structural/proxy'
      ],
    },
    {
      type: 'category',
      label: 'Behavioral Patterns',
      items: [
        'behavioral/chain-of-responsibility',
        'behavioral/command',
        'behavioral/interpreter',
        'behavioral/iterator',
        'behavioral/mediator',
        'behavioral/memento',
        'behavioral/observer',
        'behavioral/state',
        'behavioral/strategy',
        'behavioral/template-method',
        'behavioral/visitor'
      ],
    },
  ],
};

export default sidebars;