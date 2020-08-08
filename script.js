require('dotenv').config();
const { Builder, By, Key, until } = require('selenium-webdriver');
let driver = new Builder().forBrowser('chrome').build();

//possibly too many / unnecessary awaits but it works and it runs fast so I dont really care for now
(async () => {
    //stream to farm points in
    await driver.get(process.env.TWITCH_URL);

    //confirm age if the stream is for mature audiences
    try {
        const matureAccept = (await driver).findElement(By.xpath("//*[@data-a-target='player-overlay-mature-accept']"));
        await (await matureAccept).click();
    } catch (error) {
        console.log("not mature-content");
    }

    //toggle mute since streams always play with sound - and it opens in a sort-of incognito tab (mute and watch in the main window)
    try {
        await driver.wait(until.elementLocated(By.xpath("//*[@data-a-target='player-mute-unmute-button']")), 5 * 1000).then(el => {
            return el.click();
        });
    } catch (error) {
        console.log("player mute button not found");
    }

    //login since its a sort-of incognito tab
    //might require a captcha every once in a while
    //doesn't fill out 2fa automatically - for obvious reasons
    (await driver).findElement(By.xpath("//*[@data-a-target='login-button']")).click();

    driver.wait(until.elementLocated(By.xpath("//input[@id='login-username']")), 5 * 1000).then(el => {
        return el.sendKeys(process.env.TWITCH_USERNAME, Key.TAB);
    });
    driver.wait(until.elementLocated(By.xpath("//input[@id='password-input']")), 5 * 1000).then(el => {
        return el.sendKeys(process.env.TWITCH_PASS, Key.ENTER);
    });

    //function looking for the "get extra points" button
    const pointLoop = async () => {
        try {
            //might be a hacky approach but idk how else I'd find the button - idc
            const pointBtn = (await driver).findElement(By.xpath("//*[@class='tw-button tw-button--success tw-interactive']"));
            await (await pointBtn).click();
            console.log("we did it")
        } catch (error) {
            console.log("nope, not yet")
        }
    };

    //triggering the above function every 60 seconds
    setInterval(() => {
        pointLoop();
    }, 60 * 1000);
})();