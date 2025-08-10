import { createDomain } from "effector";
import { User, AuthState } from "./types";
import { loginFx, registerFx, meFx, logoutFx } from "./effects";

const domain = createDomain("auth");

export const $auth = domain
  .createStore<AuthState>({ user: null, loading: false })
  .on(loginFx.pending, (s, p) => ({ ...s, loading: p }))
  .on(registerFx.pending, (s, p) => ({ ...s, loading: p }))
  .on(meFx.pending, (s, p) => ({ ...s, loading: p }))
  .on(loginFx.doneData, (s, payload) => ({ ...s, user: payload.user, loading: false }))
  .on(registerFx.doneData, (s, payload) => ({ ...s, user: payload.user, loading: false }))
  .on(meFx.doneData, (s, user: User) => ({ ...s, user, loading: false }))
  .on(logoutFx.done, () => ({ user: null, loading: false }));

// public API for this feature
export const authModel = { $auth, loginFx, registerFx, meFx, logoutFx };

export type AuthModel = typeof authModel;
