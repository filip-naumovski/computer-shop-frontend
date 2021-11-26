import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "redux/search/searchSlice";

const StyledField = styled(TextField)({
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  width: "30vw",
});

const SearchField = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearch({ input: input }));
  }, [input]);

  return (
    <StyledField
      key={1}
      onChange={(e) => setInput(e.target.value)}
      value={input}
      placeholder="Search for products..."
      variant="filled"
      size="small"
      hiddenLabel
      InputProps={{
        style: { color: "#0f0f0f" },
      }}
    />
  );
};

export default SearchField;
