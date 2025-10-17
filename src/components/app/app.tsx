import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { FC, useState } from 'react';

const AppContent: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        {/* TODO: Защищённые Login, Register, ForgotPassword, ResetPassword, Profile, ProfileOrders: <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
        {/* Если пользователь перейдёт напрямую по /ingredients/:id */}
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          {/* TODO: Изменить заголовок */}
          <Route
            path='/feed/:number'
            element={
              <Modal title='Заголовок' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          {/* TODO: Защищённый */}
          {/* TODO: Изменить заголовок */}
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Заголовок' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

const App: FC = () => (
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}
  >
    <AppContent />
  </BrowserRouter>
);

export default App;
