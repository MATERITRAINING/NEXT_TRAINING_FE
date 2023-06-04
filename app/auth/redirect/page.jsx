
'use client'
import LoadingPage from '@/components/LoadingPage'

import { Spinner } from '@chakra-ui/react';
async function Redirect() {
   
  return (
    <div className="h-screen w-screen flex items-center justify-center">
  <Spinner/>
  </div>
  )
}

export default Redirect