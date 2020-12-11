import axios from "axios";

const state = {
  errors: null,
  message: null,
}

const actions = {
  // For login
  async login(context, credentials) {
    const response = await axios.get(process.env.VUE_APP_USER_URL);
    
    if (response.data) {
      let selectedUser = response.data.data.filter((data) => {
        return credentials.username == data.email || credentials.username == data.phone
      })

      if (selectedUser.length > 0) {
        if (localStorage.getItem("userLogin")) {
          localStorage.removeItem("userLogin")
        }

        localStorage.setItem("userLogin", JSON.stringify(selectedUser))

        return {
          message: "User Found!",
          status: 200
        }
      } else {
        return {
          message: "User Not Found!",
          status: 404
        }
      }
    }
  },

  // For get otp
  async getOtp() {
    const response = await axios.get(process.env.VUE_APP_OTP_URL)

    return response
  },

  async logout() {
    if (localStorage.getItem("userLogin")) {
      localStorage.removeItem("userLogin")
    }

    return {
      message: "Successfully Logout"
    }
  }
}

const mutations = {
  setAuth(state, user) {
    state.user = user;
  }
};

export default {
  state,
  actions,
  mutations
};