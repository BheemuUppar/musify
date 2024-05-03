import {atom} from "recoil"

export const isAuthenticatedAtom : any  = atom<boolean>({
    key:"isAuthenticatedAtom",
    default:localStorage.getItem("token") ? true : false
})