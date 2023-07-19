<template>
    <v-container>
        <v-row class="mt-16 mb-16">
            <v-col cols="12">
                <template>
                    <v-card>
                        <template>
                            <v-card>
                                <v-card-title>
                                    Empresas
                                    <v-spacer></v-spacer>
                                    <div>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon color="green" rounded v-bind="attrs" v-on="on"
                                                    @click="dialog2 = true">
                                                    mdi-plus-circle
                                                </v-icon>
                                                Añadir una empresa
                                            </template>
                                            <span>Añadir Empresa</span>
                                        </v-tooltip>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar empresa"
                                        single-line hide-details>
                                    </v-text-field>
                                </v-card-title>
                                <v-data-table :headers="headers" :items="empresas" :search="search">
                                    <template v-slot:[`item.estado`]="{ item }">
                                        <span class="green--text" v-if="item.estado === 1"> Activo</span>
                                        <span class="red--text" v-else>Inactivo</span>
                                    </template>
                                    <template v-slot:[`item.opciones`]="{ item }">
                                        <span v-if="item.estado === 1">
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon color="red" rounded v-bind="attrs" v-on="on"
                                                        @click="desactivar(item._id)">
                                                        mdi-shield-off
                                                    </v-icon>
                                                </template>
                                                <span>Inactivar</span>
                                            </v-tooltip>
                                        </span>
                                        <span v-else>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon color="success" rounded v-bind="attrs" v-on="on"
                                                        @click="activar(item._id)">
                                                        mdi-shield-check-outline
                                                    </v-icon>
                                                </template>
                                                <span>Activar</span>
                                            </v-tooltip>
                                        </span>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </template>
                    </v-card>
                </template>
            </v-col>
        </v-row>
        <!--Dialog agregar empresas-->
        <v-dialog v-model="dialog2" persistent max-width="1000px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row class="mt-5">
                            <v-col cols="12">
                                <v-text-field label="Nombre de la empresa de envios*" v-model="nombre" rounded filled dense
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="mt-n7">
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" rounded text @click="dialog2 = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" rounded text @click="crearEmpresa()">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    name: 'PageEmpresas',
    data() {
        return {
            search: '',
            dialog2: false,
            empresas: [],
            nombre: "",
            headers: [
                {
                    text: 'Empresas',
                    align: 'start',
                    value: "nombre",
                },
                {
                    text: 'Estado',
                    align: 'start',
                    value: "estado",
                },
                {
                    text: 'Opciones',
                    align: 'start',
                    value: 'opciones',
                },
            ],
        }
    },
    methods: {
        listar() {
            axios.get(`/empresas`)
                .then((response) => {
                    this.empresas = response.data
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        crearEmpresa() {
            let header = { headers: { "token": this.$store.state.token } };
            axios.post(`/empresas/`, {
                nombre: this.nombre
            }, header)
                .then((response) => {
                    console.log(response);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Empresa creada exitosamente",
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
        desactivar(id) {
            let header = { headers: { token: this.$store.state.token } };
            axios
                .put(`/empresas/desactivar/${id}`, {}, header)
                .then((response) => {
                    console.log(response);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Empresa desactivada exitosamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.listar();
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
        activar(id) {
            let header = { headers: { token: this.$store.state.token } };
            axios
                .put(`/empresas/activar/${id}`, {}, header)
                .then((response) => {
                    console.log(response);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Empresa activada exitosamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.listar();
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
    },
    created() {
        this.listar()
    }
}
</script>