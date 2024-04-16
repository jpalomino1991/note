<template>
    <nav
      class="navbar is-success"
      aria-label="main navigation"
      role="navigation"
    >
        <div class="container is-max-desktop px-2">
            <div class="navbar-brand">
                <div class="navbar-item is-size-4 is-family-monospace">
                    Notes
                </div>

                <a
                  :class="{ 'is-active' : showMobileNav }"
                  @click.prevent="showMobileNav = !showMobileNav"
                  class="navbar-burger"
                  aria-expanded="false"
                  aria-label="menu"
                  data-target="navbarBasicExample"
                  role="button"
                  ref="navbarBurgerRef"
                >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div
              id="navbarBasicExample"
              class="navbar-menu"
              :class="{ 'is-active' : showMobileNav }"
              ref="navbarMenuRef"
            >
                <div class="navbar-start">
                    <button
                      class="button is-small is-info ml-3"
                      v-if="storeAuth.user.id"
                      @click="logout"
                    >
                        Log Out {{ storeAuth.user.email }}
                    </button>
                </div>
                <div class="navbar-end">
                    <RouterLink
                        @click="showMobileNav = false"
                        to="/"
                        class="navbar-item"
                        active-class="is-active"
                    >
                        Notes
                    </RouterLink>
                    <RouterLink
                        @click="showMobileNav = false"
                        to="/stats"
                        class="navbar-item"
                        active-class="is-active"
                    >
                        Stats
                    </RouterLink>
                </div>
            </div>
        </div>
        
    </nav>
</template>

<script setup>

//  imports

    import { ref } from 'vue'
    import { onClickOutside } from '@vueuse/core'
    import { useStoreAuth } from '@/store/storeAuth'

//  store

    const storeAuth = useStoreAuth()

//  mobile nav

    const showMobileNav = ref(false)

//  click outside to close

    const navbarMenuRef = ref(null)
    const navbarBurgerRef = ref(null)

    onClickOutside(navbarMenuRef, event => {
        showMobileNav.value = false
    }, {
        ignore: [navbarBurgerRef]
    })

//  logout

    const logout = () => {
        storeAuth.logoutUser()
        showMobileNav.value = false
    }

</script>

<style>
@media (max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>