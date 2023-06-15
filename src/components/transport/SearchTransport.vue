<template>
  <h1>Consulta de Habilitación Vehicular:</h1>
  <form @submit.prevent="searchHabilitation">
      <fieldset>
        <legend>Tipo de Busqueda:</legend>
        <div class="form-control">
          <label>
              <input 
              type="radio" 
              name="rbValue" 
              value="nroPlaca" 
              v-model="rbValue"> 
              Nro. de Placa Vehicular
          </label>
          <label>
              <input 
              type="radio" 
              name="rbValue" 
              value="nroRuc" 
              v-model="rbValue"> 
              Nro. de Ruc de Transportista
          </label>
          <label>
              <input 
              type="radio" 
              name="rbValue" 
              value="nroCert" 
              v-model="rbValue"> 
              Nro de Certificado
          </label>
        </div>
        <div class="form-control">
          <p v-if="valueSearchValidity === 'invalid'">Ingresa el dato a buscar</p>
          <input type="text" id="value-search" name="value-search" v-model.trim="valueSearch" />
          <p v-if="errorsInput.length">
            <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
            <ul>
              <li v-for="error in errorsInput" :key="error">{{ error }}</li>
            </ul>
          </p>
        </div>
        <div>
          <base-button>BUSCAR</base-button>
        </div>
        <div>
          <query-result
            v-for="result in results"
            :key="result.id"
            :name="result.numero"
            :rating="result.fecha_expedicion">
          </query-result>
        </div>
    </fieldset>
  </form>
</template>

<script>
import QueryResult from './QueryResults.vue';
export default ({
  components: {
    QueryResult,
  },
  data() {
    return {
      rbValue: 'nroPlaca',
      valueSearch: null,
      errorsInput: [],
      results: [],
    }
  },
  methods: {
    searchHabilitation() {
      this.errorsInput = [];

      if (this.rbValue === 'nroPlaca') {
        if (!this.valueSearch) {
          this.errorsInput.push('Ingresa el número de Placa.');
        } else if (!this.validarNroPlaca(this.valueSearch)) {
          this.errorsInput.push('Ingrese un número de Placa válido => BAG-123.');
        }
      } else if (this.rbValue === 'nroRuc'){
        if (!this.valueSearch) {
          this.errorsInput.push('Ingresa el número de Ruc.');
        } else if (!this.validarNroRuc(this.valueSearch)) {
          this.errorsInput.push('Ingrese un número de Ruc válido (11 dígitos numéricos).');
        }
      } else {
        if (!this.valueSearch) {
          this.errorsInput.push('Ingresa el número de Certificado de Hab. Vehicular.');
        } else if (!this.validarNroCertificado(this.valueSearch)) {
          this.errorsInput.push('Ingrese un número de Certficado válido => 001449.');
        }
      }

      fetch(' http://127.0.0.1:8000/api/validar-codigo-qr/727b8bcb8480fa51c3ed6fb1cbcebb')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          this.results = data;
        })
      },

    validarNroPlaca: function (nroPaca) {
      var re = /^\w{3}[-]\d{3}$/;
      return re.test(nroPaca);
    },
    validarNroRuc: function (nroRuc) {
      var re = /^\d{11}$/;
      return re.test(nroRuc);
    },
    validarNroCertificado: function (nroCert) {
      var re = /^\d{6}$/;
      return re.test(nroCert);
    },
  }
})
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

fieldset {
  border-radius: 8px;
}

.form-control.invalid input[type="radio"] {
  border-color: red;
}

li {
  color: red;
}

.form-control.invalid p {
  color: red;
}
</style>