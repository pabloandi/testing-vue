<template>
    <div>
        <input type="text" class="coupon-code" v-model="code" @input="validate">
        <p v-text="feedback"></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            code: '',
            coupons: []
        }
    },
    computed: {
        selectedCoupon(){
            return this.coupons.find(coupon => this.code === coupon.code)
        },
        message(){
            return this.selectedCoupon.message;
        },
        feedback(){
            return (this.valid) ? `Coupon Redeemed: ${this.message}` : 'Invalid Coupon Code!';
        }
    },
    methods: {
        validate() {
            this.valid = !! this.selectedCoupon;

            if(this.valid){
                this.$emit('applied', this.selectedCoupon.discount);
            }
        }
    },
}
</script>

<style>

</style>