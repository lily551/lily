import { useState, useEffect, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import { TextField } from "@mui/material";
import debounce from "lodash.debounce";

const SearchBar = ({ internalDetails, onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fuse.js configuration
  const fuse = useMemo(() => {
    return new Fuse(internalDetails, {
      keys: ["internalFacultyName", "specialization"],
      threshold: 0.3, // Adjust for more/less strict matching
      includeScore: true,
    });
  }, [internalDetails]);

  // Debounced search function
  const handleSearch = useCallback(
    debounce((query) => {
      if (!query) {
        onSearchResult(internalDetails); // If empty, show all faculties
      } else {
        const results = fuse.search(query).map((result) => result.item);
        onSearchResult(results);
      }
    }, 300), // 300ms debounce time
    [fuse, onSearchResult]
  );

  useEffect(() => {
    handleSearch(searchTerm);
    return () => handleSearch.cancel(); // Cleanup debounce on unmount
  }, [searchTerm, handleSearch]);

  return (
    <TextField
      fullWidth
      label="Search by Name, Specialization..."
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
