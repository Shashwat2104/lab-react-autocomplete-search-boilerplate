import  { useState } from "react";
import data from "./resources/countryData.json";
function App() {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const onChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setValue(searchTerm);
    setShowDropdown(searchTerm !== "");
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setShowDropdown(false);
  };

  const handleKey = (e) => {
    if (e.key === "Escape") {
      setShowDropdown(false);
      setValue("");
    } else {
      setShowDropdown(true);
    }
  };

  const filteredData = data.filter((item) => {
    const searchTerm = value.toLowerCase();
    const fullName = item.name.toLowerCase();
    return searchTerm && fullName.startsWith(searchTerm);
  });
  return (
    <div className="App">
      <h1>Search</h1>

      <div>
        <div>
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={handleKey}
          />
          <button onClick={() => onSearch(value)}>Search</button>
        </div>
        {showDropdown && (
          <div id="dropdown">
            {filteredData.slice(0, 10).map((item) => (
              <div onClick={() => onSearch(item.name)} key={item.name}>
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
