import { createStackNavigator } from 'react-navigation';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import Coupon from './components/Coupon';

const App = createStackNavigator({
  Home: { screen: Landing },
  SignUp: { screen: SignUp },
  Coupon: { screen: Coupon }
})

export default App;
