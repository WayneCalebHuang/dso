<script setup>
import TheHeader from '@/components/common/TheHeader.vue';
import TheFooter from '@/components/common/TheFooter.vue';
import LaodingModal from '@/components/common/LoadingModal.vue';
import AlertModal from '@/components/common/AlertModal.vue';
import TheNavbar from './components/common/TheNavbar.vue';

// import { fetchData } from '@/Util/fetch';
import { onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useModalStore } from '@/stores/modal';
const userStore = useUserStore();
const modalStore = useModalStore();

const userName = computed(() => {
  const fullName = userStore.user.empNameE;
  return fullName ? fullName.split(' ').slice(0, 2).join(' ') : '';
});

onMounted(async () => {
  await userStore.getToken();
});
</script>

<template>
  <LaodingModal v-if="modalStore.showLoading" />
  <AlertModal v-if="modalStore.showAlert" />
  <TheHeader :backgroundColor="'#000'">
    <template #system>諮詢定價分析</template>
    <template #userName>{{ userName }}</template>
  </TheHeader>
  <TheNavbar
    :navLinks="[
      {
        title: 'AAAA',
        href: '/'
      },
      {
        title: 'BBBB',
        href: '/a'
      },
      {
        title: '這tmd是一個下拉選單',
        children: [
          { title: 'dropdown1', href: '/1' },
          { title: 'dropdown2', href: '/2' },
          { title: 'dropdown3', href: '/3' }
        ]
      },
      {
        title: '中文中文',
        href: '/b'
      }
    ]"
  />
  <main>
    <router-view />
  </main>
  <TheFooter :backgroundColor="'#000'"></TheFooter>
</template>

<style lang="scss">
main {
  padding: 1rem;
  flex-grow: 1;

  .card {
    background-color: #fff;
    border-radius: 0.375rem;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  }
}
footer {
  margin-top: 0;
}
</style>
