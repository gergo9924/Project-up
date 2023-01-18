import { logInSuperadmin } from "../repositories/superadmi-auth-repositories";

const DOMAIN = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/authentications`;
const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;
export function superadminLoginService(email, passwd) {
  logInSuperadmin(email, passwd);
}
export function loginService(email, passwd) {
  return logInSuperadmin(email, passwd);
}
export function createAuthentication(email, password, type, id) {
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      let uid = data.localId;
      if (uid) {
        return fetch(`${URL}/authentications/${uid}.json`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(type),
        })
          .then((res) => res.json())
          .then(() => uid);
      } else {
        window.alert(
          `Not valid e-mail/password. Or ${email} is already in use. Password must be at least 6 characters`
        );
        return;
      }
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
    });
}

export function loadUserRole(uid, setUserData, navigate) {
  let role;
  return fetch(`${DOMAIN}.json`)
    .then((res) => res.json())
    .then((authuids) => {
      Object.keys(authuids).map((authuid) => {
        if (authuid == uid) {
          return (role = authuids[uid]);
        }
      });
      return role;
    })
    .then((role) => fetch(`${URL}/${role}.json`))
    .then((res) => res.json())
    .then((users) => {
      if (users) {
        Object.keys(users).map((userUid) => {
          if (users[userUid].authUid == uid) {
            let user = {};
            user.uuid = userUid;
            user.details = users[userUid];

            return setUserData(user);
          }
        });
      }
      return;
    });
}
