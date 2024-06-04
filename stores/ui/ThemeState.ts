import { defineStore } from 'pinia'

export interface Sidebar {
  h_opened: boolean
  v_opened: boolean
  menu: Menu[]
}

export interface State {
  sidebar?: Sidebar
}

export const useThemeStateStore = defineStore('useThemeState', {
  persist: true,
  state: () => ({
    // menuExpandedKeys: ref({}),
    sidebar: {
      h_opened: true,
      v_opened: true,
      menu: [],
      // menuExpandedKeys: ref({}),
    } as Sidebar,
    layout: {
      darkTheme: false,
      menuMode: 'static',
      theme: 'lara-light-indigo',
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
    changeThemeSettings(theme, darkTheme) {
      this.layout.darkTheme = darkTheme
      this.layout.theme = theme
    },

    setScale(scale) {
      this.layout.scale = scale
    },

    setActiveMenuItem(item) {
      this.layout.activeMenuItem = item.value || item
    },

    onMenuToggle() {
      if (this.layout.menuMode === 'overlay') {
        this.layout.overlayMenuActive = !this.layout.overlayMenuActive
      }

      if (window.innerWidth > 991) {
        this.layout.staticMenuDesktopInactive = !this.layout.staticMenuDesktopInactive
      } else {
        this.layout.staticMenuMobileActive = !this.layout.staticMenuMobileActive
      }
      // console.log(this.layout.staticMenuMobileActive);
    },
    onMenuToggleVertical(menu: any = null): void {
      if (!menu) {
        menu = this.sidebar.menu
      }
      menu.forEach((menu) => {
        if (menu.hasOwnProperty('opened')) {
          menu.opened = this.sidebar.v_opened
        }
        if (menu.hasOwnProperty('items') && menu.items.length > 0) {
          this.onMenuToggleVertical(menu.items)
        }
      })
    },
  },
  getters: {
    // automatically infers the return type as a number
    isSidebarActive(state) {
      return state.layout.overlayMenuActive || state.layout.staticMenuMobileActive
    },
    isDarkTheme(state) {
      return state.layout.darkTheme
    },
  },
})
