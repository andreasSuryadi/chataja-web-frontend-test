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
  async getUsers(context, content) {
    const response = await axios.get(process.env.VUE_APP_USER_URL);

    let userList = response.data.data.filter((data) => {
      return content.id != data.id
    })

    return userList;
  }
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