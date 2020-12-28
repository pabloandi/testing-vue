<template>
  <div>
      <input type="text" class="new-reminder" v-model="newReminder">
      <button @click="add">Add reminder</button>

      <ul v-if="reminders.length > 0">
          <li :key="reminder" v-for="reminder in reminders">
              {{ reminder }}
              <button class="remove" @click.prevent="remove(reminder)">Remove</button>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            reminders: [],
            newReminder: ''
        }
    },
    methods: {
        add(){
            this.reminders.push(this.newReminder);
            this.newReminder='';
        },
        remove(reminder){
            this.reminders.splice(reminder, 1);
        }
    },
}
</script>

<style>

</style>