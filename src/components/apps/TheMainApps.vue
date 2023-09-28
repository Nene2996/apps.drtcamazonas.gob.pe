<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <section v-if="activeItems" id="controls">
      <router-link to="/transporte-terrestre-interprovincial">HABILITACIONES VEHICULARES</router-link>
    </section>
    
      <main>
        <router-view></router-view>
      </main>
    
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  data() {
    return {
      code: '',
      activeItems: true
    };
  },
  computed: {
    teamMembersLink() {
      return { 
        name: 'validateQr', 
        query: { code: this.code},
      };
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

a {
  text-decoration: none;
  border: 1px solid #279664;
  background-color: #279664;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin: 1rem;
  width: 12rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

a:focus {
  outline: none;
}

a:hover,
a:active {
  background-color: #33c784;
  border-color: #42b983;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}

a:disabled {
  background-color: #ccc;
  border-color: #ccc;
  box-shadow: none;
  color: #3f3f3f;
  cursor: not-allowed;
}
</style>
