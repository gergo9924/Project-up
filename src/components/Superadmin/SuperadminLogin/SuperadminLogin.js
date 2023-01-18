import React, { useContext } from 'react'
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { superadminLoginService } from '../../../services/superadmin-auth-service'
import { firebaseApp } from '../../../config'
import { AuthContext } from '../../AuthContext'
import { validateContextObject } from '@firebase/util'


function SuperadminLogin() {

    let [superadminEmail, setSuperadminEmail] = React.useState("")
    let [superadminUsername, setSuperadminUsername] = React.useState("")
    
    let context = useContext(AuthContext)
    console.log(context.userData)
    return (
        <>
        <strong>login oldal</strong>
        <div>
            <input type="text" placeholder='username' onChange={(e)=> setSuperadminUsername(e.target.value)}/>
            <input type="text" placeholder='e-mail' onChange={(e) => setSuperadminEmail(e.target.value)}/>
            <button onClick={() =>superadminLogin()}>login</button>
            <button onClick={() =>logout()}>Logout</button>
        </div>
        </>
    )

    function superadminLogin(){
        superadminLoginService(superadminEmail,superadminUsername)
    }
    
    function logout(){
        const auth = getAuth(firebaseApp);
        signOut(auth).then(() => {
            context.setUserData(null)
        }).catch((error) => {
        // An error happened.
        });
    }

}

export default SuperadminLogin
