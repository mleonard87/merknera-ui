/* @flow */
import React, { PropTypes } from 'react';
import styles from './UserTokenNew.scss';

export class UserTokenNew extends React.Component {
  // props: Props;
  static propTypes = {
    generateToken: PropTypes.func.isRequired,
    latestToken: PropTypes.string,
    newToken: PropTypes.func.isRequired,
  };
  constructor () {
    super();
    this.state = {
      description: '',
    };
  }

  handleOnChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleGenerateOnClick = () => {
    this.props.generateToken(this.state.description);
    this.setState({
      description: '',
    });
  };

  handleAnotherOnClick = (e) => {
    e.preventDefault();
    this.props.newToken();
  };

  render () {
    let content;
    if (this.props.latestToken) {
      content = (
        <div>
          <span className={styles.latestToken}>
            {this.props.latestToken}
          </span>
          {' '}
          <a href='#'
            className={styles.tokenAnother}
            onClick={this.handleAnotherOnClick}
            >
            Generate Another Token
          </a>
        </div>
      );
    } else {
      content = (
        <div>
          <input
            className={styles.tokenDescriptionInput}
            type='text'
            placeholder='Description (e.g. token for tic-tac-toe)'
            value={this.state.description}
            onChange={this.handleOnChange}
            />
          <button
            className={styles.tokenGenerateButton}
            disabled={this.state.description === ''}
            onClick={this.handleGenerateOnClick}
            >
            Generate Token
          </button>
        </div>
      );
    }

    return (
      <div className={styles.newTokenContainer}>
        {content}
      </div>
    );
  }
}

export default UserTokenNew;
