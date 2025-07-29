<template>
    <SidebarDrawer storeId="sidebarRight" position="right">
        <template #content="{ data }">
            <nav class="menu-large">
                <MenuLarge :mode="data.mode" :menu="data.menu" :root="true" />
            </nav>
            <nav class="menu-small">
                <MenuMini :mode="data.mode" :menu="data.menu" :root="true" />
            </nav>
        </template>
    </SidebarDrawer>
</template>
