import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ProfileList } from './components/profilelist/ProfileList'
import { ProfileView } from './components/profileview/ProfileView'
import './App.css';

const App = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ProfileList}/>
        <Route path='/profileentry/:number' component={ProfileView}/>
      </Switch>
    </BrowserRouter>
  </main>
)

export default App;
