import { defineStore } from "pinia";
import { computed } from "vue";

export const useThemeStateStore = defineStore("useThemeState", {
  persist: true,
  state: () => ({
    sidebar: {
      h_opened: true,
      v_opened: true,
      menu_roots: [],
      menu: [],
    },
    layout: {
      darkTheme: false,
      menuMode: "static",
      theme: "lara-light-indigo",
      scale: 14,
      activeMenuItem: null,
      staticMenuDesktopInactive: false,
      overlayMenuActive: false,
      profileSidebarVisible: false,
      configSidebarVisible: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    },
  }),

  actions: {
    // iniMenuRoots(l: number): void {
    //   this.sidebar.menu_roots = ref(Array.from({ length: l }, () => true))
    // },
    // setMenuRoots(v: boolean) {
    //   this.sidebar.menu_roots.fill(v)
    // },

    changeThemeSettings(theme, darkTheme) {
      this.layout.darkTheme = darkTheme;
      this.layout.theme = theme;
    },

    setScale(scale) {
      this.layout.scale = scale;
    },

    setActiveMenuItem(item) {
      this.layout.activeMenuItem = item.value || item;
    },

    onMenuToggle() {
      if (this.layout.menuMode === "overlay") {
        this.layout.overlayMenuActive = !this.layout.overlayMenuActive;
      }

      if (window.innerWidth > 991) {
        this.layout.staticMenuDesktopInactive =
          !this.layout.staticMenuDesktopInactive;
      } else {
        this.layout.staticMenuMobileActive =
          !this.layout.staticMenuMobileActive;
      }
      console.log(this.layout.staticMenuMobileActive);

    },
    onMenuToggleVertical(menu: any = null): void {

      if (!menu) {
        menu = this.sidebar.menu;
      }
      menu.forEach((menu) => {
        if (menu.hasOwnProperty("opened")) {
          menu.opened = this.sidebar.v_opened;

        }
        if (menu.hasOwnProperty("items") && menu.items.length > 0) {
          this.onMenuToggleVertical(menu.items);
        }
      });

    },
  },
  getters: {
    // automatically infers the return type as a number
    isSidebarActive(state) {
      return (
        state.layout.overlayMenuActive || state.layout.staticMenuMobileActive
      );
    },
    isDarkTheme(state) {
      return state.layout.darkTheme;
    },
  },
});
