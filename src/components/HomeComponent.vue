<template>
    <v-container grid-list-md text-xs-center fill-height>
        <v-layout column wrap>
            <v-flex>
                <v-card>
                    <v-card-title>Users Table</v-card-title>
                    <v-card-text>
                        <v-data-table
                                :headers="headers"
                                :items="getList"
                                hide-actions
                                class="elevation-1"
                                dark
                        >
                            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-left">{{ props.item.firstName }}</td>
                                <td class="text-xs-left">{{ props.item.lastName }}</td>
                                <td class="text-xs-left">{{ props.item.email }}</td>
                                <td class="text-xs-left">{{ props.item.age }}</td>
                                <td class="justify-center layout px-0">
                                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                                        <v-icon color="teal">edit</v-icon>
                                    </v-btn>
                                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                        <v-icon color="pink">delete</v-icon>
                                    </v-btn>
                                </td>
                            </template>
                            <template slot="no-data">
                                <v-alert :value="true" color="error" icon="warning">
                                    Sorry, nothing to display here :(
                                </v-alert>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "HomeComponent",
        data() {
            return {
                users: [],
                headers: [
                    {
                        text: 'First Name',
                        sortable: false,
                        value: 'firstName'
                    },
                    {text: 'Last Name', value: 'lastName', sortable: false},
                    {text: 'Email', value: 'email', sortable: false},
                    {text: 'Age', value: 'age', sortable: false},
                    {text: 'Actions', value: 'name', sortable: false, align: 'center'}
                ],
            }
        },
        computed: {
            getList() {
                return this.users;
            }
        },
        created() {
            axios.get('GetAll').then(data => {
                this.users = data.data;
            }).catch(error => {
                console.log(error);
            })
        },
        methods: {
            editItem(item) {
                this.$router.push({
                    name: 'edit',
                    params: {
                        user: item
                    }
                })
            },

            deleteItem(item) {
                const index = this.users.indexOf(item)
                let bool = confirm('Are you sure you want to delete this item?');
                if (bool) {
                    this.users.splice(index, 1)
                    axios.delete('DeleteUser', {
                        params: {
                            id: item.id
                        }
                    }).then(data => {
                        console.log(data);
                    }).catch(error => {
                        console.log(error);
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
