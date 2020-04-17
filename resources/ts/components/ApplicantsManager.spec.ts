import {shallowMount, Wrapper} from '@vue/test-utils';
import ApplicantsManager from './ApplicantsManager.vue';
import flushPromises from 'flush-promises';
import MockAdapter from 'axios-mock-adapter';
import {IApplicant} from '../types';
import axios from 'axios';

const applicants: IApplicant[] = [
    {id: 1, name: 'Nick'},
    {id: 2, name: 'Grant'},
    {id: 3, name: 'Adam'},
    {id: 4, name: 'Colin'},
    {id: 5, name: 'Dan'},
];

describe('ApplicantsManager', () => {
    let wrapper: Wrapper<ApplicantsManager>;
    let mockBackend: MockAdapter;

    beforeEach(async () => {
        mockBackend = new MockAdapter(axios);
        mockBackend.onGet('/applicants').reply(200, Object.values(applicants));
        wrapper = shallowMount(ApplicantsManager);
        await flushPromises()
    });

    afterEach(() => {
        mockBackend.restore();
    });

    it('Starts by displaying all existing applicants', async () => {
        applicants.forEach((applicant) => expect(wrapper.text()).toContain(applicant.name))
    });

    describe('An existing list item', () => {
       it('Allows the name to be edited', () => {
           expect(wrapper.find('.applicant').find('input[type="text"]').exists()).toBe(true)
       });
    });
});
