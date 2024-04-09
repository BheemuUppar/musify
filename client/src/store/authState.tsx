import {atom} from "recoil"

export const isAuthenticatedAtom : any  = atom({
    key:"isAuthenticatedAtom",
    default:localStorage.getItem("token") ? true : false
})