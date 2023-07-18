<template>
  <v-container class="fill-height" fluid>
     <v-row align="center" justify="center">
        <v-col cols="12">
           <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                 <v-card class="elevation-12">
                    <v-toolbar dark color="#000000">
                       <v-toolbar-title>Inicio de sesion</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                       <v-form>
                          <v-text-field v-model="email"  label="Email" type="text" rounded dense filled></v-text-field>
                          <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                             :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'"
                             hint="Al menos 8 carácteres" @click:append="show = !show" rounded dense
                             filled></v-text-field>
                       </v-form>
                    </v-card-text>
                    <v-card-actions>
                       <v-spacer></v-spacer>
                       <v-btn color="#000000" @click=login() dark>Iniciar sesión</v-btn>
                    </v-card-actions>
                 </v-card>
              </v-flex>
           </v-layout>
        </v-col>
     </v-row>
  </v-container>
</template>

<script>
import axios from "axios"
export default {
  name: 'PageLogin',

  data: () => ({
     email: "",
     password: "",
     valido: "",
     err: "",
     show: false,
     contra: "",
     rules: {
        required: value => !!value || 'Requerido',
        min: v => v.length >= 8 || 'Minimo 8 caracteres',
        emailMatch: () => (`El correo electrónico y la contraseña que ingresó no coinciden`),
     },
  }),
  methods: {
     login() {
        this.valido = this.email.toUpperCase();
        axios.post("/usuarios/login", {
           email: this.valido,
           password: this.password
        })
           .then(response => {
              console.log(response.data);
              this.$store.dispatch("setToken", response.data.token);
              this.$store.dispatch("setDatos", response.data.usuario);
              this.$router.push("/inicio")
              // localStorage.setItem("datos",JSON.stringify(response.data.usuario))
           })
           .catch(error => {
              if (error.response.data.errores) {
                 this.$swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: error.response.data.errores.errors[0].msg,
                    showConfirmButton: false,
                    timer: 1500
                 })
              } else {
                 this.$swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: error.response.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                 })
              }
              console.log(error);
           })
     },
     resgistro() {
        this.$router.push("/registro")
     }
  }
}
</script>
