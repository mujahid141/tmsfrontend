import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteListPage from "./components/pages/NoteListPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NotePage from "./components/pages/NotePage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<NoteListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
