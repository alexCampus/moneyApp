<template>
  <div class="ui middle aligned center aligned grid">
  <div class="column">
    <form class="ui large form" >
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="email" placeholder="E-mail address" v-model="user.email">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="Password" v-model="user.pass">
          </div>
        </div>
        <div class="ui fluid large teal submit button" @click.prevent="loginUser">Login</div>
      </div>
      <div class="ui error message"></div>
    </form>
  </div>
</div>
    
</template>

<script>
// import Firebase from 'firebase'
import {auth} from './firebase'
import toastr from 'toastr'


// let db =  app.database();
//let auth = Firebase.auth();

export default {

  name: 'Login',
  data() {
    return {
      user: {
        email :'',
        pass:'',
      },
    }
  },
  methods: {
    loginUser() {
      let promise = auth.signInWithEmailAndPassword(this.user.email, this.user.pass)
      promise.catch(e => console.log(e.message))
      auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          console.log(firebaseUser)
          toastr.success('Login Ok')
          this.$router.push({name: 'Accueil'})
 
        } else {
          console.log('not logged in')
          toastr.warning('Login failed')
        }
      })
    },
  },
}
</script>
<style>
    div.grid {
     
    }
    .column {
      margin-top: 25%;
      max-width: 450px;
    }
  </style>
