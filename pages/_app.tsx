import * as React from "react";
import {ChakraProvider, Box, Container, VStack, Heading, Text} from "@chakra-ui/react";
import type {AppProps} from "next/app";
import Head from "next/head";

import theme from "../theme";

function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Supermarket List</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        <meta content="Juan Daniel Perez" name="author" />
        <meta content="Juan Daniel Perez" name="copyright" />
      </Head>
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
    </>
  );
}

export default App;
