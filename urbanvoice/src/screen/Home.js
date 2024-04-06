import React, { useState } from 'react';
import Map from '../components/Map';
import { Box, Button, Card, Center, Container, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, HStack, Icon, IconButton, Input, Spacer, Stack, Tag, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { AddIcon, MinusIcon, WarningIcon } from '@chakra-ui/icons';
import Form from '../components/Form';
import useMarkers from '../hooks/useMarkers';
import { stringify } from 'json5';

const DrawerWrapper = ({ children, ...drawerProps }) =>
  <Drawer {...drawerProps}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader></DrawerHeader>
      <DrawerBody>
        {children}
      </DrawerBody>
    </DrawerContent>
  </Drawer>;

const FormDrawer = (props) => {
  const { isOpen, onClose } = props;
  return <DrawerWrapper placement={'bottom'} onClose={onClose} isOpen={isOpen} zIndex={1}>
    <Form />
  </DrawerWrapper>
}

const MarkerDrawer = ({ isOpen, onClose, marker }) => {
  const [newComment, setNewComment] = useState('');

  return <DrawerWrapper placement={'bottom'} onClose={onClose} isOpen={isOpen} zIndex={1} maxHeight={'50vh'}>
    {marker ?
      <Container maxW='container.md' px={3}>
        <Flex direction={'row'} width={'100%'} pb={2}>
          <VStack align={'start'} spacing={0}>
            <Heading size={'md'}>{marker.category}</Heading>
            <Text size={'xs'}>{marker.description}</Text>
          </VStack>
          <Spacer />
          <HStack justify={'center'}>
            <Tag>{marker.agrees}</Tag>
            <Button leftIcon={<AddIcon />} size={'xs'} colorScheme='cyan' variant={'outline'}>Agree</Button>
          </HStack>
        </Flex>
        <Divider />
        <Flex direction={'row'} width={'100%'} py={2}>
          <Input variant='outline' placeholder='Comment...' mr={1} size={'sm'} onChange={(e) => setNewComment(e.target.value)} />
          <IconButton icon={<AddIcon />} isRound size={'sm'} disabled={newComment.length === 0} />
        </Flex>
        {marker.comments.length > 0 ? <Text>{marker.comments.length} comments</Text> : <Text>No comments.</Text>}
        <VStack overflowY={'scroll'} dir='column' align={'stretch'} py={3} maxH={'40vh'}>
          {marker.comments.map((comment) =>
            <Box key={comment.id} maxW='sm' borderWidth='1px' borderRadius='lg' p={2}>
              <Text>{comment.comment}</Text>
            </Box>
          )}

        </VStack>
      </Container> : null}
  </DrawerWrapper>
}

const Home = () => {
  const formDisclosure = useDisclosure();
  const markerDisclosure = useDisclosure();
  const { markers } = useMarkers();
  const [pickedMarker, setPickedMarker] = useState(null);

  return (
    <>
      <Flex height={'100vh'} dir='column'>
        <Box flex={1}>
          <Center pos='absolute' bottom={0} zIndex={2} width={'100%'} padding={3}>
            <Button leftIcon={<WarningIcon />} onClick={formDisclosure.onOpen} >
              Add report
            </Button>
          </Center>

          <Map center={[51.505, -0.09]} zoom={13} markers={markers} onPickMarker={(markerId) => {
            const marker = markers.find((marker) => marker.id === markerId);
            if (marker) {
              setPickedMarker(marker);
              markerDisclosure.onOpen();
            }
          }} />
          <FormDrawer {...formDisclosure} />
          <MarkerDrawer {...markerDisclosure} marker={pickedMarker} />
        </Box>
      </Flex>
    </>
  );
};

export default Home;