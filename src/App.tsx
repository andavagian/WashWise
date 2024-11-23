import React from 'react';
import Container from "@mui/material/Container";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theming";
import Header from "./components/Header";
import UserInputs from "./components/UserInputs";
import {UserInputProvider} from "./components/ContextProvider";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <UserInputProvider>
        <Container>
          <Header/>
          <UserInputs />
        </Container>
      </UserInputProvider>
    </ThemeProvider>
  );
}

export default App;
