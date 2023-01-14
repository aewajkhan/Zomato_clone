// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../Styles/App.css";
import Details from "./Details";
import Filter from "./Filter";
import Home from "./Home";
import Layout from "./Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout title='abc'>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            path="/restuarants/:restuarant_id"
            element={<Details />}
          ></Route>
          <Route path="/filter" element={<Filter title="Hello world" age="20"/>}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
