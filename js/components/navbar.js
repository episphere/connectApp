import { urls , isParticipantDataDestroyed } from "../shared.js";

export const userNavBar = (response) => {
    const disabledClass = isParticipantDataDestroyed(response.data) ? 'disabled': '';
    const hiddenClass = response.code === 200 && response.data['699625233'] === 353358909 && response.data['919254129'] === 353358909 ? '': 'hidden';

    let template = `
        
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#dashboard" id="userDashboard"> Dashboard</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border" ${/*style ="position:relative;"*/''}>
            <li class="nav-item">
                <a class="nav-link ${disabledClass}" href="#messages" id="Notifications">
                    Messages
                    <!--<span class="badge">2</span>-->
                </a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#forms" id="userAgreements">Forms</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link ${disabledClass}" href="#myprofile" id="userSettings">My Profile</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link ${disabledClass}" href="#payment" id="connectPayment"> My Payment</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link ${disabledClass}" ${hiddenClass} href="#samples" id="connectSamples"> My Samples</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link ${disabledClass}" href="#support" id="connectSupport"> Support</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#sign_out" id="signOut" title="Sign Out"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
            </li>
        </div>
    `;

    return template;
}

export const homeNavBar = () => {
    return `
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#" id="home" title="Home"> Home</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#about" id="about" title="About"> About</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#expectations" id="expectations" title="Expectations"> What to expect</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#privacy" id="privacy" title="Privacy"> Privacy</a>
            </li>
        </div>
    `;
}