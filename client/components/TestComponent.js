import { FirebaseWrapper } from '../../firebase/firebase';
import { firebaseConfig } from '../../firebase/config';

FirebaseWrapper.GetInstance().Initialize(firebaseConfig);
