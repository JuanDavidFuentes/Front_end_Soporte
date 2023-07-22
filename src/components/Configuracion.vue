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
                                        Crear <br>Ciudades
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar size="100" color="white">
                                    <img height=70%
                                        src="https://img.freepik.com/vector-premium/icono-ciudad-blanco-negro-sobre-fondo-blanco_925480-91.jpg?w=826"
                                        alt="IMG_GOOGLE_USUARIO">
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-card-actions>
                                <v-btn color="white" outlined rounded to="/ciudades">
                                    <v-icon class="mr-1" dark>mdi-city</v-icon>
                                    Ciudades
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
                                        Crear<br> Empresas
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-avatar size="100" color="white">
                                    <img height=70%
                                        src="https://cdn-icons-png.flaticon.com/512/63/63879.png?w=826&t=st=1689725155~exp=1689725755~hmac=d074928cbc44b1ae67961620de9ea12db03911d310ef71e4f44974a906836e57"
                                        alt="IMG_GOOGLE_USUARIO">
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-card-actions>
                                <v-btn color="white" outlined rounded to="/empresas">
                                    <v-icon class="mr-1" dark>mdi-clipboard-account</v-icon>
                                    empresas
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
export default {
    name: 'PageConfiguracion',
    data() {
        return {

        }
    },
    methods: {
    }
}
</script>
