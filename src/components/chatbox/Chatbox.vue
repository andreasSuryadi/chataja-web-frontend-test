<template>
  <div class="container">
    <!-- For Sidebar -->
    <div class="sidebar">
      <img class="sidebar-logo" src="@/assets/logo.png" alt="Logo" />
      <div class="sidebar-chat">
        <img class="sidebar-chat__image" @mouseover="hoverChat = true" @mouseleave="hoverChat = false" :src="require(`@/assets/chat-${imageChat}.png`)" alt="Chat" />
      </div>
      <div class="sidebar-logout">
        <img class="sidebar-logout__image" src="@/assets/logout.png" alt="Chat" />
      </div>
    </div>

    <!-- For list name data -->
    <div class="chatbox-list">
      <div class="chatbox-list__title">
        Chats
      </div>
      <div class="chatbox-list__body">
        <template v-if="users.length > 0">
          <div class="chatbox-list__body_list" v-for="(user, index) in users" :key="index">
            <div class="chatbox-list__body_list-avatar">
              <img class="chatbox-list__body_list-avatar--image" :src="user.avatar" alt="Avatar">
            </div>
            <div class="chatbox-list__body_list-text">
              {{ user.name }}
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- For chatbox message -->
    <div class="chatbox-message">
      <!-- Chatbox message header -->
      <div class="chatbox-message__header">
        <template v-if="users.length > 0">
          <div class="chatbox-message__header-avatar">
            <img class="chatbox-message__header-avatar--image" :src="users[0].avatar" alt="Avatar">
          </div>
          <div class="chatbox-message__header-text">
            {{ users[0].name }}
          </div>
        </template>
      </div>

      <!-- Chatbox message body -->
      <div class="chatbox-message__body">
        <div class="chatbox-message__body_me">
          <div class="chatbox-message__body_me--message">
            Halo Darmaji! Jadi ga besok kita pergi?
          </div>
          <div class="chatbox-message__body_me--time">
            22.10
          </div>
        </div>
        <div class="chatbox-message__body_friend">
          <div class="chatbox-message__body_friend--message">
            Weits, jadi dong Yani! Besok gw jemput ke rumah lo deh
          </div>
          <div class="chatbox-message__body_friend--time">
            22.11
          </div>
        </div>
        <!-- <div class="chatbox-message__body_me">
          <div class="chatbox-message__body_me--message">
            Halo Darmaji! dsfsdf ga besok kita pergi?
          </div>
          <div class="chatbox-message__body_me--time">
            22.10
          </div>
        </div>
        <div class="chatbox-message__body_me">
          <div class="chatbox-message__body_me--message">
            Halo Darmaji! dsfsdf ga besok kita pergi?
          </div>
          <div class="chatbox-message__body_me--time">
            22.10
          </div>
        </div>
        <div class="chatbox-message__body_me">
          <div class="chatbox-message__body_me--message">
            Halo Darmaji! dsfsdf ga besok kita pergi?
          </div>
          <div class="chatbox-message__body_me--time">
            22.10
          </div>
        </div>
        <div class="chatbox-message__body_me">
          <div class="chatbox-message__body_me--message">
            Halo Darmaji! dsfsdf ga besok kita pergi?
          </div>
          <div class="chatbox-message__body_me--time">
            22.10
          </div>
        </div>
        <div class="chatbox-message__body_me">
          <div class="chatbox-message__body_me--message">
            Halo Darmaji! dsfsdf ga besok kita pergi?
          </div>
          <div class="chatbox-message__body_me--time">
            22.10
          </div>
        </div>
        <div class="chatbox-message__body_me">
          <div class="chatbox-message__body_me--message">
            Halo Darmaji! dsfsdf ga besok kita pergi?
          </div>
          <div class="chatbox-message__body_me--time">
            22.10
          </div>
        </div>
        <div class="chatbox-message__body_me">
          <div class="chatbox-message__body_me--message">
            Halo Darmaji! dsfsdf ga besok kita pergi?
          </div>
          <div class="chatbox-message__body_me--time">
            22.10
          </div>
        </div>
        <div class="chatbox-message__body_me">
          <div class="chatbox-message__body_me--message">
            Halo Darmaji! dsfsdf ga besok kita pergi?
          </div>
          <div class="chatbox-message__body_me--time">
            22.10
          </div>
        </div> -->
      </div>

      <!-- Chatbox message footer -->
      <div class="chatbox-message__footer">
        <div class="chatbox-message__footer_input">
          <input type="text" placeholder="Type your message here" v-model="form.message" />
        </div>
        <div class="chatbox-message__footer_button">
          <button type="submit" class="btn btn-send btn-rounded">
            <img class="chatbox-message__footer_button--image" src="@/assets/send.png" alt="Send">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chatbox",
  data() {
    return {
      form: {
        message: ""
      },
      users: [],
      imageChat: "",
      hoverChat: false
    };
  },
  created() {
    this.imageChat = "default"
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // For fetch user data
    async fetchData() {
      this.$store.dispatch("getUsers")
        .then((response) => {
          this.users = response.data
        })
    },

    // For change image chat logo
    changeImageChat() {
      // if (this.$route.name == "chatbox") {
      //   this.imageChat = "blue";
      // } else {
        this.imageChat = this.hoverChat == true ? "active" : "default";
      // }
    },
  },
  watch: {
    hoverChat() {
      this.changeImageChat();
    },
  }
}
</script>

<style lang="scss">
html, body {
  background-color: #ffffff;
}
</style>