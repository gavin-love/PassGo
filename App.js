import { createStackNavigator } from 'react-navigation';
import Landing from './components/Landing';
import SignUp from './components/SignUp';

const App = createStackNavigator({
  Home: { screen: Landing },
  SignUp: { screen: SignUp }
})

export default App;
