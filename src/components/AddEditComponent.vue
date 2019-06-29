<template>
    <v-container grid-list-md text-xs-center fill-height>
        <v-layout column wrap>
            <v-flex>
                <v-card>
                    <v-card-title><h3>User Information:</h3></v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                    v-model="name"
                                    :rules="nameRules"
                                    :counter="10"
                                    label="Name"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="lastName"
                                    :rules="lastNameRules"
                                    :counter="10"
                                    label="Last Name"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="age"
                                    :rules="ageRules"
                                    label="Age"
                                    required
                            ></v-text-field>
                            <v-btn
                                    :disabled="!valid"
                                    @click="submit"
                            >
                                submit
                            </v-btn>
                            <v-btn @click="clear">clear</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "AddEditComponent",
        props: {
            user: Object
        },
        data() {
            return {
                valid: true,
                id: null,
                name: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters'
                ],
                lastName: '',
                lastNameRules: [
                    v => !!v || 'Last Name is required',
                    v => (v && v.length <= 10) || 'Last Name must be less than 10 characters'
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                age: '',
                ageRules: [
                    v => !!v || 'Age is required',
                    v => (parseInt(v) > 1 && parseInt(v) < 99) || 'Age must be valid'
                ],
            }
        },
        created() {
            if (this.user) {
                this.name = this.user.firstName;
                this.lastName = this.user.lastName;
                this.email = this.user.email;
                this.age = this.user.age;
                this.id = this.user.id;
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    if (this.id) {
                        axios.post('/EditUser', {
                            id: this.id,
                            firstName: this.name,
                            lastName: this.lastName,
                            email: this.email,
                            age: this.age
                        }).then(data => {
                            console.log('Successful' + data.data);
                            this.clear();
                            this.$router.push('/')
                        }).catch(error => {
                            console.log('Error!')
                        })
                    } else {
                        axios.put('/AddUser', {
                            firstName: this.name,
                            lastName: this.lastName,
                            email: this.email,
                            age: this.age
                        }).then(data => {
                            console.log('User created with id: ' + data.data);
                            this.clear();
                            this.$router.push('/')
                        }).catch(error => {
                            console.log('Error!')
                        })
                    }
                }
            }
            ,
            clear() {
                this.$refs.form.reset()
            }
        }
    }
</script>

<style scoped>

</style>
