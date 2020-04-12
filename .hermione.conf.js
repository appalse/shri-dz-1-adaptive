module.exports = {
    baseUrl: 'http://localhost:3000/',
    gridUrl: 'http://0.0.0.0:4444/wd/hub',
    waitTimeout: 100000,

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};