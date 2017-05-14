/**
 * Created by brett.hadley on 10/10/2016.
 */
const chai              = require('chai');
const chaiEnzyme        = require('chai-enzyme');
const {JSDOM}           = require('jsdom');
const exposedProperties = ['window', 'navigator', 'document'];
const XMLHttpRequest    = require('xmlhttprequest').XMLHttpRequest;
const server            = require('./server');
const net               = require('net');

const API_SERVER_PORT   = 9988;

const dom      = new JSDOM();
const document = dom.window.document;
const window   = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

//Do we need to Launch API Server?
function launchAPIServer() {

    return new Promise((resolve, reject) => {

        const testServer = net.createServer();

        testServer.once('error', function (err) {

            // port is currently in use
            if (err.code === 'EADDRINUSE') {
                return resolve(true);
            }

            reject(err);
        });

        testServer.once('listening', function () {

            //Port is available, Let's close and run our API Server
            testServer.close();
            server.listen(API_SERVER_PORT);

            return resolve(true);
        });

        testServer.listen(API_SERVER_PORT);
    });

}

launchAPIServer().then(() => {
    chai.use(chaiEnzyme());
}).catch(err => {
    console.error(err);
});
