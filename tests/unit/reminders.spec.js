import { mount } from '@vue/test-utils';
import expect from 'expect';
import Reminders from '@/components/Reminders';

describe('Reminders', () =>{
    let wrapper, vm;

    beforeEach(() => {
        wrapper = mount(Reminders);
        vm = wrapper.vm;
    });

    it('hides the reminders list if there are none', () => {
        expect(wrapper.contains('ul')).toBe(false);
    });

    it('can add reminders', async () => {
        
        addReminder('Go to the store');

        await vm.$nextTick();

        expect(reminderList()).toContain('Go to the store');
    });

    it('can remove any reminder', async () => {
        addReminder('Go to the store');
        addReminder('Finish screencast');
        
        await vm.$nextTick();

        const deleteButton = wrapper.find('ul > li:first-child .remove');
        await deleteButton.trigger('click');
        
        expect(reminderList()).not.toContain('Go to the store');
        expect(reminderList()).toContain('Finish screencast');

    });

    function addReminder(body){
        const newReminder = wrapper.find('.new-reminder');

        newReminder.element.value = body;
        newReminder.trigger('input');
        wrapper.find('button').trigger('click');
    }

    function reminderList(){
        return wrapper.find('ul').text();
    }
});