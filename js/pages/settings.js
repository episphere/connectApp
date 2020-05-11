import { showAnimation, hideAnimation, getMyData, allStates } from "../shared.js";

export const renderSettingsPage = async () => {
    showAnimation();
    const myData = await getMyData();
    let template = '<h3>Settings</h3>'
    if(myData.code === 200 && myData.data.RcrtUP_Submitted_v1r0 !== undefined && myData.data.RcrtUP_Submitted_v1r0 === 1){
        const userData = myData.data;
        template += `
            <div class="row settings-header">
                <div class="col"><h4>User profile</h4></div>
                <div class="ml-auto"><i title="Edit user profile" id="editUserProfile" class="fas fa-edit"></i></div>
            </div>
            <div class="row">
                <div class="col data">First name</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_Fname_v1r0}"></div>
            </div>
            <div class="row">
                <div class="col data">Middle name</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_Minitial_v1r0 ? ` ${userData.RcrtUP_Minitial_v1r0}` :''}"></div>
            </div>
            <div class="row">
                <div class="col data">Last name</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_Lname_v1r0}"></div>
            </div>
            <div class="row">
                <div class="col data">Suffix</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_Suffix_v1r0 ? `${userData.RcrtUP_Suffix_v1r0}` :  ``}"></div>
            </div>
            <div class="row"><div class="col"><strong>Date of birth</strong></div></div>
            <div class="row">
                <div class="col data">Month</div>
                <div class="col">
                    <select class="form-control" disabled required id="UPMonth">
                        <option value="">-- Select Month --</option>
                        <option value="01" ${userData.RcrtUP_MOB_v1r0 === '01' ? 'selected' : ''}>1 - January</option>
                        <option value="02" ${userData.RcrtUP_MOB_v1r0 === '02' ? 'selected' : ''}>2 - February</option>
                        <option value="03" ${userData.RcrtUP_MOB_v1r0 === '03' ? 'selected' : ''}>3 - March</option>
                        <option value="04" ${userData.RcrtUP_MOB_v1r0 === '04' ? 'selected' : ''}>4 - April</option>
                        <option value="05" ${userData.RcrtUP_MOB_v1r0 === '05' ? 'selected' : ''}>5 - May</option>
                        <option value="06" ${userData.RcrtUP_MOB_v1r0 === '06' ? 'selected' : ''}>6 - June</option>
                        <option value="07" ${userData.RcrtUP_MOB_v1r0 === '07' ? 'selected' : ''}>7 - July</option>
                        <option value="08" ${userData.RcrtUP_MOB_v1r0 === '08' ? 'selected' : ''}>8 - August</option>
                        <option value="09" ${userData.RcrtUP_MOB_v1r0 === '09' ? 'selected' : ''}>9 - September</option>
                        <option value="10" ${userData.RcrtUP_MOB_v1r0 === '10' ? 'selected' : ''}>10 - October</option>
                        <option value="11" ${userData.RcrtUP_MOB_v1r0 === '11' ? 'selected' : ''}>11 - November</option>
                        <option value="12" ${userData.RcrtUP_MOB_v1r0 === '12' ? 'selected' : ''}>12 - December</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col data">Day</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_BD_v1r0}"></div>
            </div>
            <div class="row">
                <div class="col data">Year</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_YOB_v1r0}"></div>
            </div>
            </br>
            <div class="row">
                <div class="col data">Biological sex assigned at birth</div>
                <div class="col"><input class="form-control" readonly value="${parseInt(userData.SEX) === 0 ? 'Male': `${parseInt(userData.SEX) === 1 ? 'Female' : 'Intersex or other'}`}"></div>
            </div>
            </br>
            <div class="row">
                <div class="col data">Mobile phone</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_Phone1_v1r0? `${userData.RcrtUP_Phone1_v1r0.substr(0,3)} - ${userData.RcrtUP_Phone1_v1r0.substr(3,3)} - ${userData.RcrtUP_Phone1_v1r0.substr(6,4)}` : ''}"></div>
            </div>

            <div class="row">
                <div class="col data">Can we leave a voicemail at this number?</div>
                <div class="col"><input class="form-control" readonly value="${parseInt(userData.RcrtUP_VMPerm1_v1r0) === 1 ? 'Yes': 'No'}"></div>
            </div>
            <div class="row">
                <div class="col data">Can we text this number?</div>
                <div class="col"><input class="form-control" readonly value="${parseInt(userData.RcrtUP_P1TxtPerm_v1r0) === 1 ? 'Yes': 'No'}"></div>
            </div>


            <div class="row">
                <div class="col data">Home phone</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_Phone2_v1r0? `${userData.RcrtUP_Phone2_v1r0.substr(0,3)} - ${userData.RcrtUP_Phone2_v1r0.substr(3,3)} - ${userData.RcrtUP_Phone2_v1r0.substr(6,4)}` : ''}"></div>
            </div>
            <div class="row">
                <div class="col data">Can we leave a voicemail at this number?</div>
                <div class="col"><input class="form-control" readonly value="${parseInt(userData.RcrtUP_VMPerm2_v1r0) === 1 ? 'Yes': 'No'}"></div>
            </div>
            <div class="row">
                <div class="col data">Preferred email</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_Email1_v1r0 ? `${userData.RcrtUP_Email1_v1r0}` : ''}"></div>
            </div>
            <div class="row">
                <div class="col data">Additional email</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_Email2_v1r0 ? `${userData.RcrtUP_Email2_v1r0}` : ''}"></div>
            </div>
            <div class="row">
                <div class="col data">Additional email 2</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_Email3_v1r0 ? `${userData.RcrtUP_Email3_v1r0}` : ''}"></div>
            </div>
            <div class="row">
                <div class="col data">Additional email 3</div>
                <div class="col"><input class="form-control" readonly value="${userData.RcrtUP_Email4_v1r0 ? `${userData.RcrtUP_Email4_v1r0}` : ''}"></div>
            </div>
            <div class="row">
                <div class="col data">Mailing address</div>
                <div class="col">
                    ${userData.RcrtUP_AddressLn1_v1r0} ${userData.RcrtUP_AddressLn2_v1r0 ? userData.RcrtUP_AddressLn2_v1r0 : ''}</br>
                    ${userData.RcrtUP_City_v1r0} ${Object.keys(allStates)[Object.values(allStates).indexOf(parseInt(userData.RcrtUP_State_v1r0))]} ${userData.RcrtUP_Zip_v1r0}
                </div>
            </div>
        `;
    }
    else {
        template += 'Settings not available';
    }
    document.getElementById('root').innerHTML = template;
    hideAnimation();
    addEventEditUP(userData);
}

const addEventEditUP = (data) => {
    const editUserProfile = document.getElementById('editUserProfile');
    if(editUserProfile){
        editUserProfile.addEventListener('click', () => {

        });
    }
}