const {
    MessageChannel
} = require('worker_threads');


const {
    port1,
    port2
} = new MessageChannel();

port1.on('message', (message) => {
    console.log('received', message)
});
port2.postMessage({
    foo: 'bar'
});

// prints: received { foo: 'bar' } from the `port1.on('message')` listener