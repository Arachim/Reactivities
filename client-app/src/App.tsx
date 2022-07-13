import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get('https://localhost:5001/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);
  
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <ul>
  //         {activities.map( (a: any) => (
  //           <li key={a.id}>
  //             {a.title}
  //           </li>
  //         ))}
  //       </ul>
  //     </header>
  //   </div>
  // );
  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
        {activities.map( (a: any) => (
          <List.Item key={a.id}>
            {a.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
