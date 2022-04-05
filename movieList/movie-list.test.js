const { Builder, Capabilities, By } = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test('Add movie adds item to list', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Avengers')

    await driver.findElement(By.xpath('//button')).click()

    await driver.sleep(2000)

    let aMovie = await driver.findElement(By.xpath('//li')).isDisplayed()

    expect(aMovie).toBeTruthy()
})

test('X movie removes item from list', async () => {
    let aMovie = await driver.findElement(By.xpath('//li'))

    await driver.findElement(By.id('Avengers')).click()

    await driver.sleep(1000)

    expect(aMovie).toBeFalsy

})

test('Add Avengers adds avengers specifically', async () => {
    const movie = 'Avengers'

    await driver.findElement(By.xpath('//input')).sendKeys(movie)

    await driver.findElement(By.xpath('//button')).click()

    const avengers = await driver.findElement(By.xpath('//li/span')).getText()

    expect(avengers).toEqual(movie)
})