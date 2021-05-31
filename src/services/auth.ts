import firebase from "firebase";

//interfaces
interface Auth {
  login(email: string, password: string): void;
  signup(email: string, password: string): void;
  logout(): void;
  onAuthStateChanged(
    user: firebase.User | null,
    setUserAuthState: (newLoginState: boolean) => void
  ): void;
}

const AuthService = (): Auth => {
  //functions
  const login = async (email: string, password: string) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const onAuthStateChanged = async (
    user: firebase.User | null,
    setUserAuthState: (newLoginState: boolean) => void
  ) => {
    if (user) {
      setUserAuthState(true);
    } else {
      setUserAuthState(false);
    }
  };

  return {
    login,
    signup,
    onAuthStateChanged,
    logout,
  };
};

export default AuthService;
