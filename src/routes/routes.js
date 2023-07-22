import login from '../components/Login.vue';
import inicio from '../components/Inicio.vue';
import usuario from '../components/Usuario.vue';
import configuracion from '../components/Configuracion.vue';
import ciudades from '../components/Ciudades.vue';
import empresas from '../components/Empresas.vue';
import equipos from '../components/Equipos.vue';
import envios from '../components/Envios.vue';

export const routes = [
    {path: '/', component: login},
    {path: '/inicio', component: inicio},
    {path: '/usuario', component: usuario},
    {path: '/configuracion', component: configuracion},
    {path: '/ciudades', component: ciudades},
    {path: '/empresas', component: empresas},
    {path: '/equipos', component: equipos},
    {path: '/envios', component: envios},
]