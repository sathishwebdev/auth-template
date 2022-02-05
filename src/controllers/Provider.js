import React from 'react'
import {AuthProvider, authContext} from './auth';
    
            
function Provider({ children }) {
  const auth = AuthProvider();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider> );
  
}
        
    


export default Provider;