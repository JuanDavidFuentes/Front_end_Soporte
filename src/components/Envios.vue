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
                                    Envíos
                                    <v-spacer></v-spacer>
                                    <div>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon color="green" rounded v-bind="attrs" v-on="on"
                                                    @click="dialog2 = true">
                                                    mdi-plus-circle
                                                </v-icon>
                                                Añadir envío
                                            </template>
                                            <span>Añadir envío</span>
                                        </v-tooltip>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar envío"
                                        single-line hide-details>
                                    </v-text-field>
                                </v-card-title>
                                <v-data-table :headers="headers" :items="envios" :search="search">
                                    <template v-slot:[`item.img`]="{ item }">
                                        <v-img  max-height="200" max-width="100"
                                            :src= item.imgGuia ></v-img>
                                    </template>
                                    <template v-slot:[`item.estado`]="{ item }">
                                        <span class="red--text" v-if="item.estado === 1"> Enviado</span>
                                        <span class="green--text" v-else>Recibido</span>
                                    </template>
                                    <template v-slot:[`item.opciones`]="{ item }">
                                        <span v-if="item.estado === 1">
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon color="green" rounded v-bind="attrs" v-on="on"
                                                        @click="desactivar(item._id)">
                                                        mdi-check-circle
                                                    </v-icon>
                                                </template>
                                                <span>Marcar como <span class="red--text">"Recibido"</span></span>
                                            </v-tooltip>
                                        </span>
                                        <span v-else>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon color="success" rounded v-bind="attrs" v-on="on"
                                                        @click="activar(item._id)">
                                                        mdi-close-circle
                                                    </v-icon>
                                                </template>
                                                <span>Marcar como <span class="green--text">"Recibido"</span></span>
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
                                </v-data-table>
                            </v-card>
                        </template>
                    </v-card>
                </template>
            </v-col>
        </v-row>
        <!--Dialog crear Envios-->
        <v-dialog v-model="dialog2" persistent max-width="1500px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row class="mt-5">
                            <v-col cols="12" sm="6">
                                <v-btn v-if="variante === 1" block rounded large dark elevation="10" color="black"
                                    @click="dialog = true">
                                    Agregar equipo
                                </v-btn>
                                <div v-else>
                                    <v-row class="mt-1">
                                        <v-col cols="12" sm="2" class="text-center"><v-icon color="red" rounded
                                                @click="desagregar()">
                                                mdi-close-circle
                                            </v-icon></v-col>
                                        <v-col cols="12" sm="10" class="text-center">
                                            <h2>{{ nombre }}</h2>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-autocomplete v-model="seleccionadoCiudad" :items="municipio" item-text="ciudad"
                                    item-value="_id" filled rounded dense label="Ciudad">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" class="mt-n7">
                                <v-autocomplete v-model="seleccionadoEmpresa" :items="empresas" item-text="nombre"
                                    item-value="_id" filled rounded dense label="Nombre">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" class="mt-n7">
                                <v-text-field label="Numero de guía*" v-model="numeroGuia" rounded filled dense
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n7">
                                <v-textarea label="Motivo de envío*" v-model="motivoEnvio" rounded filled dense auto-grow
                                    rows="1" row-height="15" required></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small class="green--text">* indica campo requerido</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" rounded text @click="cancelarEnvio()">
                        Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" rounded text @click="crearEnvio()">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--Dialog editar Envios-->
        <v-dialog v-model="dialog5" persistent max-width="1500px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row class="mt-5">
                            <v-col cols="12" sm="6">
                                <v-btn v-if="variante === 1" block rounded large dark elevation="10" color="black"
                                    @click="dialog = true">
                                    Agregar equipo
                                </v-btn>
                                <div v-else>
                                    <v-row class="mt-1">
                                        <v-col cols="12" sm="2" class="text-center"><v-icon color="red" rounded
                                                @click="desagregar()">
                                                mdi-close-circle
                                            </v-icon></v-col>
                                        <v-col cols="12" sm="10" class="text-center">
                                            <h2>{{ nombre }}</h2>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-autocomplete v-model="seleccionadoCiudad" :items="municipio" item-text="ciudad"
                                    item-value="_id" filled rounded dense label="Ciudad">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" class="mt-n7">
                                <v-autocomplete v-model="seleccionadoEmpresa" :items="empresas" item-text="nombre"
                                    item-value="_id" filled rounded dense label="Nombre">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" class="mt-n7">
                                <v-text-field label="Numero de guía*" v-model="numeroGuia" rounded filled dense
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n7">
                                <v-textarea label="Motivo de envío*" v-model="motivoEnvio" rounded filled dense auto-grow
                                    rows="1" row-height="15" required></v-textarea>
                            </v-col>
                            <v-col cols="12" class="mt-n7">
                                <v-btn block rounded large dark elevation="10" color="black" @click="editarIMG()">
                                    Editar imagen de la guía
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small class="green--text">* indica campo requerido</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" rounded text @click="cancelarEditar()">
                        Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" rounded text @click="editar()">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--IMG-->
        <v-dialog v-model="dialog4" persistent max-width="1000px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <h2 v-if="imgVariante === 1">¿Quieres agregar la imagen de la guía?</h2>
                        <h2 v-else>¿Quieres editar la imagen de la guía?</h2>
                        <v-col cols="12">
                            <div class="container-input">
                                <input type="file" name="file-5" id="file-5" @change="subir" class="inputfile inputfile-5"
                                    data-multiple-caption="{count} archivos seleccionados" multiple />
                                <label for="file-5">
                                    <figure>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="iborrainputfile" width="20"
                                            height="17" viewBox="0 0 20 17">
                                            <path
                                                d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z">
                                            </path>
                                        </svg>
                                    </figure>
                                    <span class="iborrainputfile">{{ imgGuia.name }}</span>
                                </label>
                            </div>
                        </v-col>
                    </v-container>
                </v-card-text>
                <v-card-actions class="mt-n8">
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" rounded text @click="dialog4 = false, imgVariante = 1">
                        Cancelar
                    </v-btn>
                    <v-btn v-if="imgVariante === 1" color="green darken-1" rounded text @click="guardarIMG()">
                        Guardar imagen
                    </v-btn>
                    <v-btn v-else color="green darken-1" rounded text @click="guardarIMG()">
                        Editar imagen
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--Dialogs de equipos-->
        <v-dialog v-model="dialog" class="mt-2" max-width="1000px">
            <v-card>
                <template>
                    <v-card>
                        <v-card-title>
                            Seleccione un equipo
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar equipo" single-line
                                hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headers2" :items="equipos" :search="search">
                            <template v-slot:[`item.estado`]="{ item }">
                                <span class="green--text" v-if="item.estado === 1"> Activo</span>
                                <span class="red--text" v-else>Inactivo</span>
                            </template>
                            <template v-slot:[`item.opciones`]="{ item }">
                                <span>
                                    <v-icon color="green" rounded @click="agregar(item._id, item.nombre)">
                                        mdi-plus-circle
                                    </v-icon>
                                </span>
                            </template>
                            <template v-slot:[`item.estadom`]="{ item }">
                                <span class="green--text" v-if="item.estadoMaquina === 1"> En buen estado</span>
                                <span class="red--text" v-else>En mal estado</span>
                            </template>
                        </v-data-table>
                    </v-card>
                </template>
                <div class="text-center mt-3">
                    <h2>¿ Desea crear un nuevo equipo ?</h2>
                </div>
                <v-card-actions>
                    <v-row style="margin:0">
                        <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="text-center">
                            <v-btn color="red" @click="dialog = false" rounded dark>
                                Cerrar
                            </v-btn>
                        </v-col>
                        <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="text-center">
                            <v-btn color="green" rounded dark @click="dialog3 = true">
                                Crear
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--Crear-->
        <v-dialog v-model="dialog3" persistent max-width="1000px">
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
                    <v-btn color="red darken-1" rounded text @click="cancelarEquipo()">
                        Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" rounded text @click="crearEquipo()">
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
    name: 'PageConfiguracion',
    data() {
        return {
            search: '',
            dialog: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            dialog5: false,
            //Envios
            id: '',
            envios: [],
            municipio: [],
            empresas: [],
            numeroGuia: '',
            motivoEnvio: '',
            imgGuia: '',
            idMaquina: '',
            seleccionadoCiudad: '',
            seleccionadoEmpresa: '',
            // Equipos
            equipos: [],
            nombre: '',
            serial: '',
            af: '',
            estadoMaquina: "1",
            variante: 1,
            imgVariante: 1,
            //headers
            //Envios
            headers: [
                {
                    text: 'Equipo',
                    align: 'start',
                    value: "idMaquina.nombre",
                },
                {
                    text: 'Ciudad',
                    align: 'start',
                    value: "ciudad.ciudad",
                },
                {
                    text: 'Empresa',
                    align: 'start',
                    value: 'empresa.nombre',
                },
                {
                    text: 'Numero de guía',
                    align: 'start',
                    value: 'numeroGuia',
                },
                {
                    text: 'Motivo del envío',
                    align: 'start',
                    value: 'motivoEnvio',
                },
                {
                    text: 'IMG-Guia',
                    align: 'start',
                    sortable: false,
                    value: 'img',
                },
                {
                    text: 'Estado',
                    align: 'start',
                    value: 'estado',
                },
                {
                    text: 'Opciones',
                    align: 'start',
                    sortable: false,
                    value: 'opciones',
                }
            ],
            //Equipos
            headers2: [
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
                    text: 'Seleccionar',
                    align: 'start',
                    value: 'opciones',
                },
            ],
        }
    },
    methods: {
        //Envios
        listar() {
            axios.get(`/envios`)
                .then((response) => {
                    this.envios = response.data
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        listarCiudad() {
            axios.get("/ciudades/CiudadDepartamento")
                .then(response => {
                    this.municipio = response.data.ciudad
                })
                .catch(error => {
                    console.log(error);
                })
        },
        changeState(valor) {
            this.selecionadoTipo = this.empresas[valor - 1];
            this.seleccionadoEmpresa = this.municipio[valor - 1];
        },
        crearEnvio() {
            let header = { headers: { "token": this.$store.state.token } };
            axios.post(`/envios/`, {
                idMaquina: this.idMaquina,
                ciudad: this.seleccionadoCiudad,
                empresa: this.seleccionadoEmpresa,
                numeroGuia: this.numeroGuia,
                motivoEnvio: this.motivoEnvio,
            }, header)
                .then((response) => {
                    console.log(response);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: response.data.msg,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                    this.id = response.data.envio._id
                    this.dialog2 = false
                    this.dialog4 = true
                    this.listar()
                    this.idMaquina = ""
                    this.seleccionadoCiudad = ""
                    this.seleccionadoEmpresa = ""
                    this.numeroGuia = ""
                    this.motivoEnvio = ""
                    this.variante = 1
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
        subir(e) {
            this.imgGuia = e.target.files[0]
            console.log(this.imgGuia);
        },
        guardarIMG() {
            console.log(this.imgGuia);
            if (this.imgGuia != undefined) {
                let fd = new FormData();
                fd.append("archivo", this.imgGuia);
                let header = { headers: { "token": this.$store.state.token } };
                console.log(fd);
                axios.put(`/envios/cargarCloud/${this.id}`,
                    fd, header)
                    .then(response => {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: "Imagen guardada con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.aparecer = 1
                        this.nombre = ""
                        this.descripcion = ""
                        this.dialog4 = false
                        this.imgVariante = 1
                        this.listar()
                        console.log(response.data.url);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Inserta la imagen de la guía!',
                })
            }
        },
        editarIMG() {
            this.dialog4 = true
            this.imgVariante = 2
        },
        cancelarEnvio() {
            this.dialog2 = false
            this.variante = 1
            this.idMaquina = ""
            this.seleccionadoCiudad = ""
            this.seleccionadoEmpresa = ""
            this.numeroGuia = ""
            this.motivoEnvio = ""
        },
        tomarDatos(item) {
            this.variante = 0
            this.nombre = item.idMaquina.nombre
            this.dialog5 = true
            this.id = item._id
            this.idMaquina = item.idMaquina._id
            this.seleccionadoCiudad = item.ciudad._id
            this.seleccionadoEmpresa = item.empresa._id
            this.numeroGuia = item.numeroGuia
            this.motivoEnvio = item.motivoEnvio
        },
        editar() {
            let header = { headers: { "token": this.$store.state.token } }
            axios.put(`/envios/${this.id}`, {
                idMaquina: this.idMaquina,
                ciudad: this.seleccionadoCiudad,
                empresa: this.seleccionadoEmpresa,
                numeroGuia: this.numeroGuia,
                motivoEnvio: this.motivoEnvio,
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
                    this.dialog5 = false
                    this.listar()
                    this.idMaquina = ""
                    this.seleccionadoCiudad = ""
                    this.seleccionadoEmpresa = ""
                    this.numeroGuia = ""
                    this.motivoEnvio = ""
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
        cancelarEditar() {
            this.dialog5 = false
            this.variante = 1
            this.id = ''
            this.idMaquina = ""
            this.seleccionadoCiudad = ""
            this.seleccionadoEmpresa = ""
            this.numeroGuia = ""
            this.motivoEnvio = ""
        },
        cancelarIMG() {

        },
        //Equipos
        listarEquipos() {
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
                    this.dialog3 = false
                    this.nombre = ""
                    this.serial = ""
                    this.af = ""
                    this.estadoMaquina = "1"
                    this.listarEquipos()
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
        cancelarEquipo() {
            this.nombre = ""
            this.serial = ""
            this.af = ""
            this.estadoMaquina = "1"
            this.dialog3 = false;
        },
        agregar(id, nombre) {
            this.variante = 0
            this.dialog = false;
            this.nombre = nombre
            this.idMaquina = id
        },
        desagregar() {
            this.variante = 1
            this.nombre = ""
            this.idMaquina = ""
        },
        //Empresas
        listarEmpresas() {
            axios.get(`/empresas`)
                .then((response) => {
                    this.empresas = response.data
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        volver() {
            this.$router.push("/")
        }
    },
    created() {
        this.listar();
        this.listarEquipos();
        this.listarCiudad();
        this.listarEmpresas();
    }
}
</script>
<style>
.container-input {
    text-align: center;
    background: #282828;
    border-top: 5px solid #c39f77;
    padding: 50px 0;
    border-radius: 6px;
    width: 50%;
    margin: 0 auto;
    margin-bottom: 20px;
}

.inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.inputfile+label {
    max-width: 80%;
    font-size: 1.25rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 0.625rem 1.25rem;
}

.inputfile+label svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    margin-right: 0.25em;
}

.iborrainputfile {
    font-size: 16px;
    font-weight: normal;
    font-family: 'Lato';
}

.inputfile-5+label {
    color: #c39f77;
}

.inputfile-5:focus+label,
.inputfile-5.has-focus+label,
.inputfile-5+label:hover {
    color: #9f8465;
}

.inputfile-5+label figure {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #c39f77;
    display: block;
    padding: 20px;
    margin: 0 auto 10px;
}

.inputfile-5:focus+label figure,
.inputfile-5.has-focus+label figure,
.inputfile-5+label:hover figure {
    background-color: #9f8465;
}

.inputfile-5+label svg {
    width: 100%;
    height: 100%;
    fill: #fff;
}
</style>