import React, {Component} from 'react';
import R from 'ramda';

class UserLookup extends Component {
  state = {inputValue: ''};
  handleInputChange = (event) => this.setState({inputValue: event.target.value});
  lookupUser = (url = '') => {
    // const match = url.match(/\/people\/([^\/]*)\/$/);
    const match = [0, 42862516];
    if (match && match[1]) {
      this.props.lookupUserByID(match[1]);
    }
  };

  render() {
    return <div>
      <input
        value={this.state.inputValue}
        onChange={this.handleInputChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            this.lookupUser(this.state.inputValue);
          }
        }}
      />
      <button onClick={() => this.lookupUser(this.state.inputValue)}>Lookup</button>
      <div>User: {R.path(['user', 'name'], this.props)}</div>
    </div>;
  }
}

export default UserLookup;