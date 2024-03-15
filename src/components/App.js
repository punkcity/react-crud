import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Header from './Header';
import AddPerson from './AddPerson';
import PersonsList from './PersonsList';
import PersonDetail from './PersonDetail';

function App() {
  const LOCAL_STORAGE_KEY = "persons";
  // const initPersons = [];
  // const initPersons = [
  //   {
  //     id: uuidv4(),
  //     "name": "Tom Cruise",
  //     "email": "tom@cruise.com"
  //   },
  //   {
  //     id: uuidv4(),
  //     "name": "Brad Pitt",
  //     "email": "brad@pitt.com"
  //   },
  //   {
  //     id: uuidv4(),
  //     "name": "Angelina Jolie",
  //     "email": "angel@jolie.com"
  //   }
  // ]
  const [persons, setPersons] = React.useState([]);
  
  const addPersonHandler = (person) => {
    const temp = {...person, id: uuidv4()}; //Add UUID directly - using spread operator ==> {...person, id: uuidv4()}
    setPersons([...persons, temp]);
  }

  const removePersonHandler = (id) => {
    const updatedPersons = persons.filter((person) => person.id !== id);
    setPersons(updatedPersons);
  }

  //On Init, load the persons array from the local storage - TODO - NEEDS TO BE LOOKED INTO MORE!
  useEffect(() => {
    //Convert the string back to JSON
    const storedPersons = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //FIXME - There is SOME ISSUE...due to RE-Renders, values in storage are getting overwritten! LOOK MORE
    if(storedPersons) setPersons(storedPersons);
  }, []);

  //To handle event when Persons array changes (say, a new person is added)
  useEffect(() => {
    console.log("SAVING TO LOCAL STORAGE: ", persons);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persons));
  }, [persons]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<PersonsList persons={persons} removePersonById={removePersonHandler} />} />
          <Route path="/add" element={<AddPerson addPersonHandler={addPersonHandler} useNavigate/>} />
          <Route path="/persondetail/:id" element={<PersonDetail />} />
        </Routes>
        {/* <AddPerson addPersonHandler={addPersonHandler}/>
        <PersonsList persons={persons}  removePersonById={removePersonHandler}/> */}
      </Router>
    </>
  );
}

export default App;
