import { showAnimation, hideAnimation, getMyData, storeResponse, toggleDarkMode, getConceptVariableName } from "../shared.js";

export const renderSettingsPage = async () => {
    showAnimation();
    const myData = await getMyData();
    let template = ''
    console.log(myData)
    if(myData.code === 200 && myData.data['699625233'] !== undefined && myData.data['699625233'] === 353358909){
        const userData = myData.data;
        template += `
            <div class="row" style="margin-top:58px">
                <div class="col-lg-3">
                </div>
                <div class="col-lg-6">
                    <p class="consentHeadersFont" style="color:#606060">
                        My Profile
                    </p>
                    ${userData['399159511'] ? `
                    <div class="userProfileBox">
                        <div class="row">
                            <div class="col">
                                <span class="userProfileLabels">
                                    Name
                                </span>
                            </div>
                            <div class="col">
                                <!--<span class="userProfileEdit" style="float:right" id="nameEditButton">
                                    Edit
                                </span>-->
                            </div>
                        </div>
                        <div class="row userProfileLinePaddings" >
                            <div class="col">
                                <span class="userProfileBodyFonts">
                                    First Name
                                <br>
                                    <b>
                                        ${userData['399159511']}
                                    </b>
                                </span>
                            </div>
                        </div>
                        ${userData['231676651']?`
                        <div class="row userProfileLinePaddings" >
                            <div class="col">
                                <span class="userProfileBodyFonts">
                                    Middle Name
                                <br>
                                    <b>
                                         ${userData['231676651']}
                                    </b>
                                </span>
                            </div>
                        </div>`:''}
                        <div class="row userProfileLinePaddings" >
                            <div class="col">
                                <span class="userProfileBodyFonts">
                                    Last Name
                                <br>
                                    <b>
                                        ${userData['996038075'] ? userData['996038075'] : '<br>'}
                                    </b>
                                </span>
                            </div>
                        </div>
                        ${userData['506826178']? `
                            <div class="row userProfileLinePaddings" >
                                <div class="col">
                                    <span class="userProfileBodyFonts">
                                        Suffix
                                    <br>
                                        <b>
                                            ${await getConceptVariableName(userData['506826178'])}
                                        </b>
                                    </span>
                                </div>
                            </div>
                        `:''}
                        
                        
                    </div>`
                    :''}
                    <div class="userProfileBox">
                        <div class="row">
                            <div class="col">
                                <span class="userProfileLabels">
                                    Contact Information
                                </span>
                            </div>
                            <div class="col">
                            <!--<span class="userProfileEdit" style="float:right">
                                    Edit
                                </span>-->
                            </div>
                        </div>
                        ${userData['388711124']? `
                            <div class="row userProfileLinePaddings" >
                                <div class="col">
                                    <span class="userProfileBodyFonts">
                                        Mobile Phone
                                    <br>
                                        <b>
                                            ${userData['388711124'].substr(0,3)} - ${userData['388711124'].substr(3,3)} - ${userData['388711124'].substr(6,4)}
                                        </b>
                                    </span>
                                </div>
                            </div>
                            <div class="row userProfileLinePaddings" >
                                <div class="col">
                                    <span class="userProfileBodyFonts">
                                        Can we leave a voicemail at this number?
                                    <br>
                                        <b>
                                            ${userData['271757434'] ? (userData['271757434'] === 353358909 ? 'Yes':'No') : 'No'}
                                        </b>
                                    </span>
                                </div>
                            </div>
                            <div class="row userProfileLinePaddings" >
                                <div class="col">
                                    <span class="userProfileBodyFonts">
                                        Can we text this number?
                                    <br>
                                        <b>
                                            ${userData['271757434'] ? (userData['271757434'] === 353358909 ? 'Yes':'No') : 'No'}
                                        </b>
                                    </span>
                                </div>
                            </div>
                        `:''}
                        ${userData['438643922']? `
                            <div class="row userProfileLinePaddings" >
                                <div class="col">
                                    <span class="userProfileBodyFonts">
                                        Home Phone
                                    <br>
                                        <b>
                                            ${userData['438643922'].substr(0,3)} - ${userData['438643922'].substr(3,3)} - ${userData['438643922'].substr(6,4)}
                                        </b>
                                    </span>
                                </div>
                            </div>
                            <div class="row userProfileLinePaddings" >
                                <div class="col">
                                    <span class="userProfileBodyFonts">
                                        Can we leave a voicemail at this number?
                                    <br>
                                        <b>
                                            ${userData['187894482'] ? (userData['187894482'] === 353358909 ? 'Yes':'No') : 'No'}
                                        </b>
                                    </span>
                                </div>
                            </div>
                        `:''}
                        <div class="row userProfileLinePaddings" >
                            <div class="col">
                                <span class="userProfileBodyFonts">
                                    Preferred Email
                                <br>
                                    <b>
                                        ${userData['869588347']}
                                    </b>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="userProfileBox">
                        <div class="row">
                            <div class="col">
                                <span class="userProfileLabels">
                                    Mailing Address
                                </span>
                            </div>
                            <div class="col">
                            <!--
                                <span class="userProfileEdit" style="float:right">
                                    Edit
                                </span>
                                -->
                            </div>
                        </div>
                        <div class="row userProfileLinePaddings" >
                            <div class="col">
                                <span class="userProfileBodyFonts">
                                    Mailing Address
                                <br>
                                    <b>
                                        ${userData['521824358']} ${userData['442166669'] ? userData['442166669'] : ''}</br>
                                        ${userData['703385619']}</br> 
                                        ${userData['634434746']} ${userData['892050548']}
                                    </b>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="userProfileBox">
                        <div class="row">
                            <div class="col">
                                <span class="userProfileLabels">
                                   Sign In Information
                                </span>
                            </div>
                            <div class="col">
                            <!--
                                <span class="userProfileEdit" style="float:right">
                                    Edit
                                </span>
                                -->
                            </div>
                        </div>
                        ${userData['421823980'] ? `
                            <div class="row userProfileLinePaddings" >
                                <div class="col">
                                    <span class="userProfileBodyFonts">
                                        Change Password
                                    </span>
                                </div>
                                <div class="col">
                                    <button id="changePass" class="btn btn-primary save-data consentNextButton" style="float:right;">Change Password</button>
                                </div>
                                
                            </div>
                            <div class="row userProfileLinePaddings" id="changPassGroup" style="display:none;">
                                <div class="col">
                                    <input type="password" id="newPassField" placeholder="Enter new password"/>
                                    <br>
                                    <br>
                                    <input type="password" id="newPassFieldCheck" placeholder="Re-enter new password"/>
                                    <br>
                                    <br>
                                    <button id="changePassSubmit" class="btn btn-primary save-data consentNextButton">Change Password</button>
                                </div>
                            </div>
                            <div class="row userProfileLinePaddings" id="passwordSuccess" style="display:none;">
                                <div class="col">
                                    <span class="userProfileBodyFonts">
                                        Password Change Success!
                                    </span>
                                </div>
                            </div>
                            <div class="row userProfileLinePaddings" id="passwordFail" style="display:none;">
                                <div class="col">
                                    <span id="passError" class="userProfileBodyFonts" style="color:red;">
                                        Password Change Failed!
                                    </span>
                                </div>
                            </div>

                            <br>

                            <div class="row userProfileLinePaddings" >
                                <div class="col">
                                    <span class="userProfileBodyFonts">
                                        Email Address
                                        <br>
                                        <b>
                                            ${userData['421823980']}</br>
                                        </b>
                                    </span>
                                </div>
                                <div class="col">
                                    <button id="changeEmail" class="btn btn-primary save-data consentNextButton" style="float:right;">Change Email</button>
                                </div>
                                
                            </div>
                            <div class="row userProfileLinePaddings" id="changEmailGroup" style="display:none;">
                                <div class="col">
                                    <input id="newEmailField" placeholder="Enter new Email address"/>
                                    <br>
                                    <br>
                                    <input id="newEmailFieldCheck" placeholder="Re-enter new Email address"/>
                                    <br>
                                    <br>
                                    <button id="changeEmailSubmit" class="btn btn-primary save-data consentNextButton">Change Email</button>
                                </div>
                            </div>
                            <div class="row userProfileLinePaddings" id="emailSuccess" style="display:none;">
                                <div class="col">
                                    <span class="userProfileBodyFonts">
                                        Email Change Success!
                                    </span>
                                </div>
                            </div>
                            <div class="row userProfileLinePaddings" id="emailFail" style="display:none;">
                                <div class="col">
                                    <span id="emailError" class="userProfileBodyFonts" style="color:red;">
                                        Email Change Failed!
                                    </span>
                                </div>
                            </div>

                        ` : ''}
                    </div>
                </div>
                <div class="col-lg-3">
                </div>
            </div>
        `
        /*template += `
            <h3>Settings</h3>
            <div class="row settings-header">
                <div class="col"><h4>User profile</h4></div>
                <div class="ml-auto"><i title="Edit user profile" id="editUserProfile" class="fas fa-edit"></i></div>
            </div>
            <div class="row">
                <div class="col data">First name</div>
                <div class="col"><input class="form-control" readonly value="${userData['399159511']}"></div>
            </div>
            <div class="row">
                <div class="col data">Middle name</div>
                <div class="col"><input class="form-control" readonly value="${userData['231676651'] ? ` ${userData['231676651']}` :''}"></div>
            </div>
            <div class="row">
                <div class="col data">Last name</div>
                <div class="col"><input class="form-control" readonly value="${userData['996038075']}"></div>
            </div>
            <div class="row">
                <div class="col data">Suffix</div>
                <div class="col"><input class="form-control" readonly value="${userData['506826178'] ? `${await getConceptVariableName(userData['506826178'])}` :  ``}"></div>
            </div>
            <div class="row"><div class="col"><strong>Date of birth</strong></div></div>
            <div class="row">
                <div class="col data">Month</div>
                <div class="col">
                    <select class="form-control" disabled required id="UPMonth">
                        <option value="">-- Select Month --</option>
                        <option value="01" ${userData['564964481'] === '01' ? 'selected' : ''}>1 - January</option>
                        <option value="02" ${userData['564964481'] === '02' ? 'selected' : ''}>2 - February</option>
                        <option value="03" ${userData['564964481'] === '03' ? 'selected' : ''}>3 - March</option>
                        <option value="04" ${userData['564964481'] === '04' ? 'selected' : ''}>4 - April</option>
                        <option value="05" ${userData['564964481'] === '05' ? 'selected' : ''}>5 - May</option>
                        <option value="06" ${userData['564964481'] === '06' ? 'selected' : ''}>6 - June</option>
                        <option value="07" ${userData['564964481'] === '07' ? 'selected' : ''}>7 - July</option>
                        <option value="08" ${userData['564964481'] === '08' ? 'selected' : ''}>8 - August</option>
                        <option value="09" ${userData['564964481'] === '09' ? 'selected' : ''}>9 - September</option>
                        <option value="10" ${userData['564964481'] === '10' ? 'selected' : ''}>10 - October</option>
                        <option value="11" ${userData['564964481'] === '11' ? 'selected' : ''}>11 - November</option>
                        <option value="12" ${userData['564964481'] === '12' ? 'selected' : ''}>12 - December</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col data">Day</div>
                <div class="col"><input class="form-control" readonly value="${userData['795827569']}"></div>
            </div>
            <div class="row">
                <div class="col data">Year</div>
                <div class="col"><input class="form-control" readonly value="${userData['544150384']}"></div>
            </div>
            </br>
            <div class="row">
                <div class="col data">Mobile phone</div>
                <div class="col"><input class="form-control" readonly value="${userData['388711124']? `${userData['388711124'].substr(0,3)} - ${userData['388711124'].substr(3,3)} - ${userData['388711124'].substr(6,4)}` : ''}"></div>
            </div>

            <div class="row">
                <div class="col data">Can we leave a voicemail at this number?</div>
                <div class="col"><input class="form-control" readonly value="${userData['271757434'] === 353358909 ? 'Yes': 'No'}"></div>
            </div>
            <div class="row">
                <div class="col data">Can we text this number?</div>
                <div class="col"><input class="form-control" readonly value="${userData['646873644'] === 353358909 ? 'Yes': 'No'}"></div>
            </div>


            <div class="row">
                <div class="col data">Home phone</div>
                <div class="col"><input class="form-control" readonly value="${userData['438643922'] ? `${userData['438643922'].substr(0,3)} - ${userData['438643922'].substr(3,3)} - ${userData['438643922'].substr(6,4)}` : ''}"></div>
            </div>
            <div class="row">
                <div class="col data">Can we leave a voicemail at this number?</div>
                <div class="col"><input class="form-control" readonly value="${userData['187894482'] === 353358909 ? 'Yes': 'No'}"></div>
            </div>
            <div class="row">
                <div class="col data">Preferred email</div>
                <div class="col"><input class="form-control" readonly value="${userData['869588347'] ? `${userData['869588347']}` : ''}"></div>
            </div>
            <div class="row">
                <div class="col data">Additional email</div>
                <div class="col"><input class="form-control" readonly value="${userData['849786503'] ? `${userData['849786503']}` : ''}"></div>
            </div>
            <div class="row">
                <div class="col data">Additional email 2</div>
                <div class="col"><input class="form-control" readonly value="${userData['635101039'] ? `${userData['635101039']}` : ''}"></div>
            </div>
            <div class="row">
                <div class="col data">Additional email 3</div>
                <div class="col"><input class="form-control" readonly value="${userData['714419972'] ? `${userData['714419972']}` : ''}"></div>
            </div>
            <div class="row">
                <div class="col data">Mailing address</div>
                <div class="col">
                    ${userData['521824358']} ${userData['442166669'] ? userData['442166669'] : ''}</br>
                    ${userData['703385619']} ${userData['634434746']} ${userData['892050548']}
                </div>
            </div>
        `;*/
    }
    else {
        template += 'Settings not available';
    }
    document.getElementById('root').innerHTML = template;
    hideAnimation();
    if(myData.code === 200 && myData.data['699625233'] !== undefined && myData.data['699625233'] === 353358909){
        addEventEditName(myData);
        addEventEditUP(myData.data);
    }
    document.getElementById('changePass').addEventListener('click', () => {
        document.getElementById('changPassGroup').style.display = "block"
    })
    document.getElementById('changeEmail').addEventListener('click', () => {
        document.getElementById('changEmailGroup').style.display = "block"
    })
    document.getElementById('changePassSubmit').addEventListener('click', () => {
        //document.getElementById('changPassGroup').style.display = "block"
        console.log(document.getElementById('newPassField').value)
        let pass = document.getElementById('newPassField').value
        let passConfirm = document.getElementById('newPassFieldCheck').value
        if(pass === passConfirm){
            console.log('true')
            changePass(pass)
        }
        else{
            console.log('false')
        }
        //console.log(newPassField.value)
    })

    document.getElementById('changeEmailSubmit').addEventListener('click', () => {
        //document.getElementById('changPassGroup').style.display = "block"
        console.log(document.getElementById('newEmailField').value)
        let email = document.getElementById('newEmailField').value
        let emailConfirm = document.getElementById('newEmailFieldCheck').value
        if(email === emailConfirm){
            console.log('true')
            changeEmail(email)
        }
        else{
            console.log('false')
        }
        //console.log(newPassField.value)
    })
    
}

