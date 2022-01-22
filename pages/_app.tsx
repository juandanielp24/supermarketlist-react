import React from "react";
import {ChakraProvider, Box, Container, VStack, Heading, Text} from "@chakra-ui/react";
import type {AppProps} from "next/app";

import theme from "../theme";

function App({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Container
          backgroundColor="white"
          borderRadius="sm"
          boxShadow="md"
          maxWidth="container.sm"
          padding={4}
        >
          <VStack>
            <Heading>Supermarket list</Heading>
          </VStack>
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
