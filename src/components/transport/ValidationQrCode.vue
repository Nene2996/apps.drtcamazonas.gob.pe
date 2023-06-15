<template>
    <h1>Validación de Certificado de Habilitación Vehicular</h1>
    <!--<h2>{{ this.$route.query }}</h2>-->
    <p v-if="isLoading">Realizando el proceso de validacion del Certificado...</p>
    <p v-else-if="!isLoading && error">
      {{ error }}
    </p>
    <p v-else-if="!isLoading && (!results || results.length === 0)" style="color: red">.:No es posible comprobar la autenticidad del certificado:.</p>
    <ul v-else>
      <li v-for="item in results" :key="item.id">
        <h2>{{ item.numero }}</h2>
        <h4>Número de Ruc Transportista</h4><span>{{ item.num_ruc }}</span>
        <h4>Razón Social Transportista</h4><span>{{ item.razon_social }}</span>
        <h4>Ruta Autorizada</h4><span>{{ item.ruta_autorizada }}</span>
        <h4>Rango de Habilitación</h4><span>[{{ item.fecha_inicio_hab }}] [{{ item.fecha_fin_hab }}]</span>
        <h4>Nro de Placa Vehicular</h4><span>{{ item.numero_placa_vigente }}</span>
        <h4>Marca y Modelo</h4><span>[{{ item.marca_comercial }}] [{{ item.modelo }}]</span>
        <h4>Año Fabricación y Año Modelo</h4><span>[{{ item.anio_fabricacion }}] [{{ item.anio_modelo }}]</span>
        <h4>Número de Chasis</h4><span>{{ item.numero_chasis }}</span>
        <h4>Número de Vin</h4><span>{{ item.vin }}</span>
        <h4>Nro de asientos - Nro pasajeros</h4><span>[{{ item.numero_asientos }}] [{{ item.numero_pasajeros }}]</span>
      </li>
    </ul>
</template>

<script>
export default {
  data() {
    return {
      results: [],
      isLoading: false,
      error: null
    }
  },
  created() {
    this.isLoading = true;
    this.error = null;
    fetch('http://127.0.0.1:8000/api/validar-codigo-qr/' + this.$route.query.code).
    then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => {
      this.isLoading = false;
      this.results = data;
    })
    .catch((error) => {
      console.log(error);
      this.isLoading = false;
      this.error = 'No se han podido obtener los datos, inténtalo de nuevo más tarde.';
    });
  },
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border-radius: 1rem;
  border: 2px solid #ccc;
  padding: 1rem;
}

</style>
