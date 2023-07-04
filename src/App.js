import "./App.css";
import Home from "./Pages/Home/Home";
import { SelectorContextProvider } from "./context/selector";

function App() {
  return (
    <SelectorContextProvider>
      <div className="App">
        <Home />
      </div>
    </SelectorContextProvider>
  );
}

export default App;
