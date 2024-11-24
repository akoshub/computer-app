import React, {useState, useEffect} from "react";

const App = () => {
  const[computers, setComputers] = useState([]);
  const[filteredComputers, setFilteredComputers] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/computers")
    .then((response)=> response.json())
    .then((data) => {
      setComputers(data)
      setFilteredComputers(data)
    })
    .catch((error) => {
      console.log(error, "fetch hiba!");
    })
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value)
    const filter = filterComputers(computers, value);
    setFilteredComputers(filter);
  }

  return(
    <div className="container">
      <h1>szamítógépek</h1>
      <input type="text" className="form-control mb-4" placeholder="Keresés..." value={searchTerm} onChange={handleSearch}></input>
      <div className="row">
        {
          filteredComputers.map((computer) => (
            <div key={computer.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">{computer.id}</h2>
                  <h3 className="card-subtitle mb-2">{computer.model}</h3>
                  <p className="card-text">{computer.specs}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

const filterComputers = (computers, search) =>{
  const lowerCaseSearch = search.toLowerCase();
  return computers.filter((computer)=>
    computer.name.toLowerCase().includes(lowerCaseSearch) || computer.model.toLowerCase().includes(lowerCaseSearch) || computer.specs.toLowerCase().includes(lowerCaseSearch)
  )
}

export default App;