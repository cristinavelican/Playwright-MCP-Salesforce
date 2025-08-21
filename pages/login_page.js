import {expect} from '@playwright/test'
class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameField = page.getByRole('textbox', { name: 'Username' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.locator('#Login');
        this.remindMeLaterButton = page.getByRole('link', { name: 'Remind Me Later' });
    }

    async login(username, password) {
        const homePage = process.env.SF_BASE_URL + 'lightning/setup/SetupOneHome/home'
        console.log('Logging in to Salesforce with the following credentials:');
        console.log(homePage);
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
        await this.remindMeLaterButton.click();
        try{

            await this.page.waitForURL(homePage, { timeout: 10000 });
            await expect(this.page).toHaveURL(homePage);
            console.log('Login successful, home page loaded');
            
        }
        catch (error) {
            console.error('Login failed or home page did not load:', error);
            throw new Error('Login failed or home page did not load');
        }
    }
}   
export { LoginPage };