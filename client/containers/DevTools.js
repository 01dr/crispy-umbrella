/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 13.03.17
 */

import React from 'react';

import { createDevTools } from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultIsVisible={false}>
        <LogMonitor theme='tomorrow' />
    </DockMonitor>
);

export default DevTools;