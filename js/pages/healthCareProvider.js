import { sites } from "../shared.js";

export const requestPINTemplate = () => {
    return `
        <div class="col eligibility-form">
            <form method="POST" id="requestPINForm">
                <div class="form-group">
                    <label><strong>If you received a PIN as part of study invitation, please enter it here</strong></label>
                    <label><input type="text" id="participantPIN" class="form-control" placeholder="Enter PIN"></label>
                </div>

                <div class="form-group row">
                <button type="submit" class="btn btn-primary save-data">I do not have a pin</button>&nbsp;&nbsp;
                    <div class="ml-auto">
                        <button type="submit" class="btn btn-primary save-data">Submit</button>
                    </div>
                </div>
                </br></br>
                
            </form>
        </div>
    `
}

export const healthCareProvider = (siteId) => {
    let template = '';
    template += `
    <div class="col eligibility-form">
        <form method="POST" id="eligibilityForm">
            <div class="form-group">
                <label for="RcrtES_Site_v1r0"><strong>Who is your healthcare provider?<span class="required"> *</span></strong>
                    <select ${siteId ? `disabled` : ``} class="form-control" id="RcrtES_Site_v1r0" required>
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
                    <label><input type="checkbox" id="checkbox1"> Physician or other medical staff</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox2"> Email or text from my healthcare provider</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox3"> Postcard or mail</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox4"> News article or website</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox5"> Social media</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox6"> MyChart invitation</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox7"> Family or friend</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox8"> Another Connect participant</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox9"> Poster, brochure, or flyer</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox10"> Study table at public event</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox"  id="checkbox11"> Other</label>
                </div>
            </div>
            <div class="row">
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data">Submit</button>
                </div>
            </div></br></br>
        </form>
    `
}