<template>
  <div class="container">
    <div class="auth">
      <div class="auth-header">
        <img class="auth-header-image" src="@/assets/logo.png" alt="">
        <div class="auth-header-text__big">
          Sign In
        </div>
      </div>
      <div class="auth-body">
        <form @submit.prevent="processFormLogin(form.username)">
          <div class="auth-body-input">
            <input type="text" class="auth-body-input__text" placeholder="Input your phone number or email" v-model="form.username" />
          </div>
          <div class="auth-body-button">
            <button class="btn btn-expanded btn-chataja">Sign In</button>
          </div>
        </form>
      </div>
    </div>

    <div class="alert alert-warning" v-if="messageError != null">
      {{ messageError }}
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: null,
      },
      messageError: null
    }
  },
  methods: {
    processFormLogin(username) {
      this.$store.dispatch("login", { username })
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ name: "loginConfirmation" })
          } else {
            this.messageError = response.message
          }
        })
    }
  },
  watch: {
    "form.username": function() {
      this.message = null
    }
  }
}
</script>