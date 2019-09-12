// Login Constants.
// This file contains all your Firebase settings, and app routes.
// It's important to set in your Firebase, Facebook, and Google app credentials here.
// If you have a different view for the homePage, trialPage, and verificationPage
// You can import them here and set them accordingly.
// If you want to disable emailVerification, simply set it to false.

import {TabsPage} from './pages/tabs/tabs';
import {VerificationPage} from './pages/verification/verification';
import {TrialPage} from './pages/trial/trial';
import {LoginPage} from './pages/login/login';

export namespace Login {
  // Get your Firebase app's config on your Firebase console. "Add Firebase to your web app".
  export const firebaseConfig = {

    apiKey: "AIzaSyB-6XBn_KojN2HNk0BSc1imrZysJRLkgX8",
    authDomain: "ionsocial-14887.firebaseapp.com",
    databaseURL: "https://ionsocial-14887.firebaseio.com",
    projectId: "ionsocial-14887",
    storageBucket: "ionsocial-14887.appspot.com",
    messagingSenderId: "521183450177"

  };
  // Get your Facebook App Id from your app at http://developers.facebook.com
  export const facebookAppId: string ="814520985371944"; // 1025234637591184

  // TESTing account
  export const googleClientId: string ="521183450177-cvjk6anvuvaptpogd6pua2fsjcekoo6p.apps.googleusercontent.com"

  // Set in your appropriate Login routes, don't forget to import the pages on app.module.ts
  export const homePage = TabsPage;
  export const verificationPage = VerificationPage;
  export const trialPage = TrialPage;
  export const loginpage = LoginPage;
  // Set whether emailVerification is enabled or not.
  export const emailVerification: boolean = true;
}
