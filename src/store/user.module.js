import axios from "axios";

const state = {
  errors: null,
  message: null,
  users: null,
  user: null
};

const getters = {
  getUsers(state) {
    return state.users;
  },
  getUser(state) {
    return state.user;
  }
};

const actions = {
  async getUsers() {
    const response = await axios.get(process.env.VUE_APP_USER_URL);
    return response.data;
  },
  // async getUser(context, id) {
  //   if (JwtService.getToken()) {
  //     ApiService.setHeader();
  //     const response = await ApiService.get("api/user/" + id + "/show");
  //     return response.data;
  //   }
  // }
};

// const mutations = {
//   setUsers(state, users) {
//     state.users = users;
//   },
//   setUser(state, user) {
//     state.user = user;
//   }
// };

export default {
  state,
  actions,
  // mutations,
  getters
};