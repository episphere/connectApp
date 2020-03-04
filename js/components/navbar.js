export const userNavBar = () => {
    return `
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#" id="home" title="Home"><i class="fas fa-home"></i> Home</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#user" id="userProfile" title="User"><i class="fas fa-user"></i> User</a>
            </li>
        </div>
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
                <a target="_blank" class="nav-link" href="https://gitter.im/episphere/Connect-AlphaTest" title="Chat with us"><i class="fas fa-comments"></i> Chat with us</a>
            </li>
        </div>
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
                <a class="nav-link" href="#" id="home" title="Home"><i class="fas fa-home"></i> Home</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#sign_in" id="signIn" title="Sign In"><i class="fas fa-sign-in-alt"></i> Sign In</a>
            </li>
        </div>
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
                <a target="_blank" class="nav-link" href="https://gitter.im/episphere/Connect-AlphaTest" title="Chat with us"><i class="fas fa-comments"></i> Chat with us</a>
            </li>
        </div>
    `;
}