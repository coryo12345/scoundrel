import EndScreen from '@/views/EndScreen.vue';
import Game from '@/views/GameScreen.vue';
import Home from '@/views/HomeScreen.vue';
import NewGameScreen from '@/views/NewGameScreen.vue';
import RulesScreen from '@/views/RulesScreen.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/game', name: 'game', component: Game },
    { path: '/newgame', name: 'newgame', component: NewGameScreen },
    { path: '/rules', name: 'rules', component: RulesScreen },
    { path: '/gameover', name: 'end', component: EndScreen },
  ],
});

export default router;
