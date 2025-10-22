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
  useNavigate,
  useParams
} from 'react-router-dom';
import { RootState, useSelector, useDispatch } from '../../services/store';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { FC, useEffect, useState } from 'react';
import { fetchUser, setAuthChecked } from '../../services/slices/User-slice';
import { getCookie } from '../../utils/cookie';
import { getIngredients } from '../../services/slices/Ingredients-slice';
import { Preloader } from '@ui';
import { ProtectedRoute } from '../protected-route';

const AppContent: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch = useDispatch();

  const isIngredientsLoading = useSelector(
    (state: RootState) => state.ingredients.loading
  );

  // Проверка пользователя
  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      dispatch(fetchUser());
    } else {
      dispatch(setAuthChecked(true));
    }
  }, [dispatch]);

  // Загрузка ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  // Получение номера заказа для модального онка
  const extractOrderNumber = () => {
    const currentPath = location.pathname.split('/');
    return currentPath[currentPath.length - 1] || '';
  };
  const orderNumber = extractOrderNumber();

  return (
    <div className={styles.app}>
      <AppHeader />

      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound404 />} />
            {/* Если пользователь перейдёт напрямую по этим путям */}
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal title={`#${orderNumber}`} onClose={handleCloseModal}>
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
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal title={`#${orderNumber}`} onClose={handleCloseModal}>
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
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
