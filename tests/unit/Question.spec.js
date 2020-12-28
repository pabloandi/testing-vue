import { mount } from '@vue/test-utils';
import expect from 'expect';
import Question from '@/components/Question';
import moxios from 'moxios';

describe('Question', () => {
    let wrapper;

    beforeEach(() => {
        moxios.install();

        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        });

    });

    afterEach(() => {
        moxios.uninstall();
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

    it.only('updates the question after editing', async () => {
        await click('#edit');
        
        await wrapper.vm.$nextTick();

        type('input[name=title]', 'Changed title');
        type('textarea[name=body]', 'Changed body');

        moxios.stubRequest(/questions\/\d+/, {
            status: 200,
            response: {
                title: 'Changed title',
                body: 'Changed body',
            }
        });

        await click('#update');
        
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        see('Changed title');
        see('Changed body');

        see('Your question has been updated.');
        

    });

    it('can cancel out of editing mode', async () => {
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