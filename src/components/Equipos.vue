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
        <v-row v-else class="mt-16 mb-16">
            <v-col cols="12">
                <template>
                    <v-card>
                        <template>
                            <v-card>
                                <v-card-title>
                                    Equipos
                                    <v-spacer></v-spacer>
                                    <div>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon color="green" rounded v-bind="attrs" v-on="on"
                                                    @click="dialog2 = true">
                                                    mdi-plus-circle
                                                </v-icon>
                                                Añadir equipo
                                            </template>
                                            <span>Añadir equipo</span>
                                        </v-tooltip>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar equipo"
                                        single-line hide-details>
                                    </v-text-field>
                                </v-card-title>
                                <v-data-table :headers="headers" :items="equipos" :search="search">
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
                                        <span>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon color="blue" rounded v-bind="attrs" v-on="on"
                                                        @click="tomarDatos(item)">
                                                        mdi-pencil
                                                    </v-icon>
                                                </template>
                                                <span>Editar</span>
                                            </v-tooltip>
                                        </span>
                                    </template>
                                    <template v-slot:[`item.estadom`]="{ item }">
                                        <span class="green--text" v-if="item.estadoMaquina === 1"> En buen estado</span>
                                        <span class="red--text" v-else>En mal estado</span>
                                    </template>

                                </v-data-table>
                            </v-card>
                        </template>
                    </v-card>
                </template>
            </v-col>
        </v-row>
        <!--Dialog agregar equipos-->
        <v-dialog v-model="dialog2" persistent max-width="1000px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row class="mt-5">
                            <v-col cols="12" class="mt-n7">
                                <v-text-field label="Nombre del equipo*"
                                    hint="Ejemplo: 'Impresora SAT, Huellero, Android, Spectra, etc...'" v-model="nombre"
                                    rounded filled dense required></v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n7">
                                <v-text-field label="Serial*" v-model="serial" rounded filled dense type="number" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n7">
                                <v-text-field label="Af*" v-model="af" rounded filled dense required></v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n7">
                                <h3>Estado del equipo</h3>
                                <hr>
                                <v-radio-group v-model="estadoMaquina" row>
                                    <v-radio color="green" label="En buen estado" value="1"></v-radio>
                                    <v-radio color="red" label="En mal estado" value="0"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small class="green--text">* indica campo requerido</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" rounded text @click="cancelar()">
                        Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" rounded text @click="crearEquipo()">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--Dialog editar equipos-->
        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row class="mt-5">
                            <v-col cols="12" class="mt-n7">
                                <v-text-field label="Nombre del equipo*"
                                    hint="Ejemplo: 'Impresora SAT, Huellero, Android, Spectra, etc...'" v-model="nombre"
                                    rounded filled dense required></v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n7">
                                <v-text-field label="Serial*" v-model="serial" rounded filled dense type="number" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n7">
                                <v-text-field label="Af*" v-model="af" rounded filled dense required></v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n7">
                                <h3>Estado del equipo</h3>
                                <hr>
                                <v-radio-group v-model="estadoMaquina" row>
                                    <v-radio color="green" label="En buen estado" value="1"></v-radio>
                                    <v-radio color="red" label="En mal estado" value="0"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small class="green--text">* indica campo requerido</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" rounded text @click="cancelar()">
                        Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" rounded text @click="editar()">
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
    name: 'PageEquipos',
    data() {
        return {
            search: '',
            dialog2: false,
            dialog: false,
            nombre: '',
            serial: '',
            af: '',
            estadoMaquina: "1",
            equipos: [],
            headers: [
                {
                    text: 'Nombre',
                    align: 'start',
                    value: "nombre",
                },
                {
                    text: 'Serial',
                    align: 'start',
                    value: "serial",
                },
                {
                    text: 'AF',
                    align: 'start',
                    value: 'af',
                },
                {
                    text: 'Estado',
                    align: 'start',
                    value: 'estado',
                },
                {
                    text: 'Estado de maquina',
                    align: 'start',
                    value: 'estadom',
                },
                {
                    text: 'Opciones',
                    align: 'start',
                    value: 'opciones',
                }
            ],
        }
    },
    methods: {
        listar() {
            axios.get(`/maquinas`)
                .then((response) => {
                    this.equipos = response.data
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        crearEquipo() {
            let header = { headers: { "token": this.$store.state.token } };
            axios.post(`/maquinas/`, {
                nombre: this.nombre,
                serial: this.serial,
                af: this.af,
                estadoMaquina: this.estadoMaquina,
            }, header)
                .then((response) => {
                    console.log(response);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Equipo creado exitosamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.dialog2 = false
                    this.nombre = ""
                    this.serial = ""
                    this.af = ""
                    this.estadoMaquina = "1"
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
        tomarDatos(item) {
            this.dialog = true;
            this.id = item._id;
            this.nombre = item.nombre;
            this.serial = item.serial;
            this.af = item.af;
            this.estadoMaquina = item.estadoMaquina.toString();
        },
        editar() {
            let header = { headers: { "token": this.$store.state.token } }
            axios.put(`/maquinas/${this.id}`, {
                nombre: this.nombre,
                serial: this.serial,
                af: this.af,
                estadoMaquina: this.estadoMaquina,
            }, header)
                .then((response) => {
                    console.log(response);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Datos Del Equipo actualizados correctamente",
                        showConfirmButton: false,
                        timer: 2200,
                    });
                    this.dialog = false
                    this.nombre = ""
                    this.serial = ""
                    this.af = ""
                    this.estadoMaquina = "1"
                    this.listar()
                })
                .catch((error) => {
                    console.log(error);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: error.response.data.errores.errors[0].msg,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                });
        },
        cancelar() {
            this.nombre = ""
            this.serial = ""
            this.af = ""
            this.estadoMaquina = "1"
            this.dialog = false;
            this.dialog2 = false;
        },
        desactivar(id) {
            let header = { headers: { token: this.$store.state.token } };
            axios
                .put(`/maquinas/desactivar/${id}`, {}, header)
                .then((response) => {
                    console.log(response);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Equipo desactivado exitosamente",
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
                .put(`/maquinas/activar/${id}`, {}, header)
                .then((response) => {
                    console.log(response);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Equipo activado exitosamente",
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
        volver() {
            this.$router.push("/")
        }
    },
    created() {
        this.listar();
    }
}
</script>