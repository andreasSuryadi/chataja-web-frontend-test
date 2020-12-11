<template>
  <div class="container">
    <!-- For Sidebar -->
    <div class="sidebar">
      <img class="sidebar-logo" src="@/assets/logo.png" alt="Logo" />
      <div class="sidebar-chat">
        <img class="sidebar-chat__image" @mouseover="hoverChat = true" @mouseleave="hoverChat = false" :src="require(`@/assets/chat-${imageChat}.png`)" alt="Chat" @click="isChatActive = !isChatActive" />
      </div>
      <div class="sidebar-logout">
        <button class="btn sidebar-logout__button" @click="notificationLogout">
          <img class="sidebar-logout__image" src="@/assets/logout.png" alt="Chat" />
        </button>
      </div>
    </div>

    <template v-if="!isMobile">
      <!-- For list name data -->
      <div class="chatbox-list">
        <div class="chatbox-list__title">
          Chats
        </div>
        <div class="chatbox-list__body">
          <template v-if="users.length > 0">
            <div class="chatbox-list__body_list" v-for="(user, index) in users" :key="index" @click="chatboxSelectUser(index)">
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
          <template v-if="selectedUser != null">
            <div class="chatbox-message__header-avatar">
              <img class="chatbox-message__header-avatar--image" :src="selectedUser.avatar" alt="Avatar">
            </div>
            <div class="chatbox-message__header-text">
              {{ selectedUser.name }}
            </div>
          </template>
        </div>

        <!-- Chatbox message body -->
        <div class="chatbox-message__body">
          <div v-for="(message, index) in messageCollection" :key="index">
            <div class="chatbox-message__body_me" v-if="message.from == currentUser.id">
              <div class="chatbox-message__body_me--message">
                {{ message.message }}
              </div>
              <div class="chatbox-message__body_me--time">
                {{ getTimeMessageSend(message.created_at) }}
              </div>
            </div>
            <div class="chatbox-message__body_friend" v-else-if="message.from != currentUser.id">
              <div class="chatbox-message__body_friend--message">
                {{ message.message }}
              </div>
              <div class="chatbox-message__body_friend--time">
                {{ getTimeMessageSend(message.created_at) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Chatbox message footer -->
        <div class="chatbox-message__footer">
          <div class="chatbox-message__footer_input">
            <input type="text" placeholder="Type your message here" @keyup.enter="sendMessage()" v-model="form.message" />
          </div>
          <div class="chatbox-message__footer_button">
            <button type="submit" class="btn btn-send btn-rounded" @click="sendMessage()">
              <img class="chatbox-message__footer_button--image" src="@/assets/send.png" alt="Send">
            </button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- For list name data -->
      <div class="chatbox-list" v-if="isChatActive">
        <div class="chatbox-list__title">
          Chats
        </div>
        <div class="chatbox-list__body">
          <template v-if="users.length > 0">
            <div class="chatbox-list__body_list" v-for="(user, index) in users" :key="index" @click="chatboxSelectUser(index)">
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
      <div class="chatbox-message" v-else>
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
          <div v-for="(message, index) in messageCollection" :key="index">
            <div class="chatbox-message__body_me" v-if="message.from == currentUser.id">
              <div class="chatbox-message__body_me--message">
                {{ message.message }}
              </div>
              <div class="chatbox-message__body_me--time">
                {{ getTimeMessageSend(message.created_at) }}
              </div>
            </div>
            <div class="chatbox-message__body_friend" v-else-if="message.from != currentUser.id">
              <div class="chatbox-message__body_friend--message">
                {{ message.message }}
              </div>
              <div class="chatbox-message__body_friend--time">
                {{ getTimeMessageSend(message.created_at) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Chatbox message footer -->
        <div class="chatbox-message__footer">
          <div class="chatbox-message__footer_input">
            <input type="text" placeholder="Type your message here" @keyup.enter="sendMessage()" v-model="form.message" />
          </div>
          <div class="chatbox-message__footer_button">
            <button type="submit" class="btn btn-send btn-rounded" @click="sendMessage()">
              <img class="chatbox-message__footer_button--image" src="@/assets/send.png" alt="Send">
            </button>
          </div>
        </div>
      </div>
    </template>

    <div class="notification" :style="!isNotification ? 'display: none' : 'display:block'">
      <div class="notification-header">
        Logout
      </div>
      <div class="notification-body">
        Are you sure you want to logout?
      </div>
      <div class="notification-footer">
          <button class="btn btn-notification btn-chataja" @click="logout">Yes</button>
          &nbsp;
          <button class="btn btn-notification btn-cancel" @click="cancelLogout()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase';

export default {
  name: "chatbox",
  data() {
    return {
      form: {
        message: null
      },
      users: [],
      currentUser: null,
      selectedUser: null,
      imageChat: "",
      messageCollection: [],
      hoverChat: false,
      isChatActive: true,
      isMobile: false,
      isNotification: false
    };
  },
  created() {
    if (window.innerWidth <= 700) {
      this.isMobile = true
      this.imageChat = "active"
    } else {
      this.imageChat = "default"
    }
    this.currentUser = JSON.parse(localStorage.getItem("userLogin"))[0]
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // For fetch user data
    async fetchData() {
      this.$store.dispatch("getUsers", { id: this.currentUser.id })
        .then((response) => {
          this.users = response
        })
    },

    async getDataMessage() {
      await db.collection("messages")
        .orderBy("created_at")
        .get()
        .then((querySnapshot) => {
          let messageData = []
          querySnapshot.forEach((doc) => {
            messageData.push({
              message: doc.data().message,
              from: doc.data().from,
              to: doc.data().to,
              created_at: doc.data().created_at,
            });
          });

          this.messageCollection = messageData

        })

      let message = this.$el.querySelector(".chatbox-message__body");
      message.scrollTop = message.scrollHeight;
    },

    chatboxSelectUser(index) {
      this.selectedUser = this.users[index]
      this.isChatActive = false
      this.getDataMessage()
    },

    getTimeMessageSend(time) {
      let timestamp = new Date(time.toDate().getTime())
      let hours = timestamp.getHours()
      let minutes = timestamp.getMinutes()

      if (hours < 10) {
        hours = '0' + hours
      }

      if (minutes < 10) {
        minutes = '0' + minutes
      }

      return hours + "." + minutes;
    },

    // For send message
    async sendMessage() {
      if (this.form.message != null) {
        await db.collection("messages")
          .add({ 
            message: this.form.message,
            from: this.currentUser.id,
            to: this.users[0].id,
            created_at: new Date()
          })
          .then(() => {
            this.form.message = null
            this.getDataMessage()
          })
      }
    },

    notificationLogout() {
      this.isNotification = true
    },

    cancelLogout() {
      this.isNotification = false
    },

    async logout() {
      await this.$store.dispatch("logout")
        .then(() => {
          this.$router.push("login")
        })
    }
  },
  watch: {
    // Hovered image chat
    hoverChat(val) {
      this.imageChat = val == true ? "active" : "default";
    },

    // For is Chat active
    isChatActive(val) {
      this.imageChat = val == true ? "active" : "default";
    },
  }
}
</script>

<style lang="scss">
html, body, #app {
  background-color: #ffffff;
}
</style>