app.component('create-platform', {
    data() {
        return {
            platformForm: {
                name: null
            }
        }
    },
    template:
        /* html */
        `
        <form @submit.prevent="onSubmit">
            <label for="name">Name:</label>
            <input id="name" v-model="platformForm.name">
            <br/>

            <input class="button" type="submit" value="Submit">
        </form>
        `
    ,
    methods: {
        onSubmit() {
            axios.post('http://localhost:3000/createPlatform', this.platformForm)
        }
    },
    mounted() {},
})