<template>
  <div class="layout-topbar u-px-l">
    <div class="layout-topbar-inner">
      <div class="layout-topbar-logo-container relative w-200px h-70px">

        <NuxtLink to="/" class="layout-topbar-logo w-full h-full z-10">
          <LogoSvg />
        </NuxtLink>

      </div>
      <ul class="topbar-items">
        <li>
          <a href="https://github.com/primefaces/primevue" target="_blank" rel="noopener noreferrer"
            class="topbar-item">
            <i class="pi pi-github"></i>
          </a>
        </li>
        <li>
          <a href="https://discord.gg/gzKFYnpmCY" target="_blank" rel="noopener noreferrer" class="topbar-item">
            <i class="pi pi-discord"></i>
          </a>
        </li>
        <li>
          <a href="https://github.com/orgs/primefaces/discussions" target="_blank" rel="noopener noreferrer"
            class="topbar-item">
            <i class="pi pi-comments"></i>
          </a>
        </li>
        <li>
          <button
            v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            type="button" class="topbar-item config-item">
            <i class="pi pi-palette"></i>
          </button>
        </li>
        <li>
          <button
            v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            type="button" style="max-width: 8rem" class="topbar-item version-item">
            <span class="version-text">{{ versions[0].name }}</span>
            <span class="version-icon pi pi-angle-down"></span>
          </button>

          <div class="versions-panel hidden">
            <ul>
              <li v-for="version in versions" :key="version.version" role="none">
                <a :href="version.url">
                  <span>PrimeVue {{ version.name }}</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li v-if="showMenuButton" class="menu-button">
          <button type="button" class="topbar-item menu-button" @click="onMenuButtonClick" aria-haspopup
            aria-label="Menu">
            <i class="pi pi-bars"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  emits: ['menubutton-click'],
  outsideClickListener: null,
  props: {
    showMenuButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      versions: [
        {
          name: 'v4',
          url: 'https://v4.primevue.org'
        },
        {
          name: 'v3',
          url: 'https://www.primevue.org'
        },
        {
          name: 'v2',
          url: 'https://www.primefaces.org/primevue-v2'
        }
      ],
      containerw: null
    };
  },
  scrollListener: null,
  containerw: null,
  mounted() {

    const el = document.querySelector("#intersectionObservertarget")
    const observer = new IntersectionObserver(
      ([e]) => {
        const container = document.querySelector('.layout-topbar')
        if (e.intersectionRatio < 1) container.classList.add('layout-topbar-sticky');
        else container.classList.remove('layout-topbar-sticky');
      },
      {
        threshold: 1
      }
    );
    observer.observe(el);

    //this.bindScrollListener();
    // const el = document.querySelector("#intersectionObservertarget")
    // const $this = this
    // const observer = new IntersectionObserver(
    // ([e]) => {
    // console.log(e.intersectionRatio, this.containerw);
    // const el = document.querySelector('.layout-topbar')
    // if (e.intersectionRatio == 0) el.classList.add('layout-topbar-sticky');
    // else el.classList.remove('layout-topbar-sticky');

    // if (e.intersectionRatio == 0) this.containerw.classList.add('layout-topbar-sticky');
    // else this.containerw.classList.remove('layout-topbar-sticky');

    // },
    // {
    // root: document.querySelector(".layout-wrapper"),
    // threshold: 0.8
    // }
    // );

    // observer.observe(el);

  },
  // beforeUnmount() {
  //   if (this.scrollListener) {
  //     this.unbindScrollListener();
  //   }
  // },
  methods: {
    onMenuButtonClick(event) {
      this.$emit('menubutton-click', event);
    },
    // bindScrollListener() {
    //   if (!this.scrollListener) {
    //     if (this.container) {
    //       this.scrollListener = () => {
    //         if (window.scrollY > 0) this.container.classList.add('layout-topbar-sticky');
    //         else this.container.classList.remove('layout-topbar-sticky');
    //       };
    //     }
    //   }

    //   window.addEventListener('scroll', this.scrollListener);
    // },
    // unbindScrollListener() {
    //   if (this.scrollListener) {
    //     window.removeEventListener('scroll', this.scrollListener);
    //     this.scrollListener = null;
    //   }
    // },
    // bindOutsideClickListener() {
    //   if (!this.outsideClickListener) {
    //     this.outsideClickListener = (event) => {
    //       if (this.isOutsideTopbarMenuClicked(event)) {
    //         this.unbindOutsideClickListener();
    //       }
    //     };

    //     document.addEventListener('click', this.outsideClickListener);
    //   }
    // },
    // unbindOutsideClickListener() {
    //   if (this.outsideClickListener) {
    //     document.removeEventListener('click', this.outsideClickListener);
    //     this.outsideClickListener = null;
    //   }
    // },
    // isOutsideTopbarMenuClicked(event) {
    //   return !(this.$refs.topbarMenu.isSameNode(event.target) || this.$refs.topbarMenu.contains(event.target));
    // },
    containerRef(el) {
      this.containerw = el;
    }
  },
};
</script>
<script setup>
onMounted(() => { })



</script>
