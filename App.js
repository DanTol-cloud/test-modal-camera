import {SafeAreaView, View} from 'react-native';
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Modal,
    NativeBaseProvider,
    Pressable,
    Spacer,
    VStack
} from "native-base";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {CameraView, useCameraPermissions} from "expo-camera";
import BarcodeMask from "react-native-barcode-mask";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useState} from "react";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  return (
      <SafeAreaProvider>
        <NativeBaseProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Box
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
            >
              <Heading color={"white"}>Hello</Heading>

              <HStack space="4" justifyContent="center" alignItems="center">
                <Button
                    onPress={() => {
                      setShowModal(true);
                    }}
                >
                  Open Modal
                </Button>
              </HStack>
            </Box>
            <ModalMy setShowModal={setShowModal} showModal={showModal}>
              <CameraView
                  facing="back"
                  barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                  }}
                  style={{ width: "98%", height: "98%", marginTop: "4%" }}
              >
                <Box width="100%" height="100%" bgColor="black" opacity={0.7} />

                <BarcodeMask
                    width={250}
                    height={250}
                    showAnimatedLine={false}
                    edgeColor={"white"}
                />

                <Pressable>
                  <VStack height="100%">
                    {/* Top toolbar */}
                    {/* <HStack
            p={2}
            space={3}
            alignItems={"flex-start"}
            justifyContent={"flex-end"}
          >
            // Place For top toolbar Buttons
          </HStack> */}
                    <Spacer />
                    {/* Bottom toolbar */}
                    <HStack
                        p={2}
                        space={3}
                        alignItems="flex-end"
                        justifyContent="flex-end"
                    >
                      <IconButton
                          size="lg"
                          _icon={{
                            as: Ionicons,
                            name: "flash",
                            color: "yellow",
                          }}
                      />
                    </HStack>
                  </VStack>
                </Pressable>
              </CameraView>
            </ModalMy>
          </SafeAreaView>
        </NativeBaseProvider>
      </SafeAreaProvider>
  );
}

const ModalMy = ({ children, showModal, setShowModal }) => {
    return (
        <Modal p={5} isOpen={showModal} onClose={setShowModal} size={"full"}>
            <Modal.Content>
                <Modal.CloseButton onPress={() => setShowModal(false)} />
                <Modal.Header>Test Modal</Modal.Header>
                <Modal.Body height={"xs"}>{children}</Modal.Body>
            </Modal.Content>
        </Modal>
    );
};
