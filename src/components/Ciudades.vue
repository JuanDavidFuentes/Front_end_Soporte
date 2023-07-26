<template>
    <v-container fluid>
        <v-row v-if="this.$store.state.token === ''">
            <v-col cols="12" class="mb-16 box2">
                <v-row>
                    <v-col cols="12" class="d-flex justify-center">
                        <img height="450"
                            src="https://cdn.dribbble.com/users/272763/screenshots/4576659/media/e7b35df88e9ab2a2ec158aaad703a7e9.gif" />
                    </v-col>
                </v-row>
                <center style="margin: 5vw;">
                    <h1 style="    color: var(--border); font-size: 2em;">Su sesión a caducado porfavor inicie sesión
                        nuevamente!</h1>
                    <p>
                        <v-btn rounded color="black" @click="volver()" dark>Iniciar sesión</v-btn>
                    </p>
                </center>
            </v-col>
        </v-row>
        <div v-else>
            <v-row class="mt-16 mb-16">
                <v-col cols="12">
                    <template>
                        <v-card>
                            <template>
                                <v-card>
                                    <v-card-title>
                                        Ciudades
                                        <v-spacer></v-spacer>
                                        <div>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon color="green" rounded v-bind="attrs" v-on="on"
                                                        @click="dialog2 = true">
                                                        mdi-plus-circle
                                                    </v-icon>
                                                    Añadir ciudad
                                                </template>
                                                <span>Añadir Ciudad</span>
                                            </v-tooltip>
                                        </div>
                                        <v-spacer></v-spacer>
                                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar ciudad"
                                            single-line hide-details>
                                        </v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headers" :items="ciudades" :search="search"></v-data-table>
                                </v-card>
                            </template>
                        </v-card>
                    </template>
                </v-col>
            </v-row>
            <!--Dialog agregar ciudades-->
            <v-dialog v-model="dialog2" persistent max-width="1000px">
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-row class="mt-5">
                                <v-col cols="12" class="mt-n7">
                                    <v-text-field label="Nombre del departamento*" v-model="departamento" rounded filled
                                        dense required></v-text-field>
                                </v-col>
                                <v-col cols="12" class="mt-n7">
                                    <v-text-field label="Código del departamento*" v-model="codigodep" rounded filled dense
                                        type="number" required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" class="mt-n7">
                                    <v-text-field label="Nombre de la ciudad*" v-model="ciudad" rounded filled dense
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" class="mt-n7">
                                    <v-text-field label="Código de la ciudad*" v-model="codCiudad" type="number" rounded
                                        filled dense required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small class="green--text">* indica campo requerido</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" rounded text @click="dialog2 = false">
                            Cancelar
                        </v-btn>
                        <v-btn color="green darken-1" rounded text @click="crearciudad()">
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</template>
      
<script>
import axios from 'axios';
export default {
    name: 'AggCiudad',
    data: () => ({
        ciudades: [],
        departamento: "",
        codigodep: "",
        ciudad: "",
        codCiudad: "",
        search: '',
        dialog2: false,
        headers: [
            {
                text: 'Código Departamento',
                align: 'start',
                value: "coddepartamento",
            },
            {
                text: 'Departamento',
                align: 'start',
                sortable: false,
                value: 'departamento',
            },
            {
                text: 'Código Ciudad',
                align: 'start',
                value: 'codciudad',
            },
            {
                text: 'Ciudad',
                align: 'start',
                sortable: false,
                value: 'ciudad',
            },
        ],
    }),
    methods: {
        listar() {
            axios.get(`/ciudades/CiudadDepartamento`)
                .then((response) => {
                    this.ciudades = response.data.ciudad
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        crearciudad() {
            let header = { headers: { "token": this.$store.state.token } };
            axios.post(`/ciudades/`, {
                coddepartamento: this.codigodep,
                departamento: this.departamento.toUpperCase(),
                ciudad: this.ciudad.toUpperCase(),
                codciudad: this.codCiudad
            }, header)
                .then((response) => {
                    console.log(response);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Ciudad creada exitosamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.dialog2 = false
                    this.listar()
                })
                .catch((error) => {
                    if (error.response.data.msg === "No hay token en la peticion") {
                        this.$swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Iniciado sesión nuevamente",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    } else {
                        this.$swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: error.response.data.errores.errors[0].msg,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }

                });
        },
        volver() {
            this.$router.push("/")
        }
    },
    created() {
        this.listar();
    }
}


</script>