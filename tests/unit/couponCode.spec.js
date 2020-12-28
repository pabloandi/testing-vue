import { mount } from '@vue/test-utils';
import expect from 'expect';
import CouponCode from '@/components/CouponCode';

describe('CouponCode', () => {
    let wrapper, vm;

    beforeEach(() => {
        wrapper = mount(CouponCode);
        wrapper.setData({
            coupons: [
                {
                    code: '50OFF',
                    message: '50% Off!',
                    discount: 50
                },
                {
                    code: 'FREE',
                    message: 'Entirely Free!',
                    discount: 100
                }
            ]
        });
        
        vm = wrapper.vm;
    });

    it('accepts a coupon code', () => {
        expect(wrapper.contains('input.coupon-code')).toBe(true); 
    });

    it('validates a real user-provided coupon code', async () => {
        enterCouponCode('50OFF');

        await vm.$nextTick();

        expect(vm.valid).toBe(true);
        expect(wrapper.html()).toContain('Coupon Redeemed: 50% Off!');
    });

    it('validates a fake provided coupon code', async () => {
        enterCouponCode('30OFF');

        await vm.$nextTick();

        expect(vm.valid).toBe(false);
        expect(wrapper.html()).toContain('Invalid Coupon Code!');
    });

    it('broadcasts the percentage discount when a valid coupon code is applied', async () => {
        
        enterCouponCode('50OFF');

        await vm.$nextTick();

        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([50]);
    });

    function enterCouponCode(code){
        const couponCode = wrapper.find('input.coupon-code');
        couponCode.element.value = code;
        couponCode.trigger('input');
    }

});