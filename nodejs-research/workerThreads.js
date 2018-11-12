const {
    Worker,
    isMainThread,
    parentPort,
    workerData
} = require('worker_threads');


if (isMainThread) {
    module.exports = async function parseJsAsync(script) {
        return new Promise((res, rej) => {
            const worker = new Worker(___filename, {
                workerData: script
            });

            worker.on('message', res);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
            })
        })
    }
} else {
    const {
        parse
    } = require('some-js-parsing-lib');
    const script = workerData;
    parentPort.postMessage(parse(script));
}