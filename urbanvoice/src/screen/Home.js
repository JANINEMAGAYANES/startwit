import React, { useState } from 'react';
import Map from '../components/Map';
import { Box, Button, Center, Container, Divider, Image, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, HStack, Icon, IconButton, Input, Spacer, Stack, Tag, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { AddIcon, WarningIcon } from '@chakra-ui/icons';
import Form from '../components/Form';
import useMarkers from '../hooks/useMarkers';
import useNotifications from '../hooks/useNotifications';
import { MapContainer, Marker, TileLayer, SVGOverlay } from 'react-leaflet';
import L from 'leaflet';

const DrawerWrapper = ({ children, header, ...drawerProps }) =>
  <Drawer {...drawerProps}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader textAlign={'center'}>{header ?? null}</DrawerHeader>
      <DrawerBody>
        {children}
      </DrawerBody>
    </DrawerContent>
  </Drawer>;

const FormDrawer = ({location, ...props}) => {
  const { isOpen, onClose } = props;
  return <DrawerWrapper placement={'bottom'} onClose={onClose} isOpen={isOpen} zIndex={1}>
    <Form location={location} onClose={onClose} />
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
            <Image
                            src={marker.imageUrl ?marker.imageUrl : 'https://t4.ftcdn.net/jpg/01/07/57/91/360_F_107579101_QVlTG43Fwg9Q6ggwF436MPIBTVpaKKtb.jpg'}
                            alt='Image Icon'
                            boxSize='100px'
                        
                          />
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

const issueIcon = L.divIcon({
  html: '<span style="font-size: 3em; color: Tomato;"><i class="fa-solid fa-location-dot fa-xl"></i></span>',
  iconSize: [20, 20],
  className: ''
});

const StaticMap = ({ position }) => {


  return <MapContainer style={{ height: '100%' }} center={[51.505, -0.09]} zoom={13} zoomControl={false} scrollWheelZoom={false} attributionControl={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position} icon={issueIcon} />

  </MapContainer>
}

const NotificationsDrawer = (props) => {
  const { isOpen, onClose } = props;
  const { notifications } = useNotifications();
  return <DrawerWrapper placement={'bottom'} onClose={onClose} isOpen={isOpen} zIndex={1} size='full' header={<Text>Notifications</Text>}>
    <Container maxW={'container.md'} width={'100%'}>
      <VStack overflowY={'scroll'} dir='column' align={'stretch'} py={3} width={'100%'}>
        {notifications.map((notif) =>
          <Box key={notif.id} borderWidth='1px' borderRadius='lg' p={2}>
            <Text>{notif.category}</Text>
            <Box width={'100%'} height={'10rem'} py={3}>
              <StaticMap position={{ lat: notif.centroid_latitude, lng: notif.centroid_longitude }} />
            </Box>
          </Box>
        )}
      </VStack>
    </Container>
  </DrawerWrapper>
}


const Home = () => {
  const formDisclosure = useDisclosure();
  const markerDisclosure = useDisclosure();
  const notificationsDisclosure = useDisclosure();
  const { markers } = useMarkers();
  const [pickedMarker, setPickedMarker] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);

  return (
    <>
      <Flex height={'100vh'} dir='column'>
        <Box flex={1}>
          <Center pos='absolute' bottom={0} zIndex={2} width={'100%'} padding={3}>
            <Button leftIcon={<WarningIcon />} onClick={formDisclosure.onOpen}>
              Add report
            </Button>
          </Center>

          <Map center={[51.505, -0.09]} zoom={13} markers={markers} onPickMarker={(markerId) => {
            const marker = markers.find((marker) => marker.id === markerId);
            if (marker) {
              setPickedMarker(marker);
              markerDisclosure.onOpen();
            }
          }} onChangeLocation={setTargetLocation} />
          <FormDrawer location={targetLocation} {...formDisclosure} />
          <MarkerDrawer {...markerDisclosure} marker={pickedMarker} />
          <NotificationsDrawer {...notificationsDisclosure} />
          <div className={'leaflet-top leaflet-left'}>
            <IconButton className="leaflet-control leaflet-bar" icon={<i className="fa-solid fa-bell"></i>} onClick={notificationsDisclosure.onOpen} />
          </div>
        </Box>
      </Flex>
    </>
  );
};

export default Home;