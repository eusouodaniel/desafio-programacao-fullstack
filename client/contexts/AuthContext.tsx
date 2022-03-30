import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies' 

import Router from 'next/router'

import { api } from "../services/apiClient";

type User = {
  email: string;
  roles: string[];
};

type Balance = {
  income: number;
  outcome: number;
  total: number;
};

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  balance: Balance;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')

  authChannel.postMessage('signOut');

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [balance, setBalance] = useState<Balance>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      api.get('/auth/me')
        .then(response => {
          const { email, roles } = response.data

          setUser({ email, roles })
        })
        .catch(() => {
          signOut();
        })

      api.get('/transactions')
        .then(response => {
          const { income, outcome, total } = response.data.balance
          setBalance({ income, outcome, total })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      if (response.status == 200) {
        const { token, roles } = response.data;

        setCookie(undefined, 'nextauth.token', token, {
          maxAge: 60 * 60 * 1000, // 1 hour
          path: '/'
        })

        setUser({
          email,
          roles,
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        api.get('/transactions').then(response => {
          const { income, outcome, total } = response.data.balance
          setBalance({ income, outcome, total })
        }).catch((e) => {
          console.log(e)
        })

        Router.push('/dashboard');
      } else {
        alert("Credenciais inválidas");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user, balance }}>
      {children}
    </AuthContext.Provider>
  )
}