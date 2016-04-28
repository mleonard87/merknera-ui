/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { listBots } from '../../redux/modules/bots';
import BotList from 'components/BotList';
// import DuckImage from './Duck.jpg';
// import classes from './BotsView.scss';

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
// type Props = {};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class BotsView extends React.Component {
  // props: Props;
  static propTypes = {
    listBots: PropTypes.func.isRequired,
    bots: PropTypes.array.isRequired,
  };

  componentDidMount = () => {
    console.log('componentDidMount');
    this.props.listBots();
  }

  render () {
    return (
      <BotList bots={this.props.bots.botsList} />
    );
  }
}

const mapStateToProps = (state) => ({
  bots: state.bots
});

export default connect(mapStateToProps, {
  listBots: () => listBots(),
})(BotsView);
