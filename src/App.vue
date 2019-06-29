<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>User Data Base</span>
                <span class="font-weight-light">using VueJs</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    flat
                    target="_blank"
            >
                <router-link to="/" tag="button">
                    <span class="mr-2">Home Page</span>
                </router-link>
            </v-btn>

            <v-btn
                    flat
                    target="_blank"
            >
                <router-link to="/add" tag="button">
                    <span class="mr-2">Add User</span>
                </router-link>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-fade-transition>
                <router-view/>
            </v-fade-transition>
        </v-content>
        <v-footer app iclass="pa-3">
            <v-spacer></v-spacer>
            <h4>footer</h4>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                //
            }
        }
    }
</script>
