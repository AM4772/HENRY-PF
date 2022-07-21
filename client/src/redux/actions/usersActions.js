import axios from "axios";
import { loginUser } from "../reducers/profileSlice";
import {
  getUsers,
  getUserDetail,
  getSearchUser,
  registerUser,
} from "../reducers/usersSlice";

axios.defaults.baseURL = `https://db-proyecto-final.herokuapp.com`;

export function asyncGetUsers(username) {
  return async function (dispatch) {
    try {
      if (!username) {
        const response = (await axios("/users")).data;
        dispatch(getUsers(response));
      } else {
        const response = (await axios(`/users?username=${username}`)).data;
        dispatch(getUsers(response));
      }
    } catch (error) {
      dispatch(getUsers([null]));
    }
  };
}

export function asyncGetSearchUser() {
  return async function (dispatch) {
    try {
      const response = (await axios("/users")).data;
      dispatch(getSearchUser(response));
    } catch (error) {
      dispatch(getSearchUser([]));
    }
  };
}

export function asyncGetUserDetail(ID) {
  return async function (dispatch) {
    try {
      const response = (await axios("/users/" + ID)).data;
      dispatch(getUserDetail(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncRegisterUser(info) {
  return async function (dispatch) {
    try {
      await axios.post("/users", info);
    } catch (error) {
      console.error(error.message);
    }
  };
}

export function asyncLogin(body) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/login", body);
      dispatch(loginUser(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };
}
