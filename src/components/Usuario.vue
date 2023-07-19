<template>
    <v-container fluid>
        <div>
            <div class="mt-16">
                <v-card>
                    <v-card-title>
                        <h3>Usuarios</h3>
                        <v-spacer></v-spacer>
                        <div>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="green" rounded v-bind="attrs" v-on="on" @click="dialog = true">
                                        mdi-plus-circle
                                    </v-icon>
                                    Crear usuario
                                </template>
                                <span>Crea un usuario</span>
                            </v-tooltip>
                        </div>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details>
                        </v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="Usuarios" :search="search">
                        <template v-slot:[`item.estado`]="{ item }">

                            <span class="green--text" v-if="item.estado === 1"> Activo</span>
                            <span class="red--text" v-else>Inactivo</span>
                        </template>

                        <template v-slot:[`item.opciones`]="{ item }">
                            <span v-if="item.estado === 1">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon color="red" rounded v-bind="attrs" v-on="on" @click="desactivar(item._id)">
                                            mdi-shield-off
                                        </v-icon>
                                    </template>
                                    <span>Inactivar</span>
                                </v-tooltip>
                            </span>
                            <span v-else>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon color="success" rounded v-bind="attrs" v-on="on" @click="activar(item._id)">
                                            mdi-shield-check-outline
                                        </v-icon>
                                    </template>
                                    <span>Activar</span>
                                </v-tooltip>
                            </span>
                            <span>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon color="blue" rounded v-bind="attrs" v-on="on" @click="tomarDatos(item)">
                                            mdi-pencil
                                        </v-icon>
                                    </template>
                                    <span>Editar</span>
                                </v-tooltip>
                            </span>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
        </div>
        <!--Dialog crear Usuario-->
        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="800px">
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-5">
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="nombre" label="Nombres*" required filled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="apellido" label="Apellidos*" required filled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="mt-n7">
                                        <v-text-field v-model="documento" label="Documento*" required filled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="mt-n7">
                                        <v-text-field v-model="telefono" label="Telefono*" required filled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="mt-n7">
                                        <v-text-field v-model="direccion" label="Direccion*" required filled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="mt-n7">
                                        <v-text-field v-model="correo" label="Email*" required filled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="mt-n7">
                                        <v-text-field v-model="password" label="Contraseña*"
                                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'"
                                            hint="Al menos 8 carácteres" @click:append="show = !show" filled rounded dense>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="mt-n7">
                                        <v-select v-model="selecionadoRol" :items="rolPersona" dense filled rounded
                                            label="Rol">
                                        </v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small class="green--text">*Indica que el campo es obligatorio</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" rounded text @click="cancelar()">
                                Cancelar
                            </v-btn>
                            <v-btn color="green darken-1" rounded text @click="guardar()">
                                Crear
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!--Dialog editar usuario-->
        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog2" persistent max-width="800px">
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-5">
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="nombre" label="Nombres*" required filled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="apellido" label="Apellidos*" required filled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="mt-n7">
                                        <v-text-field v-model="documento" label="Documento" required filled disabled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="mt-n7">
                                        <v-text-field v-model="telefono" label="Telefono*" required filled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="mt-n7">
                                        <v-text-field v-model="direccion" label="Direccion*" required filled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="mt-n7">
                                        <v-text-field v-model="correo" label="Email" required filled disabled
                                            rounded></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="mt-n7">
                                        <v-text-field v-model="password" label="Contraseña*"
                                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'"
                                            hint="Al menos 8 carácteres" @click:append="show = !show" filled rounded dense>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="mt-n7">
                                        <v-select v-model="selecionadoRol" :items="rolPersona" dense filled rounded
                                            label="Rol">
                                        </v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small class="green--text">*Indica que el campo es obligatorio</small>
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
            </v-row>
        </template>
    </v-container>
</template> 
<script>
import axios from "axios";

