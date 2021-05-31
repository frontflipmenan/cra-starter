import firebase from "firebase";
import AuthService from "../services/auth";

const mockFunction = jest.fn().mockImplementation();
jest.mock("firebase", () => {
  return {
    auth: () => {
      return {
        signInWithEmailAndPassword: mockFunction,
        createUserWithEmailAndPassword: mockFunction,
        onAuthStateChange: mockFunction,
      };
    },
  };
});

//cleanup
afterAll(() => {
  mockFunction.mockClear();
});

describe("AuthService", () => {
  test("Should pass email and password to firebase sign", async () => {
    const email = "test@gmail.com";
    const password = "TEST1998!";
    await AuthService().login(email, password);
    expect(firebase.auth().signInWithEmailAndPassword).toBeCalledTimes(1);
    expect(firebase.auth().signInWithEmailAndPassword).toBeCalledWith(
      email,
      password
    );
  });
  test("Should pass email and password to firebase sign up", async () => {
    const email = "test@gmail.com";
    const password = "TEST1998!";
    await AuthService().signup(email, password);
    expect(firebase.auth().createUserWithEmailAndPassword).toBeCalledTimes(1);
    expect(firebase.auth().createUserWithEmailAndPassword).toBeCalledWith(
      email,
      password
    );
  });
  test("Should update login state to logged off when no user passed in", async () => {
    let isLoggedIn: boolean = true;
    const authStateChangeCallback = (value: boolean) => (isLoggedIn = value);
    await AuthService().onAuthStateChanged(null, authStateChangeCallback);
    expect(isLoggedIn).toBe(false);
  });
  test("Should update login state to logged in when user passed in", async () => {
    let isLoggedIn: boolean = false;
    const authStateChangeCallback = (value: boolean) => (isLoggedIn = value);
    const fakeFBUser: firebase.User = {};
    await AuthService().onAuthStateChanged(fakeFBUser, authStateChangeCallback);
    expect(isLoggedIn).toBe(true);
  });
});
