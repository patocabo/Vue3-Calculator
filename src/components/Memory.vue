<template>
  <div class="memory" id="memory">Memory
    <div class="elementos-memoria" v-for="item in saved[0]" :key="item">
      {{ item.primero + item.operador + item.segundo + ' = ' + item.resultado }}
    </div>
    <div class="elementos-memoria" v-for="cuenta in cuentas" :key="cuenta">{{ cuenta }}</div>
  </div>
</template>

<script>
import M from 'materialize-css'
import {inject, reactive, watch} from "vue";

export default {
  props: {
    cuentas: Array
  },
  setup() {
    const state = inject('store');
    let saved = reactive([])
    watch(()=>state.state.memory,
        () => {
          saved.length = 0
          saved.push(state.state.memory);
        },
        {deep:true}
    )
      return {
      saved
    }
  },
  mounted() {
    M.AutoInit()
  }
}
</script>

<style scoped>

.memory {
  display: inline-block;
  width: 200px;
  height: 615px;
  margin: 10px;
  background-color: rgb(175, 175, 175);
  border: 3px solid black;
  text-align: center;
  padding: 3px;
  font-size: 25px;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.elementos-memoria {
  font-size: 15px;
  border-bottom: 1px solid rgb(125, 125, 125);
}

</style>