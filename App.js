import './App.css';
import store from './Components/store';
import { Provider } from 'react-redux';
import Carddata from './Components/Carddata';
import Apexchart from './Apexchart';
//import Apexchart from './Apexchart';

function App() {
 
  return (
    <Provider store={store}>
 <div className="App">
   <Carddata/>
  <Apexchart/>
 </div>
   </Provider>
   

  );
}

export default App;