const addEventEditUP = (data) => {
    const editUserProfile = document.getElementById('editUserProfile');
    if(editUserProfile){
        editUserProfile.addEventListener('click', () => {

        });
    }
}

const addEventEditName = (myData) => {
    let button = document.getElementById('nameEditButton');
    button.addEventListener('click', () => {
        showAnimation();
        let template = '';
        template += `
        <div class="row" style="margin-top:58px">
                <div class="col-lg-3">
                </div>
                <div class="col-lg-6">
                    <p class="consentHeadersFont" style="color:#606060">
                        My Profile
                    </p>
                    <div class="userProfileBox">
                        <div class="col">
                        <form id="userProfileForm" method="POST" autocomplete="off">
                            <p class="userProfileSubHeaders">Name</p> 
                            <div class="row">
                                <div class="col-md-4">
                                    <label style="margin-left:-15px">First name <span class="required">*</span></label>
                                    <input type="text" value="${myData.data['399159511']}" class="form-control input-validation row" id="UPFirstName" placeholder="Enter first name" disabled style="max-width:215px">
                                </div>
                                <div class="col-md-4">
                                    <label style="margin-left:-15px">Middle name</label>
                                    <input type="text" value="${myData.data['231676651'] ? myData.data['231676651'] : ''}" class="form-control input-validation row" data-validation-pattern="alphabets" data-error-validation="Your middle name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters." id="UPMiddleInitial" placeholder="Enter middle name" style="max-width:215px">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label style="margin-left:-15px">Last name <span class="required">*</span></label>
                                    <input type="text" value="${myData.data['996038075']}" class="form-control input-validation row" id="UPLastName" placeholder="Enter last name" disabled style="max-width:304px">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-4">
                                    <label class="col-form-label">Suffix</label>
                                    <select class="form-control" style="max-width:152px; margin-left:0px;" id="UPSuffix">
                                        <option value="">-- Select --</option>
                                        <option value="612166858" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 0 ? 'selected':'') : ''}>Jr.</option>
                                        <option value="255907182" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 1 ? 'selected':'') : ''}>Sr.</option>
                                        <option value="226924545" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 2 ? 'selected':'') : ''}>I</option>
                                        <option value="270793412" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 3 ? 'selected':'') : ''}>II</option>
                                        <option value="959021713" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 4 ? 'selected':'') : ''}>III</option>
                                        <option value="643664527" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 5 ? 'selected':'') : ''}>2nd</option>
                                        <option value="537892528" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 6 ? 'selected':'') : ''}>3rd</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group row">
                                <div class="col-md-4">
                                    <label class="col-form-label">Preferred first name</label>
                                    <input value="${myData.data[153211406]?myData.data[153211406]:''}" style="max-width:215px; margin-left:0px;" type="text" class="form-control input-validation" data-validation-pattern="alphabets" data-error-validation="Your preferred name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters." id="UPPreferredName" placeholder="Enter preferred name">
                                </div>
                            </div>
                        </form>
                        <br>
                        <div>
                            <button class="btn btn-primary myProfileCancelButton" type="button" id="backToAbout" style="">Cancel</button>
                            <button class="btn btn-primary myProfileChangeButton" type="button" id="toPrivacy" style="float:right;">Change</button>
                        </div>
                        </div>
                    </div>

                </div>
                <div class="col-lg-3">
                </div>
            </div>
        `
        document.getElementById('root').innerHTML = template;
        document.getElementById('backToAbout').addEventListener('click', () => {
            renderSettingsPage();
        })
        hideAnimation();
    })
}

