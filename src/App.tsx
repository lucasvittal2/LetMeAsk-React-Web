
import { NewRoom } from './pages/NewRoom';
import { Route, BrowserRouter } from 'react-router-dom'
import { Home } from './pages/home';
import {AuthContextProvider} from './contexts/AuthContext';

function App() {

  return (
    <BrowserRouter>
     <AuthContextProvider>
        <Route path="/" component={Home} exact/>
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
