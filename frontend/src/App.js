import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Suspense, lazy } from 'react';
import store from './redux/store/store.js';
import DashBoard from './pages/DashBoard.jsx';

// Lazy load components for better performance
const ResetPasswordForm = lazy(() => import('./components/ResetPasswordForm.jsx'));
const ForgetPasswordForm = lazy(() => import('./components/ForgetPasswordForm.jsx'));
const SigninForm = lazy(() => import('./components/SigninForm.jsx'));
const MainPage = lazy(() => import('./pages/MainPage.jsx'));
const SignUpForm = lazy(() => import('./components/SignUpForm.jsx'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SigninForm />} />
            <Route path='/forgetPassword' element={<ForgetPasswordForm />} />
            <Route path='/resetPassword' element={<ResetPasswordForm />} />
            <Route path='/dashboard' element={<DashBoard />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