const changePass = (newPassword) =>{
    var user = firebase.auth().currentUser;
    //var newPassword = getASecureRandomPassword();

    user.updatePassword(newPassword).then(function() {
    // Update successful.
        document.getElementById('changPassGroup').style.display = 'none';
        document.getElementById('passwordSuccess').style.display = 'block';
        document.getElementsByTagName('changePass').style.display = 'block';

    }).catch(function(error) {
    // An error happened.
        //console.log(error.message)
        //document.getElementById('changPassGroup').style.display = 'none';
        document.getElementById('passwordFail').style.display = 'block'
        document.getElementById('passError').innerHTML = error.message;

    });

}

const changeEmail = (newEmail) =>{
    var user = firebase.auth().currentUser;
    //var newPassword = getASecureRandomPassword();

    user.updateEmail(newPassword).then(function() {
    // Update successful.
        document.getElementById('changEmailGroup').style.display = 'none';
        document.getElementById('emailSuccess').style.display = 'block';
        document.getElementsByTagName('changeEmail').style.display = 'block';

    }).catch(function(error) {
    // An error happened.
        //console.log(error.message)
        //document.getElementById('changPassGroup').style.display = 'none';
        document.getElementById('emailFail').style.display = 'block'
        document.getElementById('emailError').innerHTML = error.message;

    });

}