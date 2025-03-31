import { useState } from "react";

export default function usePersistedState(initialState){
    const [state, setState] = useState(()=>{
        const persistedStateJson = localStorage.getItem('auth');
        if(!persistedStateJson){
            return initialState;
        }

        const persistedState = JSON.parse(persistedStateJson);

        return persistedState;
    });


    return [
        state,
        setState
    ]
};