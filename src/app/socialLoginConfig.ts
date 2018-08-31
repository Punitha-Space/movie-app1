import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider} from 'angular5-social-login';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([{
    id: GoogleLoginProvider.PROVIDER_ID,
     provider: new GoogleLoginProvider('584341986342-fu3nmn553v94a283s4b69htqgak3hfv8.apps.googleusercontent.com')
    // provider: new GoogleLoginProvider('161983108000-pcrm720ii2fumrbmmq8lbcfkh6jg1irr.apps.googleusercontent.com')
  },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('235610196954259')
    }]);

  return config;
}
