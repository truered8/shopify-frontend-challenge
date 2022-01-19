import Pictures from "./components/js/Pictures";
import Header from "./components/js/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SearchContextProvider from "./contexts/SearchContext";

function App() {
  return (
    <SearchContextProvider>
      <div className="App bg-gradient-1">
        <Header />
        <Pictures />
      </div>
    </SearchContextProvider>
  );
}

export default App;
