import React from 'react';
import R from 'ramda';

function Books(props) {
  if(props.stat) {
    return <div>
      <div>Books</div>
      <div>Total: {R.path(['stat', 'total'])(props)}</div>
      <div>Average days per book: {R.path(['stat', 'averageDays'])(props)}</div>
      <div>Last 30 days read: {R.path(['stat', 'bookCountFromLast30Days'])(props)}</div>
      <div>Last book added at: {String(R.path(['stat', 'lastBookDate'])(props))}</div>
    </div>
  } else {
    return <div>
      Waiting for user profile url.
    </div>
  }

}

export default Books;