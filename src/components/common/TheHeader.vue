<script setup>
// const isExpanded = defineModel('isExpanded', {
//   type: Boolean
// });

defineProps({
  backgroundColor: {
    type: String,
    default: '#252525'
  },
  /* example of userDropdownLinks
    [
        { 
            title: 'User Manual', 
            href: '#', 
            icon: ['fas', 'fa-book-open'] 
        },
    ]
    */
  userDropdownLinks: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <header>
    <div class="header__logo header__logo--en">
      <img src="../../assets/logo/logo-en.png" alt="" />
    </div>
    <div class="header__title">
      <p>
        <slot name="system"></slot>
      </p>
    </div>
    <div class="user">
      <div class="user__icon">
        <v-icon name="bi-person-circle" scale="1.5" />
      </div>
      <p class="user__name"><slot name="userName"></slot></p>
      <!-- <div class="user__dropdown">
        <div>
          <div>
            <h2>Hi! <slot name="userName"></slot></h2>
          </div>
          <div class="user__links" v-if="!!userDropdownLinks.length">
            <p v-for="(link, idx) of userDropdownLinks" :key="idx">
              <a :href="link.href"
                ><font-awesome-icon :icon="[...link.icon]" v-if="link.icon" /> {{ link.title }}</a
              >
            </p>
          </div>
        </div>
      </div> -->
    </div>
    <div class="header__logo header__logo--cn">
      <img src="../../assets/logo/logo-cn.png" alt="" />
    </div>
  </header>
  <nav></nav>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  background-color: v-bind(backgroundColor);
  height: 4rem;
  padding-inline: 1rem;
  position: sticky;
  top: 0;
  z-index: 999;

  .header__logo {
    flex: 0 1 8rem;
    display: flex;
    align-items: center;

    img {
      width: 100%;
    }

    &.header__logo--cn {
      flex-basis: 7rem;
    }
  }

  .user {
    flex: 0 1 8rem;
    color: #fff;
    justify-content: center;
    margin-right: 0.125rem;
    cursor: pointer;
    display: grid;
    grid-template-rows: 3fr 2fr;

    .user__icon {
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: end;
    }

    .user__name {
      text-align: center;
      font-size: 0.875rem;
    }
  }

  .header__title {
    flex: 1 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-left: 1rem;

    p {
      border-left: 0.25rem solid var(--color-deloitte);
      color: #fff;
      font-size: 1.5rem;
      font-weight: 700;
      padding-left: 0.5rem;
      line-height: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

@media (max-width: 768px) {
  header {
    .header__logo {
      &.header__logo--cn {
        display: none;
      }
    }
    .header__title {
      p {
        font-size: 1rem;
      }
    }

    .user {
      flex-basis: 5rem;
    }
  }
}
</style>
