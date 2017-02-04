import React, {Component} from 'react';
import './App.css';

import DoubanApiService from './services/DoubanApi';
import UserLookup from './components/UserLookup';
import Books from './components/Books';

const doubanApiService = DoubanApiService();

class App extends Component {

  state = {
    user: {name: 'Loading'},
    bookStat: undefined
  };

  fetchDataByUserID = async(userID) => {
    try {
      const user = await doubanApiService.getUserDetailsByUserID(userID);
      const bookStat = await doubanApiService.getUserBooksByUserID(userID);
      this.setState({user, bookStat});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="App">
        <h2>Welcome to Douban Analytics</h2>
        <UserLookup
          fetchDataByUserID={this.fetchDataByUserID}
          user={this.state.user}
        />
        <Books
          stat={this.state.bookStat}
        />
      </div>
    );
  }
}

export default App;
