/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { listUsers } from '../../redux/modules/users';
import UserList from 'components/UserList';

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
export class UsersView extends React.Component {
  // props: Props;
  static propTypes = {
    listUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
  };

  componentDidMount = () => {
    this.props.listUsers();
  }

  render () {
    return (
      <div>
        <UserList users={this.props.users.usersList} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, {
  listUsers: () => listUsers(),
})(UsersView);
