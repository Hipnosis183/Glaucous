app.component('create-developer', {
    data() {
        return {
            developerForm: {
                name: null
            }
        }
    },
    template:
        /* html */
        `
        <form @submit.prevent="onSubmit">
            <label for="name">Name:</label>
            <input id="name" v-model="developerForm.name">
            <br/>

            <input class="button" type="submit" value="Submit">
        </form>
        `
    ,
    methods: {
        onSubmit() {
            axios.post('http://localhost:3000/createDeveloper', this.developerForm)
        }
    },
    mounted() {},
})