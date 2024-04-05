import React from 'react';
import Map from '../components/Map';
import { Box, Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { AddIcon, WarningIcon } from '@chakra-ui/icons';
import Form from '../components/Form';
import useMarkers from '../hooks/useMarkers';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { markers } = useMarkers();

  return (
    <>
      <Flex height={'100vh'} dir='column'>
        <Box flex={1}>
          <Center pos='absolute' bottom={0} zIndex={2} width={'100%'} padding={3}>
            <Button leftIcon={<WarningIcon />} onClick={onOpen} >
              Add report
            </Button>
          </Center>

          <Map center={[51.505, -0.09]} zoom={13} markers={markers} onPickMarker={console.log} />
          <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen} zIndex={1}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                <Form />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
    </>
  );
};

export default Home;