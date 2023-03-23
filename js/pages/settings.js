import { showAnimation, hideAnimation, getMyData, storeResponse, getConceptVariableName } from "../shared.js";

export const renderSettingsPage = async () => {
    document.title = 'My Connect - My Profile';
    showAnimation();
    const myData = await getMyData();
    let template = ''
    
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
                         </div>
                         ${displayFirebaseInfo(userData)}
                    </div>

                </div>
                <div class="col-lg-3">
                </div>
            </div>
        `
    }
    else {
        template += `
            <div class="row align-center">
                <span class="consentBodyFont1 w-100">
                    You have not completed your profile yet.
                </span>
            </div>
            
        `;
    }
    document.getElementById('root').innerHTML = template;
    hideAnimation();

    if(myData.code === 200 && myData.data['699625233'] !== undefined && myData.data['699625233'] === 353358909){

        document.getElementById('changeEmail').addEventListener('click', () => {
            document.getElementById('changEmailGroup').style.display = "block"
        })
    
        document.getElementById('changeEmailSubmit').addEventListener('click', () => {
            
            let email = document.getElementById('newEmailField').value
            let emailConfirm = document.getElementById('newEmailFieldCheck').value
            if(email === emailConfirm){
                changeEmail(email)
            }
            else{
            }
        })
    }
}


const changeEmail = async (newEmail) =>{
    var user = firebase.auth().currentUser;
    document.getElementById('emailFail').style.display = 'none';
    document.getElementById('emailSuccess').style.display = 'none';

    await user.updateEmail(newEmail).then(function() {
    // Update successful.
        document.getElementById('changEmailGroup').style.display = 'none';
        document.getElementById('emailSuccess').style.display = 'block';

        const emailData = {
            '421823980': newEmail 
        };

        storeResponse(emailData).then(function(){
            document.getElementById('profileEmailAddress').textContent = newEmail;
        });


    }).catch(function(error) {
    // An error happened.
        document.getElementById('emailFail').style.display = 'block'
        document.getElementById('emailError').innerHTML = error.message;

    });

}


const displayFirebaseInfo = (userData) => {
    let signInInfornmationContent = ``
    // write conditions for email, phone or empty
    
    //// if firebase authentication email number exists
    console.log("userData", userData)
    if(userData['421823980']) {
        signInInfornmationContent = 
        `
        <div class="row userProfileLinePaddings">
        <div class="col">
            <span class="userProfileBodyFonts">
                Email Address
                <br>
                <b>
                    <div id="profileEmailAddress">${userData['421823980']}</div>
                </b>
                </br>
            </span>
        </div>
        <div class="col">
            <button id="changeEmail" class="btn btn-primary save-data consentNextButton" style="float:right;">Change Login Email</button>
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
            <button id="changeEmailSubmit" class="btn btn-primary save-data consentNextButton">Change Login Email</button>
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

    <br>`
    }
    // if firebase authentication phone number exists
    else if (userData['348474836']) {
        signInInfornmationContent =
        ` <div class="row userProfileLinePaddings" >
            <div class="col">
                <span class="userProfileBodyFonts">
                    Phone Number
                    <br>
                    <b>
                        <div id="profilePhoneNumber">${userData['348474836']}</div>
                    </b>
                    </br>
                </span>
            </div>
        </div>
    <br>`
    }
    
    return signInInfornmationContent
}