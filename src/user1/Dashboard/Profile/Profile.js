import { ChakraProvider } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'

export default function Profile() {

 
  return (
      //it has a default theme 
      <ChakraProvider >
        {/*Holding data in container*/}
        <Container  display={{ md: 'flex' }} style={{ marginTop: "220px" }} maxW="container.xl">
          <Sidebar  />
          <Content  />
        </Container>
      </ChakraProvider>
      
  )
}
