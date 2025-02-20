import { Alert, Box, Center, CloseIcon, HStack, IconButton, Text, VStack, Spinner, Heading, Button, AlertDialog } from "native-base";
import { useRef, useState } from "react";


// Success Alert Component
export const Success = ({ title, message }) => (
  <Center justifyContent="center">
    <VStack space={5} maxW="400">
      <Alert w="100%" status="success" variant="left-accent">
        <HStack alignItems="center" space={2}>
          {/* <Alert.Icon size="md" /> */}
          <Text>{title}</Text>
          <Box flex={1} _text={{ textAlign: "center" }} ml={5} _dark={{ color: "coolGray.600" }}>
            {message}
          </Box>
        </HStack>
      </Alert>
    </VStack>
  </Center>
);

// Failed Alert Component
export const Failed = ({ title, message }) => (
  <Center justifyContent="center">
    <VStack space={5}>
      <Alert w="100%" status="error" variant="left-accent">
        <HStack alignItems="center" space={2}>
          {/* <Alert.Icon size="md" /> */}
          <Text>{title}</Text>
          <Box flex={1} _text={{ textAlign: "center" }} ml={5} _dark={{ color: "coolGray.600" }}>
            {message}
          </Box>
        </HStack>
      </Alert>
    </VStack>
  </Center>
);





export const Delete = ({ onDelete, opendelete, onClose }) => {
  const cancelRef = useRef(null);

  return (
      <Center>
          <AlertDialog
              leastDestructiveRef={cancelRef}
              isOpen={opendelete}
              onClose={onClose}
          >
              <AlertDialog.Content>
                  <AlertDialog.CloseButton />
                  <AlertDialog.Header>Delete Item</AlertDialog.Header>
                  <AlertDialog.Body>
                      This will remove all data relating to this food item. This action cannot be reversed. Deleted data cannot be recovered.
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                      <Button.Group space={2}>
                          <Button
                              variant="unstyled"
                              colorScheme="coolGray"
                              onPress={onClose}
                              ref={cancelRef}
                          >
                              Cancel
                          </Button>
                          <Button
                              colorScheme="danger"
                              onPress={() => {
                                  onDelete();  // Call the delete function passed as a prop
                                  onClose();  // Close the dialog
                              }}
                          >
                              Delete
                          </Button>
                      </Button.Group>
                  </AlertDialog.Footer>
              </AlertDialog.Content>
          </AlertDialog>
      </Center>
  );
};

