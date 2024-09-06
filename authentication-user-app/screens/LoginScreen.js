import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { authenticate } from '../util/auth';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);

    try {
      const token = await authenticate(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging you in...' />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
