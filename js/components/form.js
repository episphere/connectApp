import { sites } from "../shared.js";
import { addEventAdditionalEmail, addEventAdditionalPhone } from "../event.js";

export const renderUserProfile = () => {
    const mainContent = document.getElementById('root');
    const localData = localStorage.eligibilityQuestionnaire ? JSON.parse(localStorage.eligibilityQuestionnaire) : undefined
    mainContent.innerHTML = `
        </br></br>
        <h4>User Profile</h4>
        <span>The National Cancer Institute and ${localData ? sites()[localData.RcrtES_Site_v1r0] : ''} thank you for your participation in this important study. Before we begin, we will need some basic contact information. We will only use this information to contact you about study-related activities and updates. We will not share your contact information with other people or groups.</span>
        <form id="userProfileForm" method="POST">
            <div class="form-group">
                <label>
                    <strong>First name</strong> <span class="required">*</span>
                    <input type="text" class="form-control" required id="UPFirstName" placeholder="Enter first name">
                </label>
            </div>
            <div class="form-group">
                <label>
                    <strong>Middle initial</strong>
                    <input type="text" class="form-control" id="UPMiddleInitial" placeholder="Enter middle initial">
                </label>
            </div>
            <div class="form-group">
                <label>
                    <strong>Last name</strong> <span class="required">*</span>
                    <input type="text" class="form-control" required id="UPLastName" placeholder="Enter last name">
                </label>
            </div>
            <div class="form-group">
                <label>
                    <strong>Suffix</strong>
                    <input type="text" class="form-control" id="UPSuffix" placeholder="Enter suffix">
                </label>
            </div>
            <div class="form-group">
                <label>
                    <strong>Month </strong><span class="required">*</span>
                    <select class="form-control" required id="UPMonth">
                        <option value="">-- Select Month --</option>
                        <option value="01">JAN</option>
                        <option value="02">FEB</option>
                        <option value="03">MAR</option>
                        <option value="04">APR</option>
                        <option value="05">MAY</option>
                        <option value="06">JUN</option>
                        <option value="07">JUL</option>
                        <option value="08">AUG</option>
                        <option value="09">SEP</option>
                        <option value="10">OCT</option>
                        <option value="11">NOV</option>
                        <option value="12">DEC</option>
                    </select>
                </label>
            </div>
            <div class="form-group">
                <label>
                    <strong>Day </strong><span class="required">*</span>
                    <select class="form-control" required id="UPDay">
                    <option value="">-- Select day --</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>
                </label>
            </div>
            <div class="form-group">
                <label>
                    <strong>Year </strong><span class="required">*</span>
                    <input type="text" required class="form-control" id="UPYear" Placeholder="Enter birth year">
                </label>
            </div>

            <div class="form-group">
                <label>
                    <strong>At birth, how was your physical sex assigned? </strong><span class="required">*</span>
                    </br><input type="radio" required name="UPRadio" id="UPFemale"> Female
                    </br><input type="radio" required name="UPRadio" id="UPMale"> Male
                    </br><input type="radio" required name="UPRadio" id="UPOther"> Intersex or other
                </label>
            </div>

            ${localData.RcrtES_Site_v1r0 === 3 || localData.RcrtES_Site_v1r0 === 4 || localData.RcrtES_Site_v1r0 === 5 || localData.RcrtES_Site_v1r0 === 6 ? `
            
            <div class="form-group">
                <label>
                    <strong>Kaiser Medical Record Number (MRN)</strong> <i title="Please enter the number exactly how it appears on your Kaiser card, even if your MRN begins with a zero" class="fas fa-info-circle"></i>
                    <input type="text" class="form-control" id="UPMRN" Placeholder="Enter MRN">
                </label>
            </div>

            ` : ``}

            <div class="form-group">
                <label>
                    <strong>Email</strong>
                    <input type="email" class="form-control" id="UPEmail" Placeholder="Enter email"></br>
                    <div id="multipleEmail">
                        <button type="button" class="btn btn-light" id="addMoreEmail" title="Add more email">Add <i class="fas fa-plus"></i></button>
                    </div>
                </label>
            </div>

            ${renderPhoneNumber(1)}

            ${renderPhoneNumber(2)}

            <div class="form-group" id="multiplePhone">
                <button type="button" class="btn btn-light" id="addMorePhone" title="Add more phone number">Add <i class="fas fa-plus"></i></button>
            </div>

            <div class="form-group">
                <label>
                    <strong>What is your preferred method of contact?</strong>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons" id="methodOfContactFields">
                        <label class="btn btn-light active"><input type="radio" checked name="methodOfContact" id="UPMethodOfContactEmail1" >Email 1</label>
                        <label class="btn btn-light"><input type="radio" name="methodOfContact" id="UPMethodOfContactEmail2" >Email 2</label>
                        <label class="btn btn-light"><input type="radio" name="methodOfContact" id="UPMethodOfContactPhone1" >Phone 1</label>
                        <label class="btn btn-light"><input type="radio" name="methodOfContact" id="UPMethodOfContactPhone2" >Phone 2</label>
                    </div>
                </label>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
            </br></br>
        </form>
    `;

    addEventAdditionalEmail();
    addEventAdditionalPhone();
}

export const renderPhoneNumber = (number) => {
    return `
    <div class="form-group">
        <label>
            <strong>Phone number ${number}</strong>
            <input type="text" class="form-control" id="UPPhoneNumber${number}" size="10" maxlength="10" Placeholder="Enter phone number ${number}">
        </label><br>
        <label>
        <strong>Phone number ${number} type</strong>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-light active"><input type="radio" checked name="phoneNumberType${number}" id="UPPhoneType${number}1" >Mobile</label>
                <label class="btn btn-light"><input type="radio" name="phoneNumberType${number}" id="UPPhoneType${number}2" >Home</label>
                <label class="btn btn-light"><input type="radio" name="phoneNumberType${number}" id="UPPhoneType${number}3" >Work</label>
                <label class="btn btn-light"><input type="radio" name="phoneNumberType${number}" id="UPPhoneType${number}4" >Other</label>
            </div>
        </label><br>
        <label>
        <strong>Do we have permission to text this number?</strong>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-light active"><input type="radio" checked name="phoneNumberPermission${number}" id="UPPhonePermission${number}1">Yes</label>
                <label class="btn btn-light"><input type="radio" name="phoneNumberPermission${number}" id="UPPhonePermission${number}2">No</label>
            </div>
        </label>
    </div>
    `;
}