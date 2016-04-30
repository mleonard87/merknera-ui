/* @flow */
import React, { PropTypes } from 'react';

const GITHUB_REGEX = /http[s]?:\/\/(www.)?github.com\//
const BITBUCKET_REGEX = /http[s]?:\/\/(www.)?bitbucket.org\//

export class BotWebsiteLink extends React.Component {
  // props: Props;
  static propTypes = {
    website: PropTypes.string.isRequired,
  };

  render () {
    const website = this.props.website;

    // No website
    if (!website) {
      return null;
    }

    // GitHub
    if (website.match(GITHUB_REGEX)) {
      const displayText = website.replace(GITHUB_REGEX, '');
      return (
        <span>
          GitHub: <a href={`${website}`} target='_blank'>{displayText}</a>
        </span>
      );
    }

    // Bitbucket
    if (website.match(BITBUCKET_REGEX)) {
      const displayText = website.replace(BITBUCKET_REGEX, '');
      return (
        <span>
          Bitbucket: <a href={`${website}`} target='_blank'>{displayText}</a>
        </span>
      );
    }

    // Default
    return (
      <span>
        Website: <a href={`${website}`} target='_blank'>{website}</a>
      </span>
    );
  }
}

export default BotWebsiteLink;
