import { urls , isParticipantDataDestroyed, appState, translateHTML } from "../shared.js";
import fieldMapping from '../fieldToConceptIdMapping.js';

export const userNavBar = (response) => {
    const disabledClass = isParticipantDataDestroyed(response.data) ? 'disabled': '';
    const hiddenClass = response.code === 200 && response.data['699625233'] === 353358909 && response.data['919254129'] === 353358909 ? '': 'hidden';

    let template = translateHTML(`
        
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#dashboard" id="userDashboard" data-i18n="navbar.dashboardLink"> Dashboard</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border" ${/*style ="position:relative;"*/''}>
            <li class="nav-item">
                <a class="nav-link ${disabledClass}" href="#messages" id="Notifications" data-i18n="navbar.messagesLink">
                    Messages
                    <!--<span class="badge">2</span>-->
                </a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#forms" id="userAgreements" data-i18n="navbar.formsLink">Forms</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link ${disabledClass}" href="#myprofile" id="userSettings" data-i18n="navbar.profileLink">My Profile</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link ${disabledClass}" href="#payment" id="connectPayment" data-i18n="navbar.paymentLink"> My Payment</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link ${disabledClass}" ${hiddenClass} href="#samples" id="connectSamples" data-i18n="navbar.samplesLink"> My Samples</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link ${disabledClass}" href="#support" id="connectSupport" data-i18n="navbar.supportLink"> Support</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border ml-auto">
            <li class="nav-item" data-i18n="navbar.signOutLink">
                <a class="nav-link" href="#sign_out" id="signOut" title="Sign Out"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
            </li>
        </div>
    `);

    return template;
}

export const homeNavBar = () => {
    return translateHTML(`
        <div class="navbar-nav transparent-border">
            <li class="nav-item" data-i18n="navbar.homeLink">
                <a class="nav-link" href="#" id="home" title="Home"> Home</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item" data-i18n="navbar.aboutLink">
                <a class="nav-link" href="#about" id="about" title="About"> About</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item" data-i18n="navbar.expectationsLink">
                <a class="nav-link" href="#expectations" id="expectations" title="Expectations"> What to expect</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item" data-i18n="navbar.privacyLink">
                <a class="nav-link" href="#privacy" id="privacy" title="Privacy"> Privacy</a>
            </li>
        </div>
    `);
}

export const languageSelector = () => {
    const selectedLanguage = appState.getState().language;
    return translateHTML(`
        <div id="languageSelectorTitle" data-i18n="languageSelector.title">Preferred Language</div>
        <select  id="languageSelector">
            <option value="${fieldMapping.language.en}" ${selectedLanguage === fieldMapping.language.en ? 'selected' : ''} data-i18n="languageSelector.englishOption">English</option>
            <option value="${fieldMapping.language.es}" ${selectedLanguage === fieldMapping.language.es ? 'selected' : ''} data-i18n="languageSelector.spanishOption">Spanish</option>
        </select>
    `);
}