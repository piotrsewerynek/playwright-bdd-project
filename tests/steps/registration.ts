import { Browser, Page, BrowserContext, chromium } from '@playwright/test';
import { createBdd } from "playwright-bdd";
import { HomePage } from '../page-objects/HomePage';
import { MailPage } from '../page-objects/MailPage';
import { VerificationPage } from "../page-objects/VerificationPage";
import { generateUserData } from "../utils/UserData";
import { MessageType } from "../../enum/PageEnum"

type UserData = {
    email: string
}

const { Given, When, Then, BeforeAll, AfterAll } = createBdd();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let mailPage: MailPage;
let activationPage: Page;
let verificationPage: VerificationPage
let userData: UserData = generateUserData();


BeforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);
    mailPage = new MailPage(page);
});

AfterAll(async () => {
    await context.close();
    await browser.close();
});

Given('the user is on the site homepage', async () => {
    await homePage.open();
});

When('the user subscribes to the newsletter with a valid email', async () => {
    await homePage.fillUserMailAddress(userData.email)
    await homePage.checkAcceptTermsCheckbox();
    await homePage.clickSignupButton();
    await homePage.waitForSuccessSubscribeMessage(MessageType.SUBSCRIPTION);
});

Then('the user receives a verification email and clicks the link', async () => {
    const newPage = await context.newPage();
    await newPage.goto(process.env.MAIL_URL);
    mailPage = new MailPage(newPage);
    await mailPage.checkInbox(userData.email);
    await mailPage.waitAndClickOnMail(process.env.MAIL_TEXT);
    activationPage = await mailPage.clickOnActivationLink(process.env.BASE_URL);
});

Then('the user\'s email is successfully verified', async () => {
    verificationPage = new VerificationPage(activationPage);
    await verificationPage.verifySuccessMessage(MessageType.VERIFICATION_SUCCESS)
});
