// Mock authentication service

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  name: string;
}

// Mock user storage
const STORAGE_KEY = "job-app-assistant-users";

// Helper to get users from localStorage
const getUsers = (): Record<string, User> => {
  const usersJson = localStorage.getItem(STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : {};
};

// Helper to save users to localStorage
const saveUsers = (users: Record<string, User>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Helper to get current user from localStorage
const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem("current-user");
  return userJson ? JSON.parse(userJson) : null;
};

// Helper to save current user to localStorage
const saveCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem("current-user", JSON.stringify(user));
  } else {
    localStorage.removeItem("current-user");
  }
};

export const authService = {
  // Check if user is logged in
  isAuthenticated: (): boolean => {
    return getCurrentUser() !== null;
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return getCurrentUser();
  },

  // Login user
  login: async ({ email, password }: LoginCredentials): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getUsers();
    const user = Object.values(users).find((u) => u.email === email);

    if (!user) {
      throw new Error("User not found");
    }

    // In a real app, we would check the password hash
    // For this mock, we're just checking if the user exists

    saveCurrentUser(user);
    return user;
  },

  // Register new user
  signup: async ({
    email,
    password,
    name,
  }: SignupCredentials): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getUsers();

    // Check if user already exists
    if (Object.values(users).some((u) => u.email === email)) {
      throw new Error("User already exists");
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
    };

    // Save user
    users[newUser.id] = newUser;
    saveUsers(users);

    // Log user in
    saveCurrentUser(newUser);
    return newUser;
  },

  // Logout user
  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    saveCurrentUser(null);
  },
};
