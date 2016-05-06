import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SignInMenu from 'containers/SignInMenu';
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

      if (pathname !== '/' && to === '/') {
        return null;
      } else if (pathname.substring(1).startsWith(to.substring(1))) {
        return styles.activeMenuItem;
      } else {
        return null;
      }
    };

    return (
      <div className={styles.wrapper}>
        <header className={styles.main}>
          <h1>Merknera</h1>
          <SignInMenu />
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
          <ul className={styles.footerItems}>
            <li>&copy; 2016 Mike Leonard</li>
            <li>
              <a href='https://github.com/mleonard87/merknera' target='_blank'>
                Merknera on Github
              </a>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element,
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  router: state.router,
});

export default connect(mapStateToProps)(CoreLayout);
