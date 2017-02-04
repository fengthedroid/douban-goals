import React, {Component} from 'react';
import fetchJsonp from 'fetch-jsonp';
import './App.css';

import UserLookup from './components/UserLookup';
import Books from './components/Books';

class App extends Component {

  state = {
    user: undefined
  };

  lookupUserByID = async(userID) => {
    try {
      //douban: add your allow origin header in response!
      const user = await (await fetchJsonp(`https://api.douban.com/v2/user/${userID}`)).json();
      console.log(user)
      this.setState({user});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="App">
        <h2>Welcome to Douban Analytics</h2>
        <UserLookup
          lookupUserByID={this.lookupUserByID}
          user={this.state.user}
        />
        <Books />
      </div>
    );
  }
}

export default App;
