import { mount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue';
import expect from 'expect';

describe('Counter', () => {
    
    let wrapper,vm;

    beforeEach(() => {
        wrapper = mount(Counter);
        vm = wrapper.vm;
    });

     it('defaults to a count of 0', () => {
        expect(wrapper.vm.count).toBe(0);
     });

     it('increments the count when the increment button is clicked', () => {
        expect(wrapper.vm.count).toBe(0);
        wrapper.find('.increment').trigger('click');
        expect(wrapper.vm.count).toBe(1);
     });

     it('decrements the count when the decrement button is clicked', () => {
        wrapper.setData({
            count: 5
        });
        wrapper.find('.decrement').trigger('click');
        expect(wrapper.vm.count).toBe(4);
     });

     it('never show the decrement button when counter is 0', async () => {
        expect(wrapper.vm.count).toBe(0);
        expect(wrapper.find('.decrement').isVisible()).toBe(false);
        wrapper.setData({
            count: 5
        });
        await vm.$nextTick();
        expect(wrapper.vm.count).toBe(5);
            
        expect(wrapper.find('.decrement').isVisible()).toBe(true);
     });

     it('presents the current count', () => {
        expect(wrapper.find('.count').html()).toContain(0);
     });
});