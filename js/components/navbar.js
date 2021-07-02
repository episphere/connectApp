import { urls } from "../shared.js";

export const userNavBar = () => {
    return `
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#dashboard" id="userDashboard"> Dashboard</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border" ${/*style ="position:relative;"*/''}>
            <li class="nav-item">
                <a class="nav-link" href="#messages" id="Notifications">
                    Messages
                    <!--<span class="badge">2</span>-->
                </a>
            </li>
        </div>
        <!--
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#my_data" id="userData"> My Data</a>
            </li>
        </div>
        -->
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#forms" id="userAgreements">Forms</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#myprofile" id="userSettings">My Profile</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#payment" id="connectPayment"> My Payment</a>
            </li>
        </div>
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#samples" id="connectSamples"> Samples</a>
            </li>
        </div>
    
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#support" id="connectSupport"> Support</a>
            </li>
        </div>
        
        <div class="navbar-nav transparent-border ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#sign_out" id="signOut" title="Sign Out"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
            </li>
        </div>
    `;
}

export const homeNavBar = () => {
    return `
        <div class="navbar-nav transparent-border">
            <li class="nav-item">
                <a class="nav-link" href="#" id="home" title="Home"> Home</a>
            </li>
        </div>
        ${location.host !== urls.prod && location.host !== urls.stage ? `
            <div class="navbar-nav transparent-border">
                <li class="nav-item">
                    <a target="_blank" class="nav-link" href="https://github.com/episphere/connect/issues" title="Please create an issue if you encounter any"> Report issue</a>
                </li>
            </div>
            <div class="navbar-nav transparent-border">
                <li class="nav-item">
                    <a target="_blank" class="nav-link" href="https://github.com/episphere/connect/projects/1" title="GitHub Projects page"> GitHub Projects</a>
                </li>
            </div>
            <div class="navbar-nav transparent-border">
                <li class="nav-item">
                    <a target="_blank" class="nav-link" href="https://gitter.im/episphere/connect" title="Chat with us"> Chat with us</a>
                </li>
            </div>
        `: ``}
    `;
}