/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 13.03.17
 */

/* global __DEV__:true */

if (typeof window === 'undefined') {
    module.exports = require('./store.server');
} else {
    module.exports = __DEV__
        ? require('./store.dev')
        : require('./store.prod');
}
