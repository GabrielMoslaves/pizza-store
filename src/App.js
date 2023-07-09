import "./App.css";
import Home from "./Pages/Home/Home";
import { OpenModalContextProvider } from "./context/openModal";
import { SelectorContextProvider } from "./context/selector";

function App() {
  return (
    <SelectorContextProvider>
      <OpenModalContextProvider >
        <div className="App">
          <Home />
        </div>
      </OpenModalContextProvider>
    </SelectorContextProvider>
  );
}

export default App;
