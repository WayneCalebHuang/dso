import './assets/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  RiMouseLine,
  RiMouseFill,
  BiPersonCircle,
  RiErrorWarningFill,
  BiCheckAll,
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  IoCheckmarkCircleSharp,
  IoInformationCircle,
  FaTrashAlt,
  RiLoader4Fill,
  IoChevronDownCircle
} from 'oh-vue-icons/icons';
import 'sweetalert2/dist/sweetalert2.min.css';

addIcons(
  RiMouseLine,
  RiMouseFill,
  BiPersonCircle,
  RiErrorWarningFill,
  BiCheckAll,
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  IoCheckmarkCircleSharp,
  IoInformationCircle,
  FaTrashAlt,
  RiLoader4Fill,
  IoChevronDownCircle
);

const app = createApp(App);
const pinia = createPinia();

app.component('v-icon', OhVueIcon).use(router).use(pinia);

app.mount('#app');
