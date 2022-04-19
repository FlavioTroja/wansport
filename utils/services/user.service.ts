import { LoginPayload } from './../../pages/api/auth/login';
import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `/api/auth`;
const userSubject = new BehaviorSubject(process.browser && (localStorage.getItem('token') as any));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    me
};

function login(payload: LoginPayload | any) {
    return fetchWrapper.post(`${baseUrl}/login`, (payload))
        .then((res) => {
            userSubject.next(res.token);
            localStorage.setItem("token", res.token);

            return res;
        });
}

function logout() {
    localStorage.removeItem('token');
    userSubject.next(null);
    Router.push('/auth/login');
}

function me() {
    return fetch(`/api/auth/me`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": userService.userValue
        },
      })
}