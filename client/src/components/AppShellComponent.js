import { useState, useContext } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {UserContext} from '../context/UserProvider.js'

import ProtectedRoute from '../components/ProtectedRoute.js'
import HeaderLogoutButton from '../components/HeaderLogoutButton.js'

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

import Auth from '../pages/Auth'
import Profile from '../pages/Profile'
import Public from '../pages/Public'
import PostPage from '../pages/PostPage'

export default function AppShellDisplay () {
  const { token, logout } = useContext(UserContext)
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (     
   <Router>
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      fixed
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 150, lg: 300 }}>
                      <HeaderLogoutButton logout={logout} />
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <h1 className="gradient-title">PedalPosts</h1>
          </div>
        </Header>
      }
    >
         <Routes>
        <Route 
        path="/" 
        element={ token ? <Navigate to="/profile"/> : <Auth />}/>
        <Route 
        path="/profile" 
        element={
          <ProtectedRoute token={token} redirectTo="/">
            <Profile />
          </ProtectedRoute>
          } 
        />
        <Route 
        path="/public"
         element={
         <ProtectedRoute token={token} redirectTo="/">
          <Public />
         </ProtectedRoute>
          } 
         />
        <Route 
        path="/postpage/:id"
         element={
         <ProtectedRoute token={token} redirectTo="/">
          <PostPage />
         </ProtectedRoute>
          } 
         />
      </Routes>
    </AppShell>
    </Router>
  );
}