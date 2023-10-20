import { createContext, useReducer } from "react"


const dataContext = createContext();
const settingContext = createContext();

export default function DataProvider({ children }) {


    const [userdata, dispatch] = useReducer(userdataReducer, initialUserdata);

    return (
        <dataContext.Provider value={userdata}>
            {children}
        </dataContext.Provider>
    )
}

function userdataReducer(userdata, action) {
    switch (action.type) {
        case 'add':
            
    }
}
function initialUserdata() {
    return [
        {}
    ]
}