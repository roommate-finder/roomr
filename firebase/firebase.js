import * as firebase from 'firebase';
import 'firebase/firestore';

//anytime we want to work with firebase we can use an instance of this
export class FirebaseWrapper {
  constructor() {
    this.initialized = false;
    this._firebaseInstance = null;
    this._firebaseWrapperInstance = null;
    this._firestore = null;
  }

  Initialize(config) {
    if (!this.initialized) {
      this._firebaseInstance = firebase.initializeApp(config);
      this._firestore = firebase.firestore();
      this.initialized = true;
      console.log('it worked :D');
    } else {
      console.log('already initialized');
    }
  }

  static GetInstance() {
    //static method --> can directly call this method without having to instantiate our class first
    if (null == this._firebaseWrapperInstance) {
      this._firebaseWrapperInstance = new FirebaseWrapper();
    }
    return this._firebaseWrapperInstance;
  }
}
