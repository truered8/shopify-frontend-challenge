import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import FormControl from "react-bootstrap/FormControl";

import { SearchContext } from "../../contexts/SearchContext";

import "../css/Header.css";

const Header = () => {
  const { query, setQuery } = useContext(SearchContext);

  const isMobile = window.screen.width < 768;

  return (
    <Navbar
      collapseOnSelect
      id="header"
      variant="light"
      expand="lg"
      sticky="top"
      className="pt-sm-4 mb-sm-3 m-0 bg-gradient-1"
    >
      <FormControl
        id="search-bar"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search Spacestagram..."
        className={`mx-auto mx-sm-4 ${
          isMobile && "mb-sm-5"
        } not-rounded border-white shadow`}
      />
    </Navbar>
  );
};

export default Header;
