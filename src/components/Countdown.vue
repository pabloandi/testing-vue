<template>
  <div>
      <div v-if="! finished">
          <span>{{ remaining.days }} Days, </span>
          <span>{{ remaining.hours }} Hours, </span>
          <span>{{ remaining.minutes }} Minutes, </span>
          <span>{{ remaining.seconds }} Seconds </span>
          left...
      </div>

      <div v-else v-text="expiredText"></div>
  </div>
</template>

<script>

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default {
    props: {
        until: Object,
        expiredText: {
            type: String,
            default: 'Now Expired'
        }
    },
    data() {
        return {
            now: new Date(),
        }
    },
    computed: {
        remaining () {
            let remaining = dayjs.duration(dayjs(this.until).diff( this.now ));

            if(remaining.seconds() <= 0){
                this.$emit('finished');
            }

            return {
                days: remaining.days(),
                hours: remaining.hours(),
                minutes: remaining.minutes(),
                seconds: remaining.seconds(),
            }
        },
        finished() {
            return this.remaining.seconds <= 0; 
        }
    },
    created(){
        let interval = setInterval(() => {
             this.now = new Date();
        }, 1000);

        this.$on('finished', () => clearInterval(interval));
    }
}
</script>

<style>

</style>