<template>
  <div class="auth">
    <div class="auth-header">
      <img class="auth-header-image" src="@/assets/logo.png" alt="">
      <div class="auth-header-text__big">
        Sign In
      </div>
    </div>
    <div class="auth-body">
      <div class="auth-body-input">
        <input type="text" class="auth-body-input__text" placeholder="Input your phone number or email" v-model="form.username" />
      </div>
      <div class="auth-body-button">
        <button class="btn btn-expanded btn-chataja">Sign In</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: ""
      }
    }
  },
  methods: {

  }
}
</script>