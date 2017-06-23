<template>
  <div class="ui container">
    <div class="ui message">
      <div class="header">
        <h1>Bienvenue sur Money App</h1>
      </div>
      <p>Gère tes dépenses quotidienne</p>
      <span>{{moment().format('DD-MM-YYYY')}}</span>
    </div>
    <div class="ui massive segment" v-for="depense of depenses">
      
      <table class="ui inverted grey table">
        <thead>
        <tr>
          <th id="cat" colspan="3">Categorie : {{depense.categorie}}</th>
        </tr>
          <tr>
            <th>Intitulé</th>
            <th>Montant</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{depense.intitule}}</td>
            <td>{{depense.montant}}</td>
            <td>{{depense.date}}</td>
          </tr>
        </tbody>
      </table>      
      <div class="ui inverted divider"></div>
    </div>
    <div class="ui massive segment">
       <router-link :to="{ name: 'Accueil'}">
        <button class="ui massive button teal">Accueil</button>         
       </router-link>
      <button class="ui massive button blue">Graph</button>     
    </div>
    <button class="ui massive button olive" @click.prevent='logOut'>Log Out</button>
  </div>



</template>

<script>
import {db} from './firebase'
import {auth} from './firebase'
import moment from 'moment'
import toastr from 'toastr'


let depensesRef = db.ref('depenses')

export default {
  name: 'detail',
  firebase: {
    depenses: depensesRef
  },
  data () {
    return {
      newDepense: {
        categorie: '',
        date: moment().format('DD-MM-YYYY, h:mm:ss'),
        intitule: '',
        montant: '',

      },     
    total: 0
    }
  },
  computed: {
    totalDepense() {
      this.depenses.forEach((depense,i)=> {
        this.total += parseInt(depense.montant)
      })
      return this.total 
    }
  },
  methods: {
    addDepense() {
      //this.total += parseInt(this.newDepense.montant)
      depensesRef.push(this.newDepense)
      toastr.success('Dépense Ajouté')
      this.newDepense.intitule = ''
      this.newDepense.montant  = ''
    },
    logOut() {
      auth.signOut()
      this.$router.push({ name: 'Login'})
    }
  },
  mounted() {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        toastr.success('Welcome')
      } else {
        toastr.warning('Access denied')
        this.$router.push({ name: 'Login'})
      }
    })
  }
}
</script>
<style>
body {
  font-size: 4em;
}
#cat {
  text-align: center;
  color: black;
}
</style>
