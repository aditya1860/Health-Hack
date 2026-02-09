import AsyncStorage from '@react-native-async-storage/async-storage';


const USERS_KEY = 'USERS_DB';
const SESSION_KEY = 'CURRENT_USER';

// get all users
export const getUsers = async () => {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

// add new user
export const addUser = async (user: any) => {
  const users = await getUsers();
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// find user by phone + role
export const findUserByPhone = async (phone: string, role: string) => {
  const users = await getUsers();
  return users.find(
    (u: any) => u.phone === phone && u.role === role
  );
};

// set logged in user
export const setSession = async (user: any) => {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

// get logged in user
export const getSession = async () => {
  try {
    const data = await AsyncStorage.getItem(SESSION_KEY);

    if (!data) return null;

    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to parse session:", error);
    return null;
  }
};

// logout (FIXED NAME)
export const logout = async () => {
  await AsyncStorage.removeItem(SESSION_KEY);
};
