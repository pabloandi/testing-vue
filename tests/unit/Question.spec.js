import { mount } from '@vue/test-utils';
import expect from 'expect';
import Question from '@/components/Question';

describe('Question', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        });
    });

    it('presents the title and the body', () => {
        see('The title');
        see('The body');
    });

    it('can be edited', async () => {
        expect(wrapper.contains('input[name=title')).toBe(false);

        await wrapper.find('#edit').trigger('click');

        expect(wrapper.find('input[name=title').element.value).toBe('The title');
        expect(wrapper.find('textarea[name=body').element.value).toBe('The body');
    });

    it('hides the edit button during edit mode', async () => {
        await wrapper.find('#edit').trigger('click');

        expect(wrapper.contains('#edit')).toBe(false);
    });

    it('updates the question after editing', async () => {
        click('#edit');
        
        await wrapper.vm.$nextTick();

        type('input[name=title]', 'Changed title');
        type('textarea[name=body]', 'Changed body');

        click('#update');
        
        await wrapper.vm.$nextTick();

        see('Changed title');
        see('Changed body');

    });

    it.only('can cancel out of editing mode', async () => {
        click('#edit');

        await wrapper.vm.$nextTick();

        type('input[name=title]', 'Changed title');

        await wrapper.vm.$nextTick();
        
        click('#cancel');

        await wrapper.vm.$nextTick();

        see('The title');

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