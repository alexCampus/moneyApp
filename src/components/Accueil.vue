<template>
  <div class="ui container">
    <div class="ui message">
      <div class="header">
        <h1>Bienvenue sur Money App</h1>
      </div>
      <p>Gère tes dépenses quotidienne</p>
      <span>{{moment().format('DD-MM-YYYY')}}</span>
    </div>
    <div class="ui massive form segment">
      <div class="equal width inline fields">
        <div class="field">
          
          <select class="ui" v-model="newDepense.categorie">
            <option disabled value="">Categorie</option>
            <option value="course">Course</option>
            <option value="resto">Resto</option>
            <option value="tabac">Tabac</option>
            <option value="lecture">Lecture</option>
            <option value="divers">Divers</option>
          </select>
        </div>
        <div class="field">         
          <input type="text" placeholder="Intitulé" v-model="newDepense.intitule">
        </div>

        <div class="field">          
          <input type="text" placeholder="Montant" v-model="newDepense.montant">
        </div>

        <button @click.prevent="addDepense" class="ui massive icon button">
          <i class="plus icon"></i>
        </button>
      </div>
      <p>Total = {{totalDepense}}</p>
    </div>
    <button class="ui button green" @click.prevent='logOut'>Log Out</button>
  </div>


</template>

<script>
import {db} from './firebase'
import {auth} from './firebase'
import moment from 'moment'
import toastr from 'toastr'


let depensesRef = db.ref('depenses')

export default {
  name: 'accueil',
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
      this.total += parseInt(this.newDepense.montant)
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
.container {
  padding-top: 25%; 

}
.container div.input {
  margin-top : 5%;
}
</style>
