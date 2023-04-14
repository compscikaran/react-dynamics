import { applyMiddleware, createStore } from 'redux';
import { DynamicEvents, LOCAL_STORAGE_API_URL, LOCAL_STORAGE_APP_NAME, LOCAL_STORAGE_UNIQ_ID } from '../lib/constants';
import { retrieveTelemetry } from '../lib/service/telemetryService';
import { setupDynamics } from './common';
import dynamicsMiddleware from '../lib/DynamicsMiddleware';

describe('Telemetry captures Click event', () => {
    setupDynamics();

    const initialState = { value: 0 };
    const INCREMENT = 'INCREMENT';
    const ADD = 'ADD';
    const increment = () => ({ type: INCREMENT });
    const add = (amount) => ({ type: ADD, payload: amount})
    
    
    const reducer = (state = initialState, action) => {
        if(action.type == INCREMENT) {
            return { value: state.value + 1 }
        }
    
        if(action.type == ADD) {
            return { value: state.value + action.payload }
        }
        return state;
    }

    const store = createStore(reducer, applyMiddleware(dynamicsMiddleware));

    store.dispatch(increment());
    store.dispatch(add(10));

    test('actions are captured', async () => {
        const data = await retrieveTelemetry();
        console.log(data);
        const mouseEventPresent = data.filter(x => x.event == DynamicEvents.REDUX_ACTION);
        expect(mouseEventPresent.length).toBe(2);
    });

    
});