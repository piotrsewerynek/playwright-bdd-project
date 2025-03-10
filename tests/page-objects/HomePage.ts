import { expect, Page } from '@playwright/test';


export class HomePage {
    readonly page: Page;
    readonly cookieBanner = 'div[class="cookie-message"]';
    readonly acceptCookiesButton = 'a[href="/users/accept_cookies"]';
    readonly mailField = '#SubscriberEmail';
    readonly termsCheckbox = '#SubscriberHomeForm';
    readonly signupButton = 'input[class="btn"]';
    readonly successMessage = 'div[class="modal-content"]';
    readonly okButton = 'a[class^="btn"]:text-is("OK")';

    constructor(page: Page) {
        this.page = page;
    }

    async open(): Promise<void> {
        await this.page.goto('https://sklep.technica.pl/', {waitUntil: 'domcontentloaded'});
        await this.acceptCookies();
    }

    async acceptCookies(): Promise<void> {
        try {
            await expect(this.page.locator(this.cookieBanner)).toBeVisible();
            await this.page.locator(this.acceptCookiesButton).click();
        } catch (error) {
            console.log('Cookie banner not found or already accepted');
        }
    }

    async clickSignupButton(): Promise<void> {
        await this.page.locator(this.signupButton).click();
    }

    async fillUserMailAddress(userMail: string): Promise<void> {
        await this.page.locator(this.mailField).fill(userMail);

    }

    async checkAcceptTermsCheckbox(): Promise<void> {
        await this.page.locator(this.termsCheckbox).getByRole('link').filter({ hasText: /^$/ }).click();
    }

    async waitForSuccessSubscribeMessage(messageText: string): Promise<void> {
        await expect(this.page.locator(this.successMessage).filter({ hasText: 'Newsletter' })).toContainText(messageText);
        await this.page.locator(this.okButton).click();

    }

}
