// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'https://c2hquality.appspot.com',
  VERSION: require('../../package.json').version,
  apiUrls: {
    'purchaseMovie': '/movieDatabase/v1/profile/purchasemovie',
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
    'makeTransaction': '/transaction'
  }
};
