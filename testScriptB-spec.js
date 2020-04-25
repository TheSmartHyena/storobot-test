const uuid = require("uuid");

describe('Storobot Login test', function() {

    const robotPrice = element(by.id('robotPrice'));
    const robotName = element(by.id('robotName'));
    const addButton = element(by.id('addButton'));

    const baseUrl = "https://sleepy-beyond-45298.herokuapp.com/";
    // const baseUrl = "localhost:4200/";

    const uniqueId = uuid.v4();
    const uniquePrice = 123456789.42;

    let indexOfRobotToDell = -1;

    beforeEach(async () => {
        await browser.driver.get(baseUrl + 'storobot');
    });

    it('should add a robot with unique uuid', async () => {

        const robots = element.all(by.className('robot'));

        robotName.sendKeys(uniqueId);
        robotPrice.sendKeys(uniquePrice);

        await addButton.click();

        const robotTextList = await robots.getText()
        for (let i = 0; i < robotTextList.length; i++) {
            if (robotTextList[i].includes(uniqueId) && robotTextList[i].includes(uniquePrice)) {
                indexOfRobotToDell = i;
                break;
            }
        }

        expect(indexOfRobotToDell).toBeGreaterThan(-1);
    });

    it('should sell a robot with unique uuid', async () => {

        const robots = element.all(by.className('robot'));
        const nbBefore = await robots.count();

        element.all(by.className('sellRobotButton')).get(indexOfRobotToDell).click();

        expect(await robots.count()).toEqual(nbBefore - 1);
    });
});
