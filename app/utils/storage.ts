import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "USERS_DB";
const SESSION_KEY = "CURRENT_USER";

/* ---------------- GET ALL USERS ---------------- */
export const getUsers = async () => {
  try {
    const data = await AsyncStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};

/* ---------------- ADD USER ---------------- */
export const addUser = async (user: any) => {
  const users = await getUsers();
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

/* ---------------- FIND USER ---------------- */
export const findUserByPhone = async (
  phone: string,
  role: string
) => {
  const users = await getUsers();
  return users.find(
    (u: any) => u.phone === phone && u.role === role
  );
};

/* ---------------- SET SESSION ---------------- */
export const setSession = async (user: any) => {
  await AsyncStorage.setItem(
    SESSION_KEY,
    JSON.stringify(user)
  );
};

/* ---------------- GET SESSION ---------------- */
export const getSession = async () => {
  try {
    const data = await AsyncStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to parse session:", error);
    return null;
  }
};

/* ---------------- UPDATE SESSION ---------------- */
export const updateSession = async (
  updatedData: any
) => {
  const current = await getSession();

  if (!current) return;

  const merged = { ...current, ...updatedData };

  await AsyncStorage.setItem(
    SESSION_KEY,
    JSON.stringify(merged)
  );
};

/* ---------------- LOGOUT ---------------- */
export const logout = async () => {
  await AsyncStorage.removeItem(SESSION_KEY);
};
