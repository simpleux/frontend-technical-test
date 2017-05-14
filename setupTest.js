/**
 * Created by brett.hadley on 10/10/2016.
 */
const chai              = require('chai');
const chaiEnzyme        = require('chai-enzyme');
const {JSDOM}           = require('jsdom');
const exposedProperties = ['window', 'navigator', 'document'];
const XMLHttpRequest    = require('xmlhttprequest').XMLHttpRequest;

const dom               = new JSDOM();
const document          = dom.window.document;
const window            = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

chai.use(chaiEnzyme());
