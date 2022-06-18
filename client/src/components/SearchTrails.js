import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SearchTrails() {
  const [searchCriteria, setSearchCriteria] = useState("");
  let navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCriteria.trim()) {
      navigate(`/trails/search/${searchCriteria}`);
      setSearchCriteria("");
    } else {
      navigate("/trails/search");
    }
  };
  return (
    <div>
      <Form
        className="search-box d-flex mx-auto mb-3 mt-3"
        onSubmit={handleSearch}
        style={{ position: "blocked" }}
      >
        <FormControl
          as="input"
          placeholder="Search Trails"
          size="sm"
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
        />
        <Button
          aria-label="searchButton"
          type="submit"
          size="sm"
          variant="success"
        >
          Search
        </Button>
      </Form>
    </div>
  );
}
