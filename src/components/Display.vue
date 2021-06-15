<template>
  <div class="display" >{{display}}</div>
</template>

<script>
export default {
  name: "Display",
  props: {
    display : String
  }
}
</script>

<style scoped>
.display {
  margin: 4px 4px 4px 4px;
  display: block;
  background-color: rgb(175, 175, 175);
  height: 100px;
  width: 400px;
  border: 3px solid black;
  font-size: 40px;
  padding: 3px;
  max-width: 400px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>