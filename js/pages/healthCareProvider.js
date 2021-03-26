import { sites } from "../shared.js";

export const requestPINTemplate = () => {
    return `
        <div class="row">
        <div class="col-lg-2">
        </div>
        <div class="col-lg-8 eligibility-form">
            <form method="POST" id="requestPINForm">
                <div class="form-group row">
                    
                    <label><strong>If you received a PIN as part of your study invitation, please enter it here. Your PIN should be 6 characters and will include only numbers and uppercase letters.</strong></label>
                    <label><input style="margin-left:0px;" type="text" maxlength="6" id="participantPIN" class="form-control" placeholder="Enter PIN"></label>
                </div>

                <div class="form-group row">
                <button type="submit" class="btn btn-primary save-data">I do not have a PIN</button>&nbsp;&nbsp;
                    <div class="ml-auto">
                        <button type="submit" class="btn btn-primary save-data">Submit</button>
                    </div>
                </div>
                </br></br>
                
            </form>
        </div>
        <div class="col-lg-2">
        </div>
        </div>
    `
}

export const healthCareProvider = (siteId) => {
    let template = '';
    template += `
    <div class="col eligibility-form">
        <form method="POST" id="eligibilityForm">
            <div class="form-group">
                <label for="827220437"><strong>Who is your healthcare provider?<span class="required"> *</span></strong>
                    <select ${siteId ? `disabled` : ``} class="form-control" id="827220437" required>
                        <option value="">-- Select healthcare provider --</option>
    `;

    for (let siteCode in sites()){
        template += `<option ${siteId && siteId === parseInt(siteCode) ? `selected`: `` } value=${siteCode}>${sites()[siteCode]}</option>`;
    }

    template += `
                    </select>
                </label>
            </div>
            <div class="row">
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data">Submit</button>
                </div>
            </div></br></br>
        </form>
    </div>
    `;
    return template;
}

export const heardAboutStudy = () => {
    return `
        <form method="POST" id="heardAboutStudyForm">
            <label><strong>How did you hear about this study? (Select all that apply)</strong></label>
            <div class="form-group">
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox2"> Email or text invitation</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox3"> Letter or brochure in mail</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox6"> Invitation through my patient portal (such as MyChart)</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox12"> Phone call invitation</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox1"> Physician or other medical staff</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox13"> Connect research staff at my health care system</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox4"> News article or press release about Connect </label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox14"> Health care system newsletter</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox15"> Health care system website</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox16"> Connect website on Cancer.gov</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox5"> Social media (on Facebook, Twitter, Instagram, or other channels)</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox17"> Local news, television, or radio station</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox18"> Video</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox7"> Family or friend</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox8"> Another Connect participant</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox9"> Poster, flyer, or sign at my health care system</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox10"> Connect table at public event</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox19"> Recorded message</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox"  id="checkbox11"> Other</label>
                </div>
            </div>
            <div class="row">
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data">Submit</button>
                </div>
            </div>
        </form>
    `
}