import { getAuth, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";
import { firebaseApp } from "../config";

const auth = getAuth(firebaseApp);

export function logInSuperadmin(email, passwd) {
  
  return signInWithEmailAndPassword(auth, email, passwd)
    .then((userData) => {
      console.log(userData.user.uid);
      return userData.user.uid
    })
    .catch((err) => console.error(err));
}

export function logout() {

  const auth = getAuth(firebaseApp);
  return signOut(auth)

    .then(() => {
      console.log("sikeres kijelentkezés")
      return
    })
    .catch((error) => {
      // An error happened.
    });
}

export function changeEmailAndPassword(data, newEmail, newPassword){
  const auth = getAuth();
  return updateEmail(auth.currentUser, newEmail).then(() => {
    data.e_mail = newEmail
    console.log("sikeres e-mail változtatás")
  }).catch((error) => {
    console.error(error)
  })
  .then(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    data.password = newPassword
    return updatePassword(user, newPassword).then(() => {
      console.log("sikeres jelszó módosítás")
    }).catch((error) => {
      console.error(error)
    });
  })
}

export function changeEmail(data, newEmail){
  const auth = getAuth();
  return updateEmail(auth.currentUser, newEmail).then(() => {
    data.e_mail = newEmail
    console.log("sikeres e-mail változtatás")
  }).catch((error) => {
    console.error(error)
  })
}

export function changePassword(data, newPassword){
  const auth = getAuth();
  const user = auth.currentUser;
  data.password = newPassword
  return updatePassword(user, newPassword).then(() => {
    console.log("sikeres jelszó módosítás")
  }).catch((error) => {
    console.error(error)
  });
}
