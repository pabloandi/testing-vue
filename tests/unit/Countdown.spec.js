import { mount } from '@vue/test-utils';
import expect from 'expect';
import Countdown from '@/components/Countdown';
import dayjs from 'dayjs';
import sinon from 'sinon';

describe('Countdown', () => {
    let wrapper, clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
        wrapper = mount(Countdown, {
            propsData: { 
                until: dayjs().add(10,'second') 
            }
        });
    });

    afterEach(() => clock.restore());

    it('renders a countdown timer', async () => {
        see('0 Days');
        see('0 Hours');
        see('0 Minutes');
        see('10 Seconds');
    });

    it('reduces the countdown every second', async () => {

        see('10 Seconds');

        clock.tick(1000);

        await wrapper.vm.$nextTick();
        
        see('9 Seconds');
    });

    it('shows an expired message when the countdown has completed', async () => {

        clock.tick(10000);

        await wrapper.vm.$nextTick();

        see('Now Expired')
    });

    it('shows a custom expired message when the countdown has completed', async () => {
        await wrapper.setProps({ expiredText: 'Contest is over' });

        clock.tick(10000);

        await wrapper.vm.$nextTick();

        see('Contest is over')
    });

    it('broadcasts when the countdown is finished', async () => {

        clock.tick(10000);

        await wrapper.vm.$nextTick();

        expect(wrapper.emitted().finished).toBeTruthy();

    });

    it('clears the interval once completed', async () => {

        clock.tick(10000);

        await wrapper.vm.$nextTick();
        
        clock.tick(5000);
        
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.now.getSeconds()).toBe(10);

    });

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).toContain(text);
    }

    let type = (selector, text) => {
        let node = wrapper.find(selector);
        node.element.value = text;
        node.trigger('input');
    }

    let click = (selector) => {
        wrapper.find(selector).trigger('click');
    }
    
});