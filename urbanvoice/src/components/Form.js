import { useState,useContext, } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Stack,
  Textarea,
  Image,
  Tooltip,
  Modal,
  useClipboard,
  useColorModeValue,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
} from '@chakra-ui/react';
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from 'react-icons/bs';
import Camera from './Camera';
import RecordButton from './RecordButton';
import { ImageContext } from '../App'; 

const confetti = {
  light: {
    primary: '4299E1', // blue.400
    secondary: 'BEE3F8', // blue.100
  },

  dark: {
    primary: '1A365D', // blue.900
    secondary: '2A4365', // blue.800
  },
};

const CONFETTI_LIGHT = ''
const CONFETTI_DARK = ''

export default function ContactFormWithSocialButtons() {
  const { hasCopied, onCopy } = useClipboard('example@example.com');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(localStorage.getItem('image') || '');
  const { imageSrc } = useContext(ImageContext);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        localStorage.setItem('image', dataUrl);
        setImageUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    localStorage.removeItem('image');
    setImageUrl('');
  };

  const handleCameraClick = () => {
    setIsCameraOpen(true);
  };

  const handleRecordClick = () => {
    setIsRecordOpen(true);
  };

  const handleCameraClose = () => {
    setIsCameraOpen(false);
  };

  const handleCapture = (imageData) => {
    // Handle captured image data here
    console.log('Captured image data:', imageData);
  };


  return (
    <Flex
      bg={useColorModeValue('gray.100', 'gray.900')}
      align='center'
      justify='center'
      css={{
        backgroundImage: useColorModeValue(CONFETTI_LIGHT, CONFETTI_DARK),
        backgroundAttachment: 'fixed',
      }}
      id='contact'
    >
      <Box
        borderRadius='lg'
        m={{ base: 5, md: 16, lg: 10 }}
        p={{ base: 5, lg: 16 }}
      >
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading
              fontSize={{
                base: '4xl',
                md: '5xl',
              }}
            >
              Report an Incident
            </Heading>

            <Stack
              spacing={{ base: 4, md: 8, lg: 20 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Box
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius='lg'
                p={8}
                color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                shadow='base'
              >
                <VStack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>Image</FormLabel>
                    <InputGroup>
                      <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        width='100%'
                        height='100%'
                        onChange={handleImageChange}
                      >
                        {/* Replace 'image-url' with the URL of your image */}
                        <Image
                          src={imageSrc ? imageSrc : 'https://t4.ftcdn.net/jpg/01/07/57/91/360_F_107579101_QVlTG43Fwg9Q6ggwF436MPIBTVpaKKtb.jpg'}
                          alt='Image Icon'
                          boxSize='100px'
                          onClick={handleCameraClick}
                        />
                        <Modal
                          isOpen={isCameraOpen}
                          onClose={handleCameraClose}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalCloseButton />
                            <ModalBody>
                              {/* Replace this with your camera component */}
                              <Camera onCapture={handleCapture} />
                            </ModalBody>
                          </ModalContent>
                        </Modal>
                        <Box>
  
      <br />
      {imageUrl && (
        <Box>
          <Image src="https://c8.alamy.com/comp/BHNY24/road-accident-involving-a-car-and-a-motorcycle-with-police-in-attendance-BHNY24.jpg" alt="Uploaded" maxW="100%" />
          <br />
          <Button onClick={handleClearImage}>Clear Image</Button>
        </Box>
      )}
    </Box>
                      </Box>{' '}
                    </InputGroup>
                    <FormLabel>Record Audio Description</FormLabel>
                    <InputGroup>
                      <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        width='100%'
                        height='100%'
                      >
                        {/* Replace 'image-url' with the URL of your image */}
                        <Image
                          src='https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg'
                          alt='Image Icon'
                          boxSize='100px'
                          onClick={handleRecordClick}
                        />
                        <RecordButton/>
                      </Box>{' '}
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Location</FormLabel>

                    <InputGroup>
                      <InputLeftElement></InputLeftElement>
                      <Input
                        type='email'
                        name='email'
                        placeholder='U2 Stadtmitte'
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Type of Incident</FormLabel>

                    <Textarea
                      name='message'
                      placeholder='Your Message'
                      rows={1}
                      resize='none'
                    />
                  </FormControl>

                  <Button
                    colorScheme='blue'
                    bg='blue.400'
                    color='white'
                    _hover={{
                      bg: 'blue.500',
                    }}
                    width='full'
                  >
                    Send Message
                  </Button>
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
