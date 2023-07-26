<template>
    <v-container class="fill-height" fluid>
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
            <v-row v-else class="my-13" align="center" justify="center">
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4" v-if="$store.state.datos.rol == 'ADMIN'">
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
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4" v-if="$store.state.datos.rol == 'ADMIN'">
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
        volver() {
            this.$router.push("/")
        }
    }
}
</script>
