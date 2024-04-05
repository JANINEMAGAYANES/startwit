import React from 'react';
import Map from '../components/Map';
import { Box, Button, Center, Flex, IconButton } from '@chakra-ui/react';
import { AddIcon, WarningIcon } from '@chakra-ui/icons';

const Home = () => {
  return (

    <Flex height={'100vh'} dir='column'>
      <Box flex={1}>
        <Center pos='absolute' bottom={0} zIndex={1} width={'100%'} padding={3}>
          <Button leftIcon={<WarningIcon />} >
            Add report
          </Button>
        </Center>

        <Map center={[51.505, -0.09]} zoom={13} markers={[
          { id: '1', position: [51.505, -0.09], popupConfig: { description: 'Car crash' } }
        ]} onPickMarker={console.log} />

      </Box>
    </Flex>
  );
};

export default Home;