import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../examples/App';

describe('App tests', () => {
    it('should contains the heading 1', () => {
    render(<App />);
        setTimeout(10000,window.printTelemetry());
    });
});
