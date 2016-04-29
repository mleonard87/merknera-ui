import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
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
export class CoreLayout extends React.Component {
  render () {
    const getActiveClass = (to) => {
      let pathname = this.props.router.locationBeforeTransitions.pathname;
      if (to === pathname) {
        return styles.activeMenuItem;
      } else {
        return null;
      }
    };

    return (
      <div className={styles.wrapper}>
        <header className={styles.main}>
          Merknera
        </header>
        <section className={styles.content}>
          <nav className={styles.main}>
            <ul>
              <li className={getActiveClass('/')}>
                <Link to='/'>Home</Link>
              </li>
              <li className={getActiveClass('/bots')}>
                <Link to='/bots'>Bots</Link>
              </li>
              <li className={getActiveClass('/games')}>
                <Link to='/games'>Games</Link>
              </li>
              <li className={getActiveClass('/users')}>
                <Link to='/users'>Users</Link>
              </li>
            </ul>
          </nav>
          <article className={styles.main}>
            {this.props.children}
          </article>
        </section>
        <footer>
          &copy; 2016 Mike Leonard - Merknera on Github
        </footer>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
};

const mapStateToProps = (state) => ({
  router: state.router,
});

export default connect(mapStateToProps)(CoreLayout);
