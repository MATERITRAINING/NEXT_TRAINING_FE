'use client'
import { Box, Center, Container, Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const Page = () => {
  return (
    <Flex h="100%" flexDir={"row"} alignItems={'center'} justifyContent={'center'} overflow={"hidden"} w={"100%"}>
      <Heading color={'red'}>Anda Tidak Memiliki Acces ke Halaman ini</Heading>
    </Flex>
  )
}

export default Page