import { sites } from "../shared.js";

export const requestPINTemplate = () => {
    return `
        <br>
        <div class="row">
        <div class="col-lg-2">
        </div>
        <div class="col-lg-8 eligibility-form">
            <form method="POST" id="requestPINForm">
                <div class="form-group row">
                    
                    <label style="width:100%"><strong>If you received a PIN as part of your study invitation, please enter it here.<br>
                    Your PIN should be 6 characters and will include only numbers and uppercase letters.<br></strong></label>
                    <label><input style="margin-left:0px;" type="text" maxlength="6" id="participantPIN" class="form-control" placeholder="Enter PIN"></label>
                </div>

                <div class="form-group row">
                <button type="submit" class="btn btn-primary save-data" id="noPinSubmit">I do not have a PIN</button>&nbsp;&nbsp;
                    <div class="ml-auto">
                        <button type="submit" disabled class="btn btn-primary save-data consentNextButton" id="pinSubmit">Submit</button>
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
    <br>
    <!-- Modal -->
    <div class="modal fade" id="HealthProviderModal" tabindex="-1" role="dialog" aria-labelledby="HealthProviderModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="HealthProviderModalLabel"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body" id="HealthProviderModalBody">
            ...
        </div>
        <div class="modal-footer">
            <button type="button" id="modalCancel" class="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="button" id="modalConfirm" class="btn btn-primary consentNextButton">Yes</button>
        </div>
        </div>
    </div>
    </div>
    <div class = "row">
    <div class="col-lg-2">
    </div>
    <div class="col eligibility-form">
        <form method="POST" id="eligibilityForm">
            <div class="form-group">
                <label for="827220437"><strong>Who is your healthcare provider?<span class="required hovertext" data-hover-text="Healthcare provider is required"> *</span></strong>
                    <select ${siteId ? `disabled` : ``} class="form-control" style="margin-left:0px;" id="827220437" required>
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
            <span class="required">*Required</span>
                <div class="ml-auto">
                <button style="display:none;" id="openModal" class="btn btn-primary save-data consentNextButton" data-toggle="modal" data-target="#HealthProviderModal">Submit</button>
                    <button type="submit" class="btn btn-primary save-data consentNextButton">Submit</button>
                </div>
            </div></br></br>
        </form>
    </div>
    <div class="col-lg-2">
    </div>
    `;
    return template;
}

export const heardAboutStudy = (formData = {}) => {
    const getChecked = (value) =>  value === 353358909 ? "checked" : ""
    return `
        <br>
        <div class="row">
        <div class="col-lg-2">
        </div>
        <div class="col">
        <form method="POST" id="heardAboutStudyForm">
            <label><strong>How did you hear about this study? (Select all that apply)</strong></label>
            <div class="form-group">
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox8" ${getChecked(formData["326825649"])}> Another Connect participant</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox13" ${getChecked(formData["177402915"])}> Connect research staff at my health care system</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox10" ${getChecked(formData["829269606"])}> Connect table at public event</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox16" ${getChecked(formData["206879104"])}> Connect website on Cancer.gov</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox2" ${getChecked(formData["461488577"])}> Email or text invitation</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox7" ${getChecked(formData["549687190"])}> Family or friend</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox14" ${getChecked(formData["684726272"])}> Health care system newsletter</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox15" ${getChecked(formData["241590841"])}> Health care system website</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox6" ${getChecked(formData["607081902"])}> Invitation through my patient portal (such as MyChart)</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox3" ${getChecked(formData["942255248"])}> Letter or brochure in mail</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox17" ${getChecked(formData["520301146"])}> Local news, television, or radio station</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox4" ${getChecked(formData["791389099"])}> News article or press release about Connect </label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox12" ${getChecked(formData["639721694"])}> Phone call invitation</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox1" ${getChecked(formData["196856782"])}> Physician or other health care staff</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox9" ${getChecked(formData["819377306"])}> Poster, flyer, or sign at my health care system</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox19" ${getChecked(formData["967372009"])}> Recorded message</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox5" ${getChecked(formData["642287621"])}> Social media post (on Facebook, Twitter, Instagram, or other channels)</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="checkbox18" ${getChecked(formData["285130077"])}> Video</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox"  id="checkbox11" ${getChecked(formData["462314689"])}> Other</label>
                </div>
            </div>
            <div class="row">
                The next screens will take you through the informed consent process. They explain more about the study and what it means to take part in Connect. At the end, you can read the full informed consent form and electronic health records release form before you decide if you want to join.
            </div>
            <div class="row">
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data consentNextButton">Submit</button>
                </div>
            </div>
        </form>
        </div>
        <div class="col-lg-2">
        </div>
        </div>
    `
}