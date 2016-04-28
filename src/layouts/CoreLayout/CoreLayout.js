import React, { PropTypes } from 'react';
import styles from './CoreLayout.scss';
import '../../styles/core.scss';

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.main}>
        Merknera
      </header>
      <section className={styles.content}>
        <nav>
          <ul>
            <li className={styles.activeMenuItem}>Home</li>
            <li>Bots</li>
            <li>Games</li>
            <li>Users</li>
          </ul>
        </nav>
        <article>
          {children}
        </article>
      </section>
      <footer>
        &copy; 2016 Mike Leonard - Merknera on Github
      </footer>
    </div>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.element
};

export default CoreLayout;
