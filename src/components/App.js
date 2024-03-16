import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
import './App.css';
import api from '../api/persons';
import Header from './Header';
import AddPerson from './AddPerson';
import PersonsList from './PersonsList';
import PersonDetail from './PersonDetail';
import EditPerson from './EditPerson';

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

  //Fetch ALL persons
  const getPersons = async () => {
    const response = await api.get();
    return response.data;
  }

  const [persons, setPersons] = React.useState([]);
  // const navigate = useNavigate();
  
  const addPersonHandler = async (person) => {
    // const temp = {...person, id: uuidv4()}; //Add UUID directly - using spread operator
    const response = await api.post("/", person); //Dont add ID. Server will add it.
    setPersons([...persons, response.data]);
  }

  const editPersonHandler = async (person) => {
    console.log("SAVING PERSON ON API: ", person);
    const response = await api.put(`/${person._id}`, person);
    //And now update the state on the UI
    if(response.status === 200 && response.data) {
      // const updateUIState = (response.data) => {
        const updatedPersons = persons.map((p) => {
          return p._id === person._id ? response.data : p
        });
        setPersons(updatedPersons);
        // navigate("/");
      // }
      // const updatedPersons = persons.map((p) => {
      //   return p._id === person._id ? response.data : p
      // });
      // const f = (updatedPersons) => setPersons(updatedPersons);
      // f();
      //setPersons(updatedPersons);
    }
    // const response = await api.delete(`/${id}`);
    // if(response.status === 200 && response.data) {
    //   //Expected response => {"acknowledged": true, "deletedCount": 1}
    //   if(response.data.deletedCount === 1) {
    //     //Confirms that the person Successfully deleted. Fetch an Updated list - Again, from the server
    //     // const updatedPersons = persons.filter((person) => person.id !== id);
    //     // MUST BE CALLED LIKE THIS - Else the UI doesnt get updated!
    //     const getPersonsFromAPI = async () => {
    //       const updatedPersons = await getPersons();
    //       if(updatedPersons) setPersons(updatedPersons);
    //     }
    //     getPersonsFromAPI();
    //   } else {
    //     alert("Could not delete the person. Please try again later!");
    //   }
    // }else{
    //   alert("Could not delete the person. Please try again later!");
    // }
  }

  const removePersonHandler = async (id) => {
    const response = await api.delete(`/${id}`);
    if(response.status === 200 && response.data) {
      //Expected response => {"acknowledged": true, "deletedCount": 1}
      if(response.data.deletedCount === 1) {
        //Confirms that the person Successfully deleted. Fetch an Updated list - Again, from the server
        // const updatedPersons = persons.filter((person) => person.id !== id);
        // MUST BE CALLED LIKE THIS - Else the UI doesnt get updated!
        const getPersonsFromAPI = async () => {
          const updatedPersons = await getPersons();
          if(updatedPersons) setPersons(updatedPersons);
        }
        getPersonsFromAPI();
      } else {
        alert("Could not delete the person. Please try again later!");
      }
    }else{
      alert("Could not delete the person. Please try again later!");
    }
  }


  //On Init, load the persons array from the local storage - TODO - NEEDS TO BE LOOKED INTO MORE!
  useEffect(() => {
    //FIXME - There is SOME ISSUE...due to RE-Renders, values get overwritten!     
    //const storedPersons = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); //Convert the string back to JSON
    //if(storedPersons) setPersons(storedPersons);
    const getPersonsFromAPI = async () => {
      const allPersons = await getPersons();
      if(allPersons) setPersons(allPersons);
    }
    getPersonsFromAPI();
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
          <Route path="/add" element={<AddPerson addPersonHandler={addPersonHandler} />} />
          <Route path="/persondetail/:id" element={<PersonDetail />} />
          <Route path="/personedit/:id" element={<EditPerson editPersonHandler={editPersonHandler}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
