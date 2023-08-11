import React, {useContext} from 'react'
import {UserContext} from './Context/UserContext';
function HomePage(){
    const user = useContext(UserContext);
    console.log(user);
    return null;
}
export default HomePage;
