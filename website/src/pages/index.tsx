import React, { JSX } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Explore Design Patterns
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className="pattern-card">
                  <h2>🏗️ Creational Patterns</h2>
                  <p>Patterns that deal with object creation mechanisms:</p>
                  <ul>
                    <li>Factory Method</li>
                    <li>Abstract Factory</li>
                    <li>Builder</li>
                    <li>Prototype</li>
                    <li>Singleton</li>
                  </ul>
                  <Link to="/docs/creational/factory-method" className="button button--outline button--primary">Learn More</Link>
                </div>
              </div>
              <div className="col col--4">
                <div className="pattern-card">
                  <h2>🧱 Structural Patterns</h2>
                  <p>Patterns that focus on object composition:</p>
                  <ul>
                    <li>Adapter</li>
                    <li>Bridge</li>
                    <li>Composite</li>
                    <li>Decorator</li>
                    <li>Facade</li>
                    <li>Flyweight</li>
                    <li>Proxy</li>
                  </ul>
                  <Link to="/docs/structural/adapter" className="button button--outline button--primary">Learn More</Link>
                </div>
              </div>
              <div className="col col--4">
                <div className="pattern-card">
                  <h2>🔄 Behavioral Patterns</h2>
                  <p>Patterns that focus on communication between objects:</p>
                  <ul>
                    <li>Chain of Responsibility</li>
                    <li>Command</li>
                    <li>Interpreter</li>
                    <li>Iterator</li>
                    <li>And more...</li>
                  </ul>
                  <Link to="/docs/behavioral/chain-of-responsibility" className="button button--outline button--primary">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}