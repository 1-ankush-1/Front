import { Box, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import AccountSettings from './AccountSettings'

const Content = () => {

  return (
    <Box
      flex={4}
      d="flex"
      flexDir="column"
      justifyContent="space-between"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      style={{ transform: 'translateY(-100px)' }}
    >
      {/*using tab to apply tab style*/}
      <Tabs>
        <TabPanels px={3} mt={5}>
          <TabPanel>
            <AccountSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
      
    </Box>
  )
}

export default Content
