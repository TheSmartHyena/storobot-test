exports.config = {

    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['testScriptB-spec.js'],

    onPrepare: async() => {
        const baseUrl = "https://sleepy-beyond-45298.herokuapp.com/";
        // const baseUrl = "localhost:4200/";

        await browser.driver.get(baseUrl + 'log-in');

        const emailInput = element(by.id('emailInput'));
        const passwordInput = element(by.id('passwordInput'));
        const loginButton = element(by.id('loginButton'));

        // For the exercise credentials are here, in real life application i wont put credentials here in clear
        emailInput.sendKeys('userb@fakemail.com');
        passwordInput.sendKeys('Pass789?');
        loginButton.click();

        return browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /home/.test(url);
            });
        }, 10000);
    }
};
