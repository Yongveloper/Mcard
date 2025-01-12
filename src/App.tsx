import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/shared/Navbar';
import ScrollToTop from './components/shared/ScrollToTop';
import ApplyPage from './pages/Apply';
import CardPage from './pages/Card';
import HomePage from './pages/Home';
import SigninPage from './pages/Signin';
import SignupPage from './pages/Signup';
import TestPage from './pages/Test';
import ApplyDonePage from './pages/ApplyDone';
import { Suspense } from 'react';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<></>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDonePage />
            </PrivateRoute>
          }
        />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
