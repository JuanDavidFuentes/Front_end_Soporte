<template>
    <v-container class="fill-height" fluid>
        <v-row class="my-13" align="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4"> <!--v-if="$store.state.datos.rol == 'ADMIN' -->
                <template>
                    <v-hover v-slot="{ hover }" open-delay="150">
                        <v-card class="mx-auto" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" color="black"
                            outlined dark>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h5 mb-1">
                                        Crear Nuevo <br> Usuario
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar size="100" color="grey">
                                    <img height=70%
                                        src="https://i.postimg.cc/BnpC9521/add-new-user-avatar-icon-260nw-2100775648.png"
                                        alt="IMG_GOOGLE_USUARIO">
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-card-actions>
                                <v-btn color="white" outlined rounded to="/usuario">
                                    <v-icon class="mr-1" dark>mdi-account-multiple-plus</v-icon>
                                    Agregar Usuario
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </template>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4"> <!--v-if="$store.state.datos.rol == 'ADMIN' -->
                <template>
                    <v-hover v-slot="{ hover }" open-delay="150">
                        <v-card class="mx-auto" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" color="black"
                            outlined dark>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h5 mb-1">
                                        Configuración
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar size="100" color="white">
                                    <img height=70%
                                        src="https://cdn-icons-png.flaticon.com/512/263/263100.png?w=826&t=st=1689725480~exp=1689726080~hmac=40e2b6a3aba4fe1449d0af9f885d3c78062412c44500e109fdf87db30e60e1f5"
                                        alt="IMG_GOOGLE_USUARIO">
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-card-actions>
                                <v-btn color="white" outlined rounded to="/configuracion">
                                    <v-icon class="mr-1" dark>mdi-wrench</v-icon>
                                    Configuración
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </template>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4"> <!--v-if="$store.state.datos.rol == 'ADMIN' -->
                <template>
                    <v-hover v-slot="{ hover }" open-delay="150">
                        <v-card class="mx-auto" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" color="black"
                            outlined dark>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h5 mb-1">
                                        Crear nuevo usuario
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar size="100" color="grey">
                                    <img height=70%
                                        src="https://i.postimg.cc/BnpC9521/add-new-user-avatar-icon-260nw-2100775648.png"
                                        alt="IMG_GOOGLE_USUARIO">
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-card-actions>
                                <v-btn color="white" outlined rounded to="/agregarusuario">
                                    <v-icon class="mr-1" dark>mdi-account-multiple-plus</v-icon>
                                    Agregar Usuario
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </template>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
//import axios from 'axios'
export default {
    name: 'PageInicio',

    data() {
        return {
        }
    },
    methods: {

    },
}
</script>
