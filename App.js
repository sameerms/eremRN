import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
import Logo from './app/components/Logo';
import Form from './app/components/Form';


// Enter your Facebooko app ID here.
const FACEBOOK_APP_ID = '530862680643392';

// Enter your Firebase app web configuration settings here.
const config = {
  apiKey: "AIzaSyD3fu1Ri9R2zC3Vr5L9MeemjzWLF0GT7ew",
  authDomain: "erem-app.firebaseapp.com",
  databaseURL: "https://erem-app.firebaseio.com",
  projectId: "erem-app",
  storageBucket: "erem-app.appspot.com",
  messagingSenderId: "564138836875"
};

firebase.initializeApp(config);

const auth = firebase.auth();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logInStatus: 'signed out',
      errorMessage: 'none'
    };
  }

  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user != null) {
        this.setState({ logInStatus: 'We are authenticated now!' });
      } else {
        this.setState({ logInStatus: 'You are currently logged out.' });
      }
    });
  }

  async handleFacebookButton() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
      permissions: ['public_profile', 'email']
    });
    if (type === 'success') {
      //Firebase credential is created with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      auth.signInAndRetrieveDataWithCredential(credential).catch(error => {
        this.setState({ errorMessage: error.message });
      });
    }
  }s

  render() {
    return (
      <View style={styles.container}>
      <Logo />
        <TouchableHighlight
          style={styles.facebookButton}
          name="Facebook"
          underlayColor={styles.facebookButton.backgroundColor}
          onPress={() => this.handleFacebookButton()}
        >
          <Text style={styles.facebookButtonText}>Log in with Facebook</Text>
        </TouchableHighlight>
        <View style={styles.space} />
        <Text> ELLER </Text>
        <Form/>
        <View style={styles.space} />
        <Text>Logged In Status: {this.state.logInStatus}</Text>
        <View style={styles.space} />
        <Text> Log In Error Messages: {this.state.errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  facebookButton: {
    width: 375 * 0.75,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998'
  },
  facebookButtonText: {
    color: '#fff'
  },
  space: {
    height: 17
  }
});