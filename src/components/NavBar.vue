<template>
  <nav class="z-depth-0 grey lighten-4">
    <div class="nav-wrapper container">
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <a class="grey-text modal-trigger"></a>
        </li>
        <li v-if="state.state.user">
          <a class="grey-text" id="logout" @click.prevent="state.logout">Logout</a>
        </li>
        <li v-if="!state.state.user">
          <a class="grey-text modal-trigger" @click.prevent="toggleModal('Login')">Login</a>
        </li>
        <li v-if="!state.state.user">
          <a class="grey-text modal-trigger" @click.prevent="toggleModal('Register')">Sign Up</a>
        </li>
        <li v-if="state.state.user">
          <a class="grey-text modal-trigger" @click.prevent="">{{state.state.user.email}}</a>
        </li>
      </ul>

    </div>
  </nav>

  <!-- SIGN UP MODAL -->
  <div id="modal-signup" class="modal" style="display: block" v-if="selected.register">
    <div class="modal-content">
      <h4>Sign up</h4><br/>
      <form id="signup-form">
        <div class="input-field">
          <input type="email" id="signup-email" v-model="userData.email" required/>
          <label for="signup-email">Email address</label>
        </div>
        <div class="input-field">
          <input type="password" id="signup-password" v-model="userData.password" required/>
          <label for="signup-password">Choose password</label>
        </div>
        <button class="btn yellow darken-2 z-depth-0" @click.prevent="authFunc(state.signIn(userData.email,userData.password))">
          Sign up
        </button>
        <button class="btn red darken-2 z-depth-0" @click.prevent="toggleModal('Register')">Close</button>
      </form>
    </div>
  </div>


  <!-- LOGIN MODAL -->
  <div id="modal-login" class="modal" style="display: block" v-if="selected.login">
    <div class="modal-content">
      <h4>Login</h4><br/>
      <form id="login-form">
        <div class="input-field">
          <input type="email" id="login-email" v-model="userData.email" required/>
          <label for="login-email">Email address</label>
        </div>
        <div class="input-field">
          <input type="password" id="login-password" v-model="userData.password" required/>
          <label for="login-password">Your password</label>
        </div>
        <button class="btn yellow darken-2 z-depth-0"
                @click.prevent="authFunc(state.login(userData.email,userData.password))">
          Login
        </button>
        <button class="btn red darken-2 z-depth-0" @click="toggleModal('Login')">Close</button>
      </form>
    </div>
  </div>

  <!-- ACCOUNT MODAL -->
  <div id="modal-account" class="modal" style="display: block" v-if="selected.account">
    <div class="modal-content center-align">
      <h4>Account details</h4><br/>
      <div class="account-details"></div>
    </div>
    <button class="btn red darken-2 z-depth-0" @click="toggleModal('Account')">Close</button>

  </div>


</template>

<script>

import {inject, reactive} from 'vue'

export default {
  name: "NavBar",

  setup() {
    const state = inject('store')
    const userData = reactive({
      email: null,
      password: null
    })
    const selected = reactive({
      register: false,
      login: false,
      account: false,
      logout: false
    })

    const toggleModal = (modal) => {
      switch (modal) {
        case 'Register' :
          selected.register = !selected.register;
          selected.login = selected.account = selected.logout = false;
          break;
        case 'Login' :
          selected.login = !selected.login;
          selected.register = selected.account = selected.logout = false;
          break;
        case 'Account' :
          selected.account = !selected.account;
          selected.login = selected.register = selected.logout = false;
          break;
        case 'Logout' :
          selected.logout = !selected.logout;
          selected.login = selected.account = selected.register = false;
      }
    }

    let authFunc = (authFunction) => {
      authFunction && authFunction()
      Object.keys(selected).forEach(key=>selected[key] = false)
    }

    return {
      toggleModal,
      userData,
      selected,
      state,
      authFunc,
    }
  }
}


</script>

<style scoped>

</style>