export default {
    name: 'PageUsuario',
    data: () => ({
        dialog: false,
        dialog2: false,
        show: false,
        search: "",
        // Informacion
        Usuarios: [],
        id: "",
        nombre: "",
        apellido: "",
        documento: "",
        direccion: "",
        telefono: "",
        correo: "",
        password: "",
        selecionadoRol: "",
        rules: {
            required: value => !!value || 'La contraseña Es obligatoria.',
            min: v => v.length >= 8 || 'Minimo 8 caracteres',
        },
        rolPersona: [
            { text: "ADMIN", value: "ADMIN" },
            { text: "AUXILIAR", value: "AUXILIAR" },
        ],
        headers: [
            { text: 'Nombres', align: "start", value: 'nombre' },
            { text: 'Apellidos', align: "start", value: 'apellido' },
            { text: 'Cc', align: "start", value: 'documento' },
            { text: 'Dirección', value: 'direccion' },
            { text: 'Telefono', value: 'celular' },
            { text: 'Correo', value: 'email' },
            { text: "Estado", value: "estado", },
            { text: "Rol", align: "start", value: "rol", },
            { text: "Opciones", align: "start", value: "opciones", },
        ],
    }),

    methods: {
        usuarios() {
            let header = { headers: { token: this.$store.state.token } };
            axios
                .get(`/usuarios`, header)
                .then((response) => {
                    this.Usuarios = response.data.usuarios;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        guardar() {
            let header = { headers: { token: this.$store.state.token } };
            axios.post(`/usuarios/`,
                {
                    nombre: this.nombre,
                    apellido: this.apellido,
                    documento: this.documento,
                    direccion: this.direccion,
                    celular: this.telefono,
                    email: this.correo.toUpperCase(),
                    password: this.password,
                    rol: this.selecionadoRol,
                },
                header
            )
                .then((response) => {
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: response.data.msg,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.nombre = ""
                    this.apellido = ""
                    this.documento = ""
                    this.direccion = ""
                    this.telefono = ""
                    this.correo = ""
                    this.password = ""
                    this.selecionadoRol = ""
                    this.dialog = false;
                    this.usuarios();
                })

                .catch((error) => {
                    console.log(error);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: error.response.data.errores.errors[0].msg,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });

        },
        tomarDatos(item) {
            this.dialog2 = true;
            this.id = item._id;
            this.nombre = item.nombre;
            this.apellido = item.apellido;
            this.documento = item.documento;
            this.direccion = item.direccion;
            this.telefono = item.celular;
            this.correo = item.email;
            this.selecionadoRol = item.rol;
        },
        editar() {
            let header = { headers: { "token": this.$store.state.token } }
            axios.put(`/usuarios/datos/${this.id}`, {
                nombre: this.nombre,
                apellido: this.apellido,
                documento: this.documento,
                direccion: this.direccion,
                celular: this.telefono,
                email: this.correo.toUpperCase(),
                password: this.password,
                rol: this.selecionadoRol,
            }, header)
                .then((response) => {
                    console.log(response);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Datos Del Usuario actualizados correctamente",
                        showConfirmButton: false,
                        timer: 2200,
                    });
                    this.nombre = ""
                    this.apellido = ""
                    this.documento = ""
                    this.direccion = ""
                    this.telefono = ""
                    this.correo = ""
                    this.password = ""
                    this.selecionadoRol = ""
                    this.dialog2 = false;
                    this.usuarios();
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
            this.apellido = ""
            this.documento = ""
            this.direccion = ""
            this.telefono = ""
            this.correo = ""
            this.password = ""
            this.selecionadoRol = ""
            this.dialog = false;
            this.dialog2 = false;
        },
        desactivar(id) {
            if (id === this.$store.state.datos._id) {
                this.$swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "No puedes desactivar el usuario que estas usando actualmente",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            else {
                let header = { headers: { token: this.$store.state.token } };
                axios
                    .put(`/usuarios/desactivar/${id}`, {}, header)
                    .then((response) => {
                        this.$swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: response.data.msg,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        this.usuarios();

                    })
                    .catch((error) => {
                        this.$swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: error.response.data.errores.errors[0].msg,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    });
            }

        },
        activar(id) {
            let header = { headers: { token: this.$store.state.token } };
            axios
                .put(`/usuarios/activar/${id}`, {}, header)
                .then((response) => {
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: response.data.msg,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.usuarios();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    created() {
        this.usuarios()
    }
}
</script>