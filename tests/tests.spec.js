
const { test, expect, chromium } = require('@playwright/test');
const fieldMapping = require('../js/fieldToConceptIdMapping').default;
require('dotenv').config()

class PlaywrightDevPage {
  constructor(page) {
    this.page = page;

  }

  getPage() {
    return this.page;
  }

  async goto() {
    await this.page.goto('http://localhost:5000/index.html');
  }

  async standardTests() {
    // Applies to all pages
    // Check that we're on the dashboard
    await expect(this.page).toHaveURL(/.*#dashboard/);

    // Should always be here
    let nciGovDiv = await this.page.locator('div.nci-gov');
    await expect(nciGovDiv).toContainText('National Cancer Institute - Cancer.gov');
  }

  async login() {
    const page = this.page;

    // Agree to test conditions
    await page.locator('#testingAccessCode').click();
    await page.locator('#testingAccessCode').pressSequentially('agree');
    await page.getByRole('button', { name: 'Close' }).click();

    // Now sign in
    await page.getByRole('button', { name: 'Sign In' }).click();
    const usernameInput = await page.locator('#accountInput');
    await usernameInput.click();
    await usernameInput.fill(process.env.USERNAME);
    await usernameInput.press('Tab')
    // await page.getByText('Phone or Email Phone Format: 123-456-7890 Please enter a valid email or phone').click();
    await page.locator('#signInBtn').click();
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill(process.env.PASSWORD);

    await page.getByRole('button', { name: 'Sign In' }).click();

    // await Promise.all([page.getByRole('button', { name: 'Sign In' }).click(), page.waitForResponse(resp => resp.url().includes('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword'))]);
  }

  async interceptUserData(dataOverrides) {
    await this.page.route('https://us-central1-nih-nci-dceg-connect-dev.cloudfunctions.net/app?api=getUserProfile', async route => {
      // Intercept get user request and override data as needed
      try {
        const request = route.request();
        // Fetch original response.
        if (this.page.isClosed()) {
          console.warn('Page is closed');
          return;
        }
        const response = await route.fetch().catch(error => {
          console.error('Error in route.fetch', error);
          throw error;
        });
        let json = await response.json().catch(error => {
          console.error('Error in response.json', error);
          throw error;
        });
        // console.log('Original response json', JSON.stringify(json, null, '\t'));

        // Override user information
        Object.assign(json.data, dataOverrides);

        try {
          await route.fulfill({ response, json });
        } catch (err) {
          console.warn('Error specifically in route.fulfill', err);
        }

      } catch (err) {
        console.warn(`Error processing request: ${err}`)
      }
    });
  }

  async pause() {
    await this.page.pause();
  }

  async healthcareProviderPageTests(submit) {
    let pageObj = this.page;
    // @TODO Also add in navigation to the next page and possibly some validation testing first.
    const eligibilityForm = await pageObj.locator('#eligibilityForm');
    await expect(eligibilityForm).toBeVisible();
    await expect(eligibilityForm).toContainText('Who is your healthcare provider?');

    const selector = await pageObj.getByLabel('Who is your healthcare provider?');
    const options = await eligibilityForm.getByRole('option');
    // Currently we have 10 healthcare providers, plus one more option for the no selection
    await expect(options).toHaveCount(12);

    // Select the first option that's not no selection
    selector.selectOption({ index: 1 });

    if (submit) {
      await pageObj.getByRole('button', { name: 'Submit' }).click();
      await pageObj.getByRole('button', { name: 'Yes' }).click();
    }
  }

  async howDidYouHearAboutUsTests(submit) {
    let pageObj = this.page;

    let heardAboutStudyForm = await pageObj.locator('#heardAboutStudyForm');
    await expect(heardAboutStudyForm).toBeVisible();
    await expect(heardAboutStudyForm).toContainText("How did you hear about this study? (Select all that apply)");
    let checkboxesCount = Object.keys(fieldMapping.heardAboutStudyCheckBoxes).length;
    let listItems = await pageObj.getByRole('checkbox');
    expect(listItems).toHaveCount(checkboxesCount);
    // await pageObj.pause();
    // await pageObj.pause();
    // await listItems.click();
    // await listItems.nth(5).dispatchEvent('click');
    // await document.querySelector('#checkbox1').click();
    await pageObj.click('input[id="checkbox8"]');

    // await pageObj.locator('#checkbox1').dispatchEvent('click');


    if (submit) {
      // await pageObj.getByRole('button', { name: 'Submit' }).click();
    }
  }

}

test.describe('UI tests', () => {
  let context, page;
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      serviceWorkers: 'block'
    });
    page = new PlaywrightDevPage(await context.newPage());
    await page.goto();
  });

  test('Awaiting SSN', async () => {

    await page.interceptUserData({
      [fieldMapping.healthcareProvider]: fieldMapping.nci,
      [fieldMapping.consentSubmitted]: fieldMapping.yes,
      [fieldMapping.verification]: fieldMapping.verified,
      [fieldMapping.userProfileSubmittedAutogen]: fieldMapping.yes,
      [fieldMapping.dateRequestedDataDestroy]: undefined,
      [fieldMapping.dataDestroyCategorical]: undefined,
      [fieldMapping.destroyData]: fieldMapping.no,
      [fieldMapping.withdrawConsent]: fieldMapping.no,
      [fieldMapping.revokeHipaa]: fieldMapping.no,
      verifiedSeen: true,
      [fieldMapping.heardAboutStudyForm]: {
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox1]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox2]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox3]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox4]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox5]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox6]: fieldMapping.yes,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox7]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox8]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox9]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox10]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox11]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox12]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox13]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox14]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox15]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox16]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox17]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox18]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox19]: fieldMapping.no
      },
      // SSN not yet completed
      [fieldMapping.ModuleSsn.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module1.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module2.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module3.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module4.statusFlag]: fieldMapping.moduleStatus.notStarted
    });

    // Log in
    await page.login();

    await page.standardTests();

    // Check that navbar contains the expected tabs
    let pageObj = page.getPage();
    let navbar = await pageObj.getByRole('navigation');
    await expect(navbar.getByRole('listitem')).toHaveText(
      ["Dashboard", "Messages", "Forms", "My Profile", "My Payment", "My Samples", "Support", "Sign Out"]
    );

    // To Do tab
    let surveyMainBody = await pageObj.locator('#surveyMainBody');
    await expect(surveyMainBody.getByRole('list')).toHaveCount(1);
    let surveys = (surveyMainBody.getByRole('listitem'));
    await expect(surveys).toHaveCount(6);

    await Promise.all([
      'First Survey',
      'Background and Overall Health',
      'Where You Live and Work',
      'Medications, Reproductive Health, Exercise, and Sleep',
      'Smoking, Alcohol, and Sun Exposure',
      'Your Social Security Number (SSN)'
    ].map((text, index) => expect(surveys.nth(index)).toContainText(text)));

    // Completed tab
    await pageObj.locator('#surveysCompleted').click();
    await expect(surveyMainBody.getByRole('list')).toHaveCount(1);
    surveys = (surveyMainBody.getByRole('listitem'));
    await expect(surveys).toHaveCount(0);

  });

  test('SSN completed but no other modules', async () => {

    // User should have surveys enabled
    await page.interceptUserData({
      [fieldMapping.healthcareProvider]: fieldMapping.nci,
      [fieldMapping.consentSubmitted]: fieldMapping.yes,
      [fieldMapping.verification]: fieldMapping.verified,
      [fieldMapping.userProfileSubmittedAutogen]: fieldMapping.yes,
      [fieldMapping.dateRequestedDataDestroy]: undefined,
      [fieldMapping.dataDestroyCategorical]: undefined,
      [fieldMapping.destroyData]: fieldMapping.no,
      [fieldMapping.withdrawConsent]: fieldMapping.no,
      [fieldMapping.revokeHipaa]: fieldMapping.no,
      verifiedSeen: true,
      [fieldMapping.heardAboutStudyForm]: {
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox1]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox2]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox3]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox4]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox5]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox6]: fieldMapping.yes,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox7]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox8]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox9]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox10]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox11]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox12]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox13]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox14]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox15]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox16]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox17]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox18]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox19]: fieldMapping.no
      },
      // No modules but SSN yet completed
      [fieldMapping.ModuleSsn.statusFlag]: fieldMapping.moduleStatus.submitted,
      [fieldMapping.Module1.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module2.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module3.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module4.statusFlag]: fieldMapping.moduleStatus.notStarted
    });

    // Log in
    await page.login();

    await page.standardTests();

    // Check that navbar contains the expected tabs
    let pageObj = page.getPage();
    let navbar = await pageObj.getByRole('navigation');
    await expect(navbar.getByRole('listitem')).toHaveText(
      ["Dashboard", "Messages", "Forms", "My Profile", "My Payment", "My Samples", "Support", "Sign Out"]
    );

    // Check that the Dashboard subtabs have the right options available
    let subtabs = await pageObj.locator('ul.nav');
    await expect(subtabs.getByRole('listitem')).toHaveText(
      ["To Do", "Completed"]
    );

    // To Do tab
    let surveyMainBody = await pageObj.locator('#surveyMainBody');
    let surveys = await surveyMainBody.getByRole('list').getByRole('listitem');
    await expect(surveys).toHaveCount(5);
    let parentSurvey = await surveys.nth(0);
    await expect(parentSurvey).toContainText(`First Survey
    This survey is split into four sections that ask about a wide range of topics, including information about your medical history, family, work, and health behaviors. You can answer all of the questions at one time, or pause and return to complete the survey later. If you pause, your answers will be saved so you can pick up where you left off. You can skip any questions that you do not want to answer.`);

    await Promise.all([
      'First Survey',
      'Background and Overall Health',
      'Where You Live and Work',
      'Medications, Reproductive Health, Exercise, and Sleep',
      'Smoking, Alcohol, and Sun Exposure'
    ].map((text, index) => expect(surveys.nth(index)).toContainText(text)));

    // Completed tab
    await pageObj.locator('#surveysCompleted').click();
    surveys = await surveyMainBody.getByRole('list').getByRole('listitem');
    await expect(surveys).toHaveCount(1);
    await expect(surveys).toContainText('Your Social Security Number (SSN)');
  });

  test('User destroy data, forms not signed', async () => {

    // Spoof user having data set to destroy
    await page.interceptUserData({
      [fieldMapping.destroyData]: fieldMapping.yes,
      [fieldMapping.hipaaRevocationSigned]: fieldMapping.no,
      [fieldMapping.dataDestructionRequestSigned]: fieldMapping.no,

    });

    // Log in
    await page.login();

    await page.standardTests();

    // @TODO: Specific tests

    // Check that the verification message is present
    let pageObj = page.getPage();
    let verificationMessage = await pageObj.locator('#verificationMessage');
    await expect(verificationMessage).toBeVisible();
    await expect(verificationMessage).toContainText('You have a new form to sign.');
    await expect(verificationMessage).toContainText("You have withdrawn from Connect. We will not collect any more data from you. If you have any questions, please contact the Connect Support Center by calling 1-877-505-0253 or by emailing ConnectSupport@norc.org.");
  });

  test('User destroy data, both forms signed', async () => {

    // Spoof user having data set to destroy
    await page.interceptUserData({
      [fieldMapping.destroyData]: fieldMapping.yes,
      [fieldMapping.hipaaRevocationSigned]: fieldMapping.yes,
      [fieldMapping.dataDestructionRequestSigned]: fieldMapping.yes
    });

    // Log in
    await page.login();

    await page.standardTests();

    // Check that the verification message is present
    let pageObj = page.getPage();
    let verificationMessage = await pageObj.locator('#verificationMessage');
    await expect(verificationMessage).toBeVisible();
    await expect(verificationMessage).toContainText("You have withdrawn from Connect. We will not collect any more data from you. If you have any questions, please contact the Connect Support Center by calling 1-877-505-0253 or by emailing ConnectSupport@norc.org.");
  });

  test('User data destroyed', async () => {

    // Spoof user having data set to destroy
    await page.interceptUserData({
      [fieldMapping.destroyData]: fieldMapping.yes,
      [fieldMapping.hipaaRevocationSigned]: fieldMapping.yes,
      [fieldMapping.dataDestructionRequestSigned]: fieldMapping.yes,
      [fieldMapping.dateRequestedDataDestroy]: '2024-04-08T16:22:54.687Z',
      [fieldMapping.dataDestroyCategorical]: fieldMapping.requestedDataDestroySigned

    });

    // Log in
    await page.login();

    await page.standardTests();

    // Check that the verification message is present
    let pageObj = page.getPage();
    let verificationMessage = await pageObj.locator('#verificationMessage');
    await expect(verificationMessage).toBeVisible();
    await expect(verificationMessage).toContainText("At your request, we have deleted your Connect data. If you have any questions, please contact the Connect Support Center by calling 1-877-505-0253 or by emailing ConnectSupport@norc.org.");
  });

  test('User needs to provide heard about study', async () => {

    await page.interceptUserData({
      [fieldMapping.healthcareProvider]: fieldMapping.nci,
      [fieldMapping.consentSubmitted]: fieldMapping.yes,
      [fieldMapping.verification]: fieldMapping.verified,
      [fieldMapping.userProfileSubmittedAutogen]: fieldMapping.yes,
      [fieldMapping.dateRequestedDataDestroy]: undefined,
      [fieldMapping.dataDestroyCategorical]: undefined,
      [fieldMapping.destroyData]: fieldMapping.no,
      [fieldMapping.withdrawConsent]: fieldMapping.no,
      [fieldMapping.revokeHipaa]: fieldMapping.no,
      verifiedSeen: true,
      [fieldMapping.heardAboutStudyForm]: undefined,
      // SSN not yet completed
      [fieldMapping.ModuleSsn.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module1.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module2.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module3.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module4.statusFlag]: fieldMapping.moduleStatus.notStarted
    });

    // Log in
    await page.login();

    await page.standardTests();

    await page.howDidYouHearAboutUsTests();
  });

  test('User needs to provide PIN', async () => {

    let userPIN = 123456;
    await page.interceptUserData({
      [fieldMapping.healthcareProvider]: undefined,
      [fieldMapping.consentSubmitted]: fieldMapping.yes,
      [fieldMapping.verification]: fieldMapping.verified,
      [fieldMapping.userProfileSubmittedAutogen]: fieldMapping.yes,
      [fieldMapping.destroyData]: fieldMapping.yes,
      [fieldMapping.hipaaRevocationSigned]: fieldMapping.yes,
      [fieldMapping.dataDestructionRequestSigned]: fieldMapping.yes,
      [fieldMapping.dateRequestedDataDestroy]: '2024-04-08T16:22:54.687Z',
      [fieldMapping.dataDestroyCategorical]: fieldMapping.requestedDataDestroySigned,
      verifiedSeen: true,
      [fieldMapping.heardAboutStudyForm]: {
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox1]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox2]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox3]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox4]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox5]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox6]: fieldMapping.yes,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox7]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox8]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox9]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox10]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox11]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox12]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox13]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox14]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox15]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox16]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox17]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox18]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox19]: fieldMapping.no
      },
      [fieldMapping.pinNumber]: userPIN,
      // SSN not yet completed
      [fieldMapping.ModuleSsn.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module1.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module2.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module3.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module4.statusFlag]: fieldMapping.moduleStatus.notStarted
    });

    // Log in
    await page.login();

    await page.standardTests();

    let pageObj = page.getPage();
    // @TODO
    const requestPINForm = await pageObj.locator('#requestPINForm');
    await expect(requestPINForm).toBeVisible();
    await expect(requestPINForm).toContainText(`If you received a PIN as part of your study invitation, please enter it here.`);
    await expect(requestPINForm).toContainText(`Your PIN should be 6 characters and will include only numbers and uppercase letters.`)

    const participantPINInput = await pageObj.locator('#participantPIN');
    await expect(participantPINInput).toBeVisible();

    const pinSubmitButton = await pageObj.locator('#pinSubmit');
    await expect(pinSubmitButton).toBeVisible();

    const noPinSubmitButton = await pageObj.locator('#noPinSubmit');
    await expect(noPinSubmitButton).toBeVisible();

    // await noPinSubmitButton.click();

    participantPINInput.pressSequentially(userPIN.toString());
    await pinSubmitButton.click();

    await page.healthcareProviderPageTests(true);

    // @TODO: This code here is the same for noPinSubmitButton, pinSubmitButton and the next use case,
    // in which there is no PIN but the healthcare provider info has not been provided.
    // Factor that out and call it in multiple places.
  });

  test('User has no PIN', async () => {

    let userPIN = 123456;
    await page.interceptUserData({
      [fieldMapping.healthcareProvider]: undefined,
      [fieldMapping.consentSubmitted]: fieldMapping.yes,
      [fieldMapping.verification]: fieldMapping.verified,
      [fieldMapping.userProfileSubmittedAutogen]: fieldMapping.yes,
      [fieldMapping.destroyData]: fieldMapping.yes,
      [fieldMapping.hipaaRevocationSigned]: fieldMapping.yes,
      [fieldMapping.dataDestructionRequestSigned]: fieldMapping.yes,
      [fieldMapping.dateRequestedDataDestroy]: '2024-04-08T16:22:54.687Z',
      [fieldMapping.dataDestroyCategorical]: fieldMapping.requestedDataDestroySigned,
      verifiedSeen: true,
      [fieldMapping.heardAboutStudyForm]: {
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox1]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox2]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox3]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox4]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox5]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox6]: fieldMapping.yes,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox7]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox8]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox9]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox10]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox11]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox12]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox13]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox14]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox15]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox16]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox17]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox18]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox19]: fieldMapping.no
      },
      [fieldMapping.pinNumber]: userPIN,
      // SSN not yet completed
      [fieldMapping.ModuleSsn.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module1.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module2.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module3.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module4.statusFlag]: fieldMapping.moduleStatus.notStarted
    });

    // Log in
    await page.login();

    await page.standardTests();

    let pageObj = page.getPage();
    // @TODO
    const requestPINForm = await pageObj.locator('#requestPINForm');
    await expect(requestPINForm).toBeVisible();
    await expect(requestPINForm).toContainText(`If you received a PIN as part of your study invitation, please enter it here.
    Your PIN should be 6 characters and will include only numbers and uppercase letters.`)

    const participantPINInput = await pageObj.locator('#participantPIN');
    await expect(participantPINInput).toBeVisible();

    const pinSubmitButton = await pageObj.locator('#pinSubmit');
    await expect(pinSubmitButton).toBeVisible();

    const noPinSubmitButton = await pageObj.locator('#noPinSubmit');
    await expect(noPinSubmitButton).toBeVisible();

    await noPinSubmitButton.click();

    await page.healthcareProviderPageTests(true);

    // @TODO: This code here is the same for noPinSubmitButton, pinSubmitButton and the next use case,
    // in which there is no PIN but the healthcare provider info has not been provided.
    // Factor that out and call it in multiple places.
  });

  test('User needs to provide healthcare provider', async () => {

    await page.interceptUserData({
      [fieldMapping.healthcareProvider]: undefined,
      [fieldMapping.consentSubmitted]: fieldMapping.yes,
      [fieldMapping.verification]: fieldMapping.verified,
      [fieldMapping.userProfileSubmittedAutogen]: fieldMapping.yes,
      [fieldMapping.dateRequestedDataDestroy]: undefined,
      [fieldMapping.dataDestroyCategorical]: undefined,
      [fieldMapping.destroyData]: fieldMapping.no,
      [fieldMapping.withdrawConsent]: fieldMapping.no,
      [fieldMapping.revokeHipaa]: fieldMapping.no,
      verifiedSeen: true,
      [fieldMapping.heardAboutStudyForm]: {
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox1]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox2]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox3]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox4]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox5]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox6]: fieldMapping.yes,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox7]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox8]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox9]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox10]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox11]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox12]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox13]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox14]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox15]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox16]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox17]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox18]: fieldMapping.no,
        [fieldMapping.heardAboutStudyCheckBoxes.checkbox19]: fieldMapping.no
      },
      [fieldMapping.pinNumber]: undefined,
      // SSN not yet completed
      [fieldMapping.ModuleSsn.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module1.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module2.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module3.statusFlag]: fieldMapping.moduleStatus.notStarted,
      [fieldMapping.Module4.statusFlag]: fieldMapping.moduleStatus.notStarted
    });

    // Log in
    await page.login();

    await page.standardTests();

    await page.healthcareProviderPageTests(true);
    await page.howDidYouHearAboutUsTests(true);
  });

  test.afterEach(async ({ browser }) => {
    await page.pause();
    await browser.close();
  });
});