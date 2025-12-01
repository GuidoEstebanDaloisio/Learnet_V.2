import { ChakraProvider } from "@chakra-ui/react";
import tema from "./theme/Tema";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <ChakraProvider theme={tema}>
      <Navbar />
      <Home />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
