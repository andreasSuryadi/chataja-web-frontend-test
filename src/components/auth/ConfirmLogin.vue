<template>
  <div class="container">
    <div class="auth">
      <div class="auth-header">
        <img class="auth-header-image" src="@/assets/logo.png" alt="">
        <div class="auth-header-text__small">
          OTP has been sent to (phone/email)
        </div>
      </div>
      <div class="auth-body">
        <form @submit.prevent="checkOtp(form.otp)">
          <div class="auth-body-input">
            <input type="text" @keypress="onlyNumber" class="auth-body-input__otp" maxlength="6" v-model="form.otp" />
          </div>
          <div class="auth-body-button">
            <button class="btn btn-expanded btn-chataja">Confirm Code</button>
          </div>
          <div class="auth-body-resend">
            <button class="btn btn-expanded btn-resend" @click="getOtp()">Resend OTP</button>
          </div>
        </form>
      </div>
    </div>

    <div class="alert alert-warning" v-if="messageError != null">
      {{ messageError }}
    </div>

    <div class="alert alert-otp" v-if="currentUser != null && messageError == null">
      <template v-if="currentUser.otp != 0">
        Your OTP is: {{ currentUser.otp }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirm-login",
  data() {
    return {
      currentUser: null,
      messageError: null,
      form: {
        otp: ""
      }
    }
  },
  mounted() {
    this.currentUser = JSON.parse(localStorage.getItem("userLogin"))[0]
    this.getOtp()
  },
  methods: {
    getOtp() {
      this.$store.dispatch("getOtp")
        .then((response) => {
          this.messageError = null
          this.currentUser.otp = response.data
        })
    },
    checkOtp(otp) {
      if (otp == this.currentUser.otp) {
        this.currentUser.otp = 0;
        this.$router.push("chatbox")
      } else {
        this.messageError = "Failed Signing In. Wrong Passcode. Please resend OTP."
      }
    },
    onlyNumber ($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode <= 47 || keyCode >= 58)) {
          $event.preventDefault();
      }
    }
  }
}
</script>