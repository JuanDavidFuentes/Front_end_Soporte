import login from '../components/Login.vue';
import inicio from '../components/Inicio.vue';
import usuario from '../components/Usuario.vue';

export const routes = [
    {path: '/', component: login},
    {path: '/inicio', component: inicio},
    {path: '/usuario', component: usuario},
]