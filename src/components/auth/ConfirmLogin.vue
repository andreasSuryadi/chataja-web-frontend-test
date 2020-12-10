<template>
  <div class="auth">
    <div class="auth-header">
      <img class="auth-header-image" src="@/assets/logo.png" alt="">
      <div class="auth-header-text__small">
        OTP has been sent to (phone/email)
      </div>
    </div>
    <div class="auth-body">
      <div class="auth-body-input">
        <input type="text" class="auth-body-input__otp" maxlength="6" v-model="form.username" />
      </div>
      <div class="auth-body-button">
        <button class="btn btn-expanded btn-chataja">Confirm Code</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirm-login",
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