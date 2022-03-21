import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Login } from './pages/Login';
import { Main } from './pages/Main';

export const Routes = createAppContainer(
  createStackNavigator(
    {
      Login: {
        screen: Login,
      },
      Main: {
        screen: Main,
      }
    },
    {
      defaultNavigationOptions: {
        headerShown: false,
      },
    }
  )
);