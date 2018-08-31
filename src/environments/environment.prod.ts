export const environment = {
  production: true,
  baseUrl: 'https://c2hquality.appspot.com',
  VERSION: require('../../package.json').version,
  apiUrls: {
    'purchaseMovie': '/movieDatabase/v1/moviedatabase/profile/purchasemovie',
    'queryMovies': '/movieDatabase/v1/moviedatabase/querymovies',
    'queryTrendingMovies': '/movieDatabase/v1/moviedatabase/querytrendingmovies',
    'queryOffers': '/movieDatabase/v1/moviedatabase/queryoffers',
    'registerAccount': '/movieDatabase/v1/moviedatabase/registeraccount',
    'getOTP': '/movieDatabase/v1/moviedatabase/registeraccountgetotp',
    'getMovie': '/movieDatabase/v1/moviedatabase/getmovie',
    'deleteCart': '/movieDatabase/v1/profile/deletecart',
    'getDownloadMovies': '/movieDatabase/v1/profile/getdownloadmovies',
    'getProfileOTP': '/movieDatabase/v1/profile/getprofileotp',
    'getProfile': '/movieDatabase/v1/profile/getprofile',
    'getPurchasedGenre': '/movieDatabase/v1/profile/getpurchasedgenre',
    'saveCart': '/movieDatabase/v1/profile/savecart',
    'saveProfile': '/movieDatabase/v1/profile/saveprofile',
    'streamProgress': '/movieDatabase/v1/profile/streamprogress',
    'supportRequest': '/movieDatabase/v1/profile/supportrequest',
    'makeTransaction': '/transaction',
    'payUSuccessUrl': 'http://localhost:8089/gallery'
  }
};
