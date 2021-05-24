export const userNavBar = () => {
    return `
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#dashboard" id="userDashboard"><i class="fas fa-file-alt"></i> Dashboard</a>
            </li>
        </div>
        <div class="navbar-nav" ${/*style ="position:relative;"*/''}>
            <li class="nav-item">
                <a class="nav-link" href="#notifications" id="Notifications">
                    <i class="fas fa-bell"></i> 
                    Messages
                    <!--<span class="badge">2</span>-->
                </a>
            </li>
        </div>
        <!--
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#my_data" id="userData"> My Data</a>
            </li>
        </div>
        -->
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#agreements" id="userAgreements"> Forms</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#settings" id="userSettings"> My Profile</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#payment" id="connectPayment"> Payment</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#samples" id="connectSamples"> Samples</a>
            </li>
        </div>
    
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#support" id="connectSupport"> Support</a>
            </li>
        </div>
        
        <!--
        <div class="navbar-nav">
            <li class="nav-item">
                <a target="_blank" class="nav-link" href="https://github.com/episphere/connect/issues" title="Please create an issue if you encounter any"><i class="fas fa-bug"></i> Report issue</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a target="_blank" class="nav-link" href="https://github.com/episphere/connect/projects/1" title="GitHub Projects page"><i class="fas fa-tasks"></i> GitHub Projects</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a target="_blank" class="nav-link" href="https://gitter.im/episphere/connect" title="Chat with us"><i class="fas fa-comments"></i> Chat with us</a>
            </li>
        </div>
        -->
        <div class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#sign_out" id="signOut" title="Sign Out"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
            </li>
        </div>
    `;
}

export const homeNavBar = () => {
    return `
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#" id="home" title="Home"> Home</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a target="_blank" class="nav-link" href="https://github.com/episphere/connect/issues" title="Please create an issue if you encounter any"> Report issue</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a target="_blank" class="nav-link" href="https://github.com/episphere/connect/projects/1" title="GitHub Projects page"> GitHub Projects</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a target="_blank" class="nav-link" href="https://gitter.im/episphere/connect" title="Chat with us"> Chat with us</a>
            </li>
        </div>
    `;
}