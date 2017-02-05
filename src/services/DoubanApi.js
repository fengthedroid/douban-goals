//douban: please add allow origin header to response!
import fetchJsonp from 'fetch-jsonp';
import R from 'ramda';
import moment from 'moment';

export default () => {
  const self = {
    async getUserDetails(userID) {
      return (await fetchJsonp(`https://api.douban.com/v2/user/${userID}`)).json();
    },

    async getBooks(userID) {
      const lastBook = await (await fetchJsonp(`https://api.douban.com/v2/book/user/${userID}/collections?status=read`)).json();
      const total = lastBook.total;
      const lastBookDate = R.pipe(R.head, R.prop('updated'), moment)(lastBook.collections);
      const firstBook = await (await fetchJsonp(`https://api.douban.com/v2/book/user/${userID}/collections?status=read&count=1&start=${total - 1}`)).json();
      const firstBookDate = R.pipe(R.head, R.prop('updated'), moment)(firstBook.collections);
      const period = lastBookDate.diff(firstBookDate, 'days');
      const averageDays = period/total;
      const bookCountFromLast30Days = lastBook.collections.filter((book) => moment().add(-30, 'days').isBefore(book.updated)).length;

      return {
        total,
        averageDays,
        bookCountFromLast30Days,
        lastBookDate
      };
    },

    async getFollowingData(userID) {
      const following = await (await fetchJsonp(`https://api.douban.com/shuo/v2/user/${userID}/following`)).json();
      console.log(following);
    }
  };

  return self;
}