<template>
  <h1>Consulta de Habilitación Vehicular:</h1>
  <form @submit.prevent="searchHabilitation">
      <fieldset>
        <legend>Tipo de Búsqueda:</legend>
        <div class="form-control">
          <label>
              <input 
              type="radio" 
              name="rbValue" 
              value="nroPlaca" 
              v-model="rbValue"> 
              Nro. de Placa Vehicular
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
        <p v-if="isLoading">Realizando el proceso de validación de Placa...</p>
        <p v-else-if="!isLoading && (!results || results.length === 0)" style="color: red">.:No existe habilitaciones asociadas:.</p>
        <div v-else>
          <table style="overflow-x:auto;">
            <tr>
              <th>Nro de Placa</th>
              <th>Categ.</th>
              <th>Marca</th>
              <th>Año Fab.</th>
              <th>Fecha inicio Hab.</th>
              <th>Fecha fin Hab.</th>
              <th>Resolución de Hab/Baja.</th>
              <th>Fecha de Hab/Baja.</th>
              <th>Nro de Cert/Tarj.</th>
              <th>Procedimiento</th>
              <th>Empresa Asociada.</th>
              <th>Ruta.</th>
              <th>Entidad de Autorización</th>
            </tr>
            <tr v-for="item in results" :key="item.id">
              <td>{{ item.numero_placa_vigente }}</td>
              <td>{{ item.categoria }}</td>
              <td>{{ item.marca_comercial }}</td>
              <td>{{ item.anio_fabricacion }}</td>
              <td>{{ item.fecha_inicio_hab }}</td>
              <td>{{ item.fecha_fin_hab }}</td>
              <td>{{ item.tipo_res+' N° '+item.numero_res+'-'+item.anio }}</td>
              <td>{{ item.fecha_emision }}</td>
              <td>{{ item.numero }}</td>
              <td>
                <div v-if="item.tipo_procedimiento_id === 1">INCREMENTO</div>
                <div v-if="item.tipo_procedimiento_id === 2"> BAJA VEHICULAR</div>
              </td>
              <td>{{ item.razon_social }}</td>
              <td>{{ item.ruta_autorizada }}</td>
              <td>{{ item.nombre_sede }}</td>
            </tr>
          </table>
        </div>
    </fieldset>
  </form>
</template>

<script>
export default ({
  data() {
    return {
      rbValue: 'nroPlaca',
      valueSearch: null,
      errorsInput: [],
      results: [],
      isLoading: false,
      errorQuery: null
    }
  },
  methods: {
    searchHabilitation() {
      this.results = [];
      if (this.rbValue === 'nroPlaca') {
        if (!this.valueSearch) {
          this.errorsInput.push('Ingresa el número de Placa.');
        } else if (!this.validarNroPlaca(this.valueSearch)) {
          this.errorsInput.push('Ingrese un número de Placa válido => BAG-123.');
        } else {
          this.errorsInput = [];
          this.isLoading = true;
          this.errorQuery = null;
          fetch('https://transporteregionalyprovincial.appsdrtca.com/api/ConsultaPlacaVehiculo/'+ this.valueSearch)
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
              })
              .then(data => {
                this.isLoading = false;
                this.results = data;
                console.log(this.results);
              })
                .catch((error) => {
                console.log(error);
                this.isLoading = false;
                this.errorQuery = 'No se han podido obtener los datos, inténtalo de nuevo más tarde.';
              });
            }
          }
      },

    validarNroPlaca: function (nroPaca) {
      var re = /^\w{3}[-]\d{3}$/;
      return re.test(nroPaca);
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

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>