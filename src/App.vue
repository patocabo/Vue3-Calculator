<template>
  <nav-bar-custom> d</nav-bar-custom>
  <div class="calculadora grey lighten-3">
    <memory-component :cuentas="data.logMemory"></memory-component>
    <div class="container-1">
      <display-component :display="data.numberToDisplay"></display-component>
      <div class="teclas">
        <button @click="methods.clear" class="boton c">C</button>
        <button @click="methods.agregar(7)" class="boton">7</button>
        <button @click="methods.agregar(4)" class="boton">4</button>
        <button @click="methods.agregar(1)" class="boton">1</button>
        <button @click="methods.cambiaSigno" class="boton">+/-</button>
        <button @click="methods.agregar(8)" class="boton">8</button>
        <button @click="methods.agregar(5)" class="boton">5</button>
        <button @click="methods.agregar(2)" class="boton">2</button>
        <button @click="methods.agregar(0)" class="boton">0</button>
        <button @click="methods.deletea" class="boton">DEL</button>
        <button @click="methods.agregar(9)" class="boton">9</button>
        <button @click="methods.agregar(6)" class="boton">6</button>
        <button @click="methods.agregar(3)" class="boton">3</button>
        <button @click="methods.punto" class="boton">.</button>
        <button @click="methods.divide" class="boton">/</button>
        <button @click="methods.multiplica" class="boton">*</button>
        <button @click="methods.resta" class="boton">-</button>
        <button @click="methods.suma" class="boton">+</button>
        <button @click="methods.igual" class="boton igual">=</button>
      </div>
    </div>
  </div>
</template>

<script>

import firebase from "firebase";
import store, {auth, db} from "@/store/auth"
import {provide, reactive} from "vue";

export default {
  setup() {
    provide('store', store)

    auth.onAuthStateChanged(user => {
      data.logMemory = [];
      store.state.user = user;
      let memoria = []
      if (user) {
        db.collection('users').doc(store.state.user.uid).collection('operaciones').get().then((queryResult) => {
          queryResult.forEach(doc => {
            memoria.push(doc.data())
          })
          store.state.memory = memoria
        })
      } else store.state.memory = null
    })


    const data = reactive({
      logMemory: [],
      operando: false,
      numberToDisplay: '',
      firstNumber: null,
      operator: ''
    })

    const methods = {
      agregar(numero) {
        if (data.operando) {
          data.numberToDisplay = '';
          data.operando = false
        }
        if (data.numberToDisplay === String(0)) {
          data.numberToDisplay = String(numero)
        } else data.numberToDisplay = '' + data.numberToDisplay + numero
      },
      multiplica() {
        data.operator = (a, b) => a * b
        data.firstNumber = data.numberToDisplay;
        data.operando = true;
        data.lastOperator = '*'
      },
      divide() {
        data.operator = (a, b) => a / b
        data.firstNumber = data.numberToDisplay;
        data.operando = true;
        data.lastOperator = '/'
      },
      suma() {
        data.operator = (a, b) => a + b
        data.firstNumber = data.numberToDisplay;
        data.operando = true;
        data.lastOperator = '+'
      },
      resta() {
        data.operator = (a, b) => a - b
        data.firstNumber = data.numberToDisplay;
        data.operando = true;
        data.lastOperator = '-'
      },
      igual() {
        let primerNumero = data.firstNumber;
        let segundoNumero = data.numberToDisplay
        data.numberToDisplay = String(data.operator != null ? data.operator(Number(data.firstNumber), Number(data.numberToDisplay)) : data.numberToDisplay);
        data.logMemory.push(primerNumero + data.lastOperator + segundoNumero + ' = ' + data.numberToDisplay)
        if (store.state.user)
          return db.collection('users').doc(store.state.user.uid).collection('operaciones').doc().set({
            primero: primerNumero,
            segundo: segundoNumero,
            operador: data.lastOperator,
            resultado: data.numberToDisplay,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()).toDate()
          }).catch(err => {
            console.log(err)
          })
      },
      cambiaSigno() {
        data.numberToDisplay = -data.numberToDisplay
      },
      deletea() {
        data.numberToDisplay = data.numberToDisplay.slice(0, -1)
      },
      punto() {
        if (data.numberToDisplay.toString().indexOf('.') === -1) {
          methods.agregar('.');
        }
      },
      clear() {
        data.numberToDisplay = String(0);
      }
    }

    return {methods, data}
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  font-weight: normal;
  font-family: Gotham Rounded, sans-serif;
}

.calculadora {
  display: flex;
  padding: 0;
  background-color: rgb(210, 210, 210);
  margin: auto;
  width: min-content;
  height: min-content;
}

.container-1 {
  display: inline-block;
  margin: auto !important;
  text-align: center;
  justify-content: center;
  background-color: rgb(175, 175, 175);
  margin-top: 30px;
  border: 3px solid black;
}

.teclas {
  padding: 2px;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(5, 100px);
  background-color: rgb(175, 175, 175);
  grid-auto-flow: column;
}


.boton {
  display: block;
  margin: 0 auto;
  width: 95% !important;
  height: 95%;
  font-size: large;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.igual {
  background-color: rgb(210, 210, 210);
}

.c {
  grid-column: 1/span 2;
}
</style>
