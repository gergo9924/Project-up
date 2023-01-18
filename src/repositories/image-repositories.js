import { getStorage, ref, getDownloadURL} from "firebase/storage";
import { firebaseApp } from "../config";

export function loadLogo () {
    const storage = getStorage(firebaseApp)
    let storageRef = ref(storage, `dinR.png`);
    return getDownloadURL(storageRef).then(url => {
        return url
})
}