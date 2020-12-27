<template>
    <div>
        <span class="count" v-text="count"></span>
        <button class="increment" @click="count++">Increment</button>
        <button class="decrement" @click="count--" v-show="count > 0">Decrement</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0
        }
    },
}
</script>

<style>

</style>