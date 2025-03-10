import { expect, FrameLocator, Page } from '@playwright/test';

export class MailPage {
    readonly page: Page;
    readonly frame: FrameLocator;
    readonly mailFrame = 'iframe[id="html_msg_body"]'
    readonly searchInput = '#search';
    readonly goButton = 'button:text-is("GO")';
    readonly emptyMailbox = '#inbox_specified';
    readonly emailInMailbox = 'tr[ng-repeat="email in emails"]';

    constructor(page: Page) {
        this.page = page;
        this.frame = page.frameLocator(this.mailFrame)
    }

    async checkInbox(email: string): Promise<void> {
        const username = email.split('@')[0];
        await this.page.locator(this.searchInput).fill(username);
        await this.page.locator(this.goButton).click()

        await Promise.race([
            this.page.locator(this.emptyMailbox).waitFor({state: "attached", timeout: 30_000}),
            this.page.locator(this.emailInMailbox).waitFor({state: "attached", timeout: 30_000}),
        ]);
    }

    async waitAndClickOnMail(containText: string, retryThreshold = 10,): Promise<boolean> {
        for (let attempt = 0; attempt <= retryThreshold; attempt++) {
            try {
                await expect(this.page.locator(this.emailInMailbox)).toContainText(containText, {timeout: 5_000});
                await this.page.locator(this.emailInMailbox).filter({ hasText: containText }).click();
                break;
            } catch (error) {
                if (attempt < retryThreshold) {
                    await this.page.reload();
                }
            }
        }
        return false;
    }

    async clickOnActivationLink(pageAddress: string): Promise<Page> {
        const newTab = this.page.waitForEvent('popup');
        await this.frame.getByRole('link', { name: pageAddress }).click();
        return newTab
    }

}
