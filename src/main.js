import { createApp } from 'vue'
import App from './App.vue'

import 'materialize-css/dist/css/materialize.min.css'
import '@firebase/auth';
import '@firebase/firestore';


import NavBar from "@/components/NavBar";
import Display from "@/components/Display";
import Memory from "@/components/Memory";

const app = createApp(App)


app.component('nav-bar-custom', NavBar)
app.component('display-component',Display)
app.component('memory-component',Memory);
app.mount('#app')



