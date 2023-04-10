import { Box, Text, VStack } from '@chakra-ui/react'
// import Image from './image'
import UserImage from './image'
//translate
import { useTranslation } from '../../../../../Translate/i18n';

function Sidebar() {
  //Translate 
  const {t} = useTranslation();
  return (
    <Box
      as="aside"
      flex={1}
      mr={{ base: 0, md: 5 }}
      mb={{ base: 5, md: 0 }}
      rounded="md"
      borderWidth={1}
      style={{ transform: 'translateY(-100px)' }}
    >
      {/*calling image component*/}
      <UserImage/>

      {/*About me section in vertical stack*/}
      <VStack as="ul" spacing={0} listStyleType="none">

        <Box
          key="1"
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1} 
        >

          <Text fontWeight="bold">{t("designation")}</Text>
          <Text >Developer</Text>

        </Box>

      </VStack>
    </Box>
  )
}

export default Sidebar
