import { expect, Page } from '@playwright/test';

export class VerificationPage {
    readonly page: Page;
    readonly successMessage = 'div[class="message success"]';


    constructor(page: Page) {
        this.page = page;
    }

    async verifySuccessMessage(messageText: string): Promise<void> {
        await expect(this.page.locator(this.successMessage)).toContainText(messageText);
    }
}