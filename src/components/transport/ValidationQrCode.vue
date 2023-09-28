<template>
    <h1>Validación de Habilitación Vehicular</h1>
    <p v-if="isLoading">Realizando el proceso de validacion del Certificado...</p>
    <p v-else-if="!isLoading && error">
      {{ error }}
    </p>
    <p v-else-if="!isLoading && (!results || results.length === 0)" style="color: red">.:No es posible comprobar la autenticidad del certificado:.</p>
    <ul v-else id="habilitation">
      <li v-for="item in results" :key="item.id">
        <h2>Nro: {{ item.numero_cert }}</h2>

        <h4>Entidad de Autorización</h4>
          <p>{{ item.nombre_sede }}</p>

        <h4>Número de Ruc Transportista</h4>
          <p>{{ item.num_ruc }}</p>

        <h4>Razón Social Transportista</h4>
          <span>{{ item.razon_social }}</span>

        <h4>Ruta Autorizada</h4>
          <span>{{ item.ruta_autorizada }}</span>

        <h4>Rango de Habilitación</h4>
          <span>{{ formatDate(item.fecha_inicio_hab) }} - {{ formatDate(item.fecha_fin_hab) }}</span>

        <h4 v-if="status == 2">Estado Habilitación</h4>
          <span id="status" v-if="status == 2">DADO DE BAJA</span>

        <h4>Resolución de Habilitación</h4>
          <span>{{ item.tipo_res }} Nro {{ item.numero_res }}-{{ item.anio }}-{{ item.siglas }} [{{ item.fecha_emision }}]</span>

        <h4>Nro de Placa Vehicular</h4>
          <span>{{ item.numero_placa_vigente }}</span>

        <h4>Marca y Modelo</h4>
          <span>[{{ item.marca_comercial }}] [{{ item.modelo }}]</span>

        <h4>Año Fabricación y Año Modelo</h4>
          <span>[{{ item.anio_fabricacion }}] [{{ item.anio_modelo }}]</span>

        <h4>Número de Chasis</h4>
          <span>{{ item.numero_chasis }}</span>

        <h4>Número de Vin</h4>
          <span>{{ item.vin }}</span>

        <h4>Nro de asientos - Nro pasajeros</h4>
          <span>[{{ item.numero_asientos }}] [{{ item.numero_pasajeros }}]</span>
      </li>
    </ul>
</template>

<script>
export default {
  data() {
    return {
      results: [],
      isLoading: false,
      error: null,
      status: ''
    }
  },
  methods: {
    formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(
        "es-PE", 
        {
          calendar: "gregory",
          numberingSystem: "latn",
          day: "numeric",
          month: "numeric",
          year: "numeric",
          timeZone: "Atlantic/Canary",
        }).format(date);
    }
  },
  created() {
    this.isLoading = true;
    this.error = null;
    //fetch('http://127.0.0.1:8000/api/validar-codigo-qr/' + this.$route.query.code).
    fetch('https://transporteregionalyprovincial.appsdrtca.com/api/validar-codigo-qr/' + this.$route.query.code).
    then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => {
      this.isLoading = false;
      this.results = data;
      this.status = data[0]['tipo_procedimiento_id'];
      console.log(this.results);
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

#habilitation {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}
#habilitation h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #2389ff;
  margin: 0 0 1rem 0;
}
#habilitation h4 {
  border: 1px solid #a19e9e;
  background-color: #bcbcbc;
  color: white;
  padding: 0.5rem;
  border-radius: 25px;
}
#status {
  border: 1px solid #f84747;
  background-color: #f84747;
  color: white;
  padding: 0.5rem;
  border-radius: 25px
}

</style>
