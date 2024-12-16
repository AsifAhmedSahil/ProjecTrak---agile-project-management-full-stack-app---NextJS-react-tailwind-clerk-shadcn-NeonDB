// components/ClerkClientProvider.js

'use client'; // This is necessary to indicate that this is a client component

import { ClerkProvider } from '@clerk/nextjs';
import { shadesOfPurple } from '@clerk/themes';
// import { useEffect, useState } from 'react';

const ClerkClientProvider = ({ children }) => {
    // const[isLoaded,setIsLoaded]  =useState(false)

    // useEffect(()=>{
    //     setIsLoaded(true)
    // },[])

    // if(!isLoaded){
    //     return (
    //         <div className='flex flex-col items-center jusc'>
    //             Loading...
    //         </div>
    //     )
    // }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#1a202c",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
        },
        elements: {
          formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
          card: "bg-gray-800",
          headerTitle: "text-blue-400",
          headerSubtitle: "text-gray-400",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkClientProvider;
