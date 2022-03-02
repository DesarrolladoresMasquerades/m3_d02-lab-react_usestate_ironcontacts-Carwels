import logo from './logo.svg';
import './App.css';
import listContacts from "./contacts.json";
import { useState } from "react"


function App() {
  
  const contacts = listContacts.slice(0,5)
  const [famous, setFamous] = useState(contacts)

  function randomFamous() {
    let random = listContacts[Math.floor(Math.random() * listContacts.length)]
    let exists = false

    for(let i=0; i < famous.length; i++) {
      if(famous.includes(random)) {
      exists = true
      }
    }
    if(!exists) {
      setFamous(famous.concat([random]))
    }
  }

  const sortName = () => {
    const arrFamous = [...famous]
    const sortedFamous = arrFamous.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    setFamous(sortedFamous)
  }

  const sortPopularity = () => {
    const arrFamous = [...famous]
    const sortedPopularity = arrFamous.sort((a, b) => 
    b.popularity - a.popularity
    )
    setFamous(sortedPopularity)
  }

  const deleteFamous = (id) => {
    const deletedFamous = famous.filter(a => a.id !== id)
    setFamous(deletedFamous)
  }

  return (
    <div className="App">
    <button onClick={randomFamous}>Add Random Contact</button>
    <button onClick={sortPopularity}>Sort by popularity</button>
    <button onClick={sortName}>Sort by name</button>
     <table>
            <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
            </tr>
            </thead>
            <tbody>
      {famous.map(contact => {
      
        return(
            <tr key={contact.id}>
              <td><img src={contact.pictureUrl} alt="pictures" width="100px" height="100px"/></td>
             <td><h3>{contact.name}</h3></td>
             <td>{contact.popularity.toFixed(2)}</td>
             {contact.wonOscar &&<td>&#127942;</td>}
             {contact.wonEmmy &&<td>&#127942;</td>}

             <td><button className="delete-btn" onClick={() => deleteFamous(contact.id)}>Delete Famous</button></td>
            </tr>
        )
      })}
            </tbody>
    </table>
    </div>
  );
}

export default App;