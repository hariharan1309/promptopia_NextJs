'use client';
// as we are using browser capabilities
import {SessionProvider} from 'next-auth/react';

const Provider = ({children,session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
    // The provider will go to the redux toolkit through layout that will make it go through all components
  )
}
export default Provider;