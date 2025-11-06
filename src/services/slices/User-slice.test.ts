import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  registerUser,
  loginUser,
  fetchUser,
  updateUser,
  logoutUser
} from './User-slice';
import { TAuthResponse, TLoginData, TRegisterData, TUserResponse } from '@api';
import { TUser } from '@utils-types';

const registerData: TRegisterData = {
  email: 'email',
  name: 'Name',
  password: 'qwer123'
};

const loginData: TLoginData = {
  email: 'email',
  password: 'qwer123'
};

const someUser: TUser = {
  email: 'email',
  name: 'Name'
};

const updatedUser: TUser = {
  email: 'email',
  name: 'New Name'
};

const mockUser: TAuthResponse = {
  success: true,
  refreshToken: 'refrToken',
  accessToken: 'accToken',
  user: someUser
};

const mockFetchUser: TUserResponse = {
  success: true,
  user: someUser
};

const mockUpdateUser: TUserResponse = {
  success: true,
  user: updatedUser
};

describe('Проверка User-slice', () => {
  it('Action Request registerUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(registerUser.pending('', registerData));

    const state = store.getState().user;
    expect(state.loading).toBe(true);
  });

  it('Action Success registerUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(registerUser.fulfilled(mockUser, '', registerData));

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser.user);
    expect(state.isAuthChecked).toBe(true);
  });

  it('Action Failed registerUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(
      registerUser.rejected(new Error('Ошибка'), '', registerData)
    );

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('Action Request loginUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(loginUser.pending('', loginData));

    const state = store.getState().user;
    expect(state.loading).toBe(true);
  });

  it('Action Success loginUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(loginUser.fulfilled(mockUser, '', loginData));

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser.user);
    expect(state.isAuthChecked).toBe(true);
  });

  it('Action Failed loginUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(loginUser.rejected(new Error('Ошибка'), '', loginData));

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('Action Request fetchUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(fetchUser.pending('', undefined));

    const state = store.getState().user;
    expect(state.loading).toBe(true);
  });

  it('Action Success fetchUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(fetchUser.fulfilled(mockFetchUser, '', undefined));

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockFetchUser.user);
    expect(state.isAuthChecked).toBe(true);
  });

  it('Action Failed fetchUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(fetchUser.rejected(new Error('Ошибка'), '', undefined));

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.user).toBeNull();
  });

  it('Action Request updateUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(updateUser.pending('', registerData));

    const state = store.getState().user;
    expect(state.loading).toBe(true);
  });

  it('Action Success updateUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(
      updateUser.fulfilled(mockUpdateUser, '', { name: 'New Name' })
    );

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUpdateUser.user);
  });

  it('Action Failed updateUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(updateUser.rejected(new Error('Ошибка'), '', registerData));

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('Action Request logoutUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(logoutUser.pending('', undefined));

    const state = store.getState().user;
    expect(state.loading).toBe(true);
  });

  it('Action Success logoutUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(logoutUser.fulfilled(undefined, '', undefined));

    const state = store.getState().user;
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('Action Failed logoutUser', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    store.dispatch(logoutUser.rejected(new Error('Ошибка'), '', undefined));

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
