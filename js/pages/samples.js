import { getMyData } from "../shared.js";

export const renderSamplesPage = async () => {
    document.title = 'My Connect - Samples';

    getMyData().then(res => {
        const site = locations.filter(location => location.concept == res.data['827220437'])[0];

        let template; 

        if(site) {
            // the begining of the template
            template = `
            <br>
            
            <div class="row">
            <div class="col-md-2">
                </div>
                <div class="col-md-8">`
            site.content.forEach(element => {
                if (element.article !== "support" && element.article !== "scheduling" ) {
                    template+=`<div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                ${element.header}
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${element.text}
                            </div>
                        </div>
                    </div>`
                } else if (element.article === "scheduling") {
                    const locationTemplate = renderLocations(element.locations);
                    
                    template+= ` <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                ${element.notesHeader}
                            </div>
                        </div>

                        ${element.hasLocationNotes ? `
                        <div class="row" style="width:100%">
                            <div class="messagesHeaderFont">
                                ${elemet.locationNotes}
                            </div>
                        </div>`
                        : ''}

                        ${locationTemplate}

                        <div class="row" style="width:100%">
                            <div style="width:100%">
                                <div class="messagesHeaderFont">
                                    Scheduling Information
                                </div>
                                <div class="messagesBodyFont">
                                    ${element.text}
                                </div>
                            </div>
                        </div>
                    </div>`
                } else if (element.article === "support") {
                    template+=`<div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                ${element.header}
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                <a href="https://myconnect.cancer.gov/support">MyConnect.cancer.gov/support</a>
                                <br>
                                <br>
                                <a href="mailto: ConnectSupport@norc.org">ConnectSupport@norc.org</a>
                                <br>
                                <br>
                                ${element.text}
                            </div>
                        </div>
                    </div>`
                }
            })
                   
            // the closing divs tied to the begining of the template 
             template+=`
             </div>
                <div class="col-md-2">
                </div>
            </div>   
            `;
        }
        else {
            template = `
            <br>
            
            <div class="row">
                <div class="col-md-2">
                </div>
                <div class="col-md-8 NotoSansFont">
                    We plan to begin collecting samples later this year. We will send you an email with instructions and next steps when it is time to donate samples. Thank you for being part of Connect!
                </div>
                <div class="col-md-2">
                </div>
            </div>    
            `;
        }
        
        document.getElementById('root').innerHTML = template;
    });
}

const health_partners = {
    concept: '531629870',
    name: 'HealthPartners',
    content: [
        {
            article: 'donatingSamples',
            header: 'Donating Your Samples at HealthPartners',
            text: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.'
        },{
            article: 'whenToDonate',
            header: 'When Should I Donate My Samples?',
            text: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900; text-decoration:underline">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900; text-decoration:underline">do not</span> donate samples for Connect on the <span style="font-weight:900; text-decoration:underline">same day</span> as your colonoscopy.'
        },{
            article: 'howToDonate',
            header: 'How Do I Donate My Samples?',
            text: 'When you receive the email, please call HealthPartners at 952-967-5067 to schedule an appointment to donate your samples at a time that is convenient for you.'
        },{
            article: 'scheduling',
            notesHeader: 'Where Do I Donate My Samples?',
            header: 'Scheduling Information',
            text: 'For questions and scheduling, please call 952-967-5067.',
            hasLocationNotes: false,
            locationNotes: '',
            locations: [
                {
                    locationName: 'HealthPartners Neuroscience Center',
                    addressHeader: 'Address and Directions',
                    address: '295 Phalen Boulevard<br>St. Paul, MN 55130<br><br>Upon arrival, please proceed to the Welcome Desk on the first floor to check in for your appointment.',
                    hoursHeader: 'Hours',
                    hours: 'Monday - Thursday: 7:30 a.m.-3:00 p.m.<br>Friday: 7:30 a.m.-1:30 p.m.',
                    parkingInstructionsHeader: 'Parking Instructions',
                    parkingInstructions: 'Park in the Neuroscience Center parking ramp located across from Olive Street.'
                }
            ]
        },{
            article: 'howLong',
            header: 'How Long Will My Appointment Take?',
            text: 'Please expect to spend about 30-45 minutes at your appointment to donate your samples and complete a short survey.'
        },{
            article: 'prepareInstructions',
            header: 'How Should I Prepare On the Day of My Appointment?',
            text: '<em>To help reduce the spread of COVID-19, all patients and visitors are required to wear a face mask. Face shields alone do not meet the requirement, but can be worn with a mask. If you enter the building without a mask, we will give one to you. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.</em><br><br>On the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Please bring a valid government-issued photo ID, such as a driver\'s license.</li><li>Make sure you know your login information for the MyConnect app.<li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information on hand:</li><ul><li>The last time you ate or drank, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and your vaccination status.</li></ul></li></ul>'
        },{
            article: 'whatHappens',
            header: 'What Will Happen During My Appointment?',
            text: 'The Connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. If you do not have a mobile phone, we will provide you with a tablet to complete your survey. You will need your MyConnect app login information to complete the survey.'
        },{
            article: 'support',
            header: 'Questions? Contact the Connect Support Center',
            text: 'Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)'
        },

    ]
};

const sanford = {
    concept: '657167265',
    name: 'Sanford',
    content: [
        {
            article: 'donatingSamples',
            header: 'Donating Your Samples at Sanford',
            text: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.'
        },{
            article: 'whenToDonate',
            header: 'When Should I Donate My Samples?',
            text: 'The Connect team will send a MyChart message when it is time to donate your samples. If you do not have a MyChart account, we will send you an email. Be sure to check your spam or junk folder. After you receive the MyChart message or email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900; text-decoration:underline">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900; text-decoration:underline">do not</span> donate samples for Connect on the <span style="font-weight:900; text-decoration:underline">same day</span> as your colonoscopy.'
        },{
            article: 'howToDonate',
            header: 'How Do I Donate My Samples?',
            text: 'The MyChart message or email we send you will contain a link to schedule an appointment. Simply click the link to schedule a time that is convenient for you to donate your samples.'
        },{
            article: 'scheduling',
            notesHeader: 'Where Do I Donate My Samples?',
            header: 'Scheduling Information',
            text: 'Scheduling link will be sent by the Connect team at Sanford.<br><br>For questions, please call 605-312-6100 or email <a href="mailto: connectstudy@sanfordhealth.org">connectstudy@sanfordhealth.org</a>.',
            hasLocationNotes: false,
            locationNotes: '',
            hasLocation: true,
            locations: [
                {
                    locationName: 'Sanford Imagenetics',
                    addressHeader: 'Address and Directions',
                    address: '1321 W. 22nd St.<br>Sioux Falls, SD 57105',
                    hoursHeader: 'Hours',
                    hours: 'Monday - Thursday: 7:00 a.m.-4:00 p.m.<br>Friday: 7:00 a.m.-2:00 p.m.',
                    parkingInstructionsHeader: 'Parking Instructions',
                    parkingInstructions: 'Patient parking available in lot.'
                }
            ]
        },{
            article: 'howLong',
            header: 'How Long Will My Appointment Take?',
            text: 'Please expect to spend about 30 minutes at your appointment to donate your samples and complete a short survey.'
        },{
            article: 'prepareInstructions',
            header: 'How Should I Prepare On the Day of My Appointment?',
            text: '<em>All patients and visitors are required to wear a mask per Sanford mask policy. If you enter the building without a mask, we will give one to you. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.</em><br><br>On the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Make sure you know your login information for the MyConnect app.</li><li>We will ask you to complete a short survey when you donate your samples. It may also be helpful to have this information on hand:<ul><li>The last time you ate or drank before your appointment, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul></li></ul>'
        },{
            article: 'whatHappens',
            header: 'What Will Happen During My Appointment?',
            text: 'Check in at the front desk when you enter the Imagenetics Building. The registration team will direct you to the lab where the Connect team will collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. You will need your MyConnect app login information to complete the survey. If you do not have a mobile phone, we may be able to provide you with a tablet to complete your survey.<br><br>We strongly encourage you to complete your survey at your appointment. If you choose to complete it after you leave your appointment, it is important to do so as soon as possible.'
        },{
            article: 'support',
            header: 'Questions? Contact the Connect Support Center',
            text:  'Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)'
        },
    ]     
};

const marshfield = {
    concept: '303349821',
    name: 'Marshfield',
    content: [
        {
            article: 'donatingSamples',
            header: 'Donating Your Samples at Marshfield',
            text: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.'
        },{
            article: 'whenToDonate',
            header: 'When Should I Donate My Samples?',
            text: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900; text-decoration:underline">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900; text-decoration:underline">do not</span> donate samples for Connect on the <span style="font-weight:900; text-decoration:underline">same day</span> as your colonoscopy.'
        },{
            article: 'howToDonate',
            header: 'How Do I Donate My Samples?',
            text: 'When you receive the email, please call Marshfield Clinic Research Institute at 715-898-9444 to schedule an appointment to donate your samples at a time that is convenient for you.'
        },{
            article: 'scheduling',
            notesHeader: 'Where Do I Donate My Samples?',
            header: 'Scheduling Information',
            text: 'For questions and scheduling please call: 715-898-9444 or email <a href="mailto: connectstudy@marshfieldresearch.org">connectstudy@marshfieldresearch.org</a>.<br><br>All patients and visitors are required to wear a mask. If you enter the building without a mask, we will give one to you. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.',
            hasLocationNotes: false,
            locationNotes: '',
            hasLocation: true,
            locations: [
                {
                    locationName: 'Marshfield Clinic, Marshfield Center',
                    addressHeader: 'Address and Directions',
                    address: '1000 N. Oak Ave<br>Marshfield, WI 54449',
                    hoursHeader: 'Hours',
                    hours: 'Monday - Friday: 8:00 a.m.-2:00 p.m. *please ask about early morning or evening appointment availability if needed',
                    parkingInstructionsHeader: 'Parking Instructions',
                    parkingInstructions: 'General parking available'
                },{
                    locationName: 'Lake Hallie Center',
                    addressHeader: 'Address and Directions',
                    address: '12961 27th Ave<br>Chippewa Falls, WI 54729',
                    hoursHeader: 'Hours',
                    hours: 'Monday - Friday: 10:00 a.m.-2:00 p.m. *please ask about early morning or evening appointment availability if needed',
                    parkingInstructionsHeader: 'Parking Instructions',
                    parkingInstructions: 'General parking available'
                },{
                    locationName: 'Weston Center',
                    addressHeader: 'Address and Directions',
                    address: '3400 Ministry Pkwy<br>Weston, WI 54476',
                    hoursHeader: 'Hours',
                    hours: 'Monday - Friday: 8:00 a.m. to 2:00 p.m. *please ask about early morning or evening appointment availability if needed',
                    parkingInstructionsHeader: 'Parking Instructions',
                    parkingInstructions: 'General parking available'
                }
            ]
        },{
            article: 'howLong',
            header: 'How Long Will My Appointment Take?',
            text: 'Please expect to spend an average of one hour at your appointment to donate your samples and complete a short survey.'
        },{
            article: 'prepareInstructions',
            header: 'How Should I Prepare On the Day of My Appointment?',
            text: 'On the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Make sure you know your login information for the MyConnect app.</li><li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information on hand:<ul><li>The last time you ate or drank, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and your vaccination status.</li></ul></li></ul>'
        },{
            article: 'whatHappens',
            header: 'What Will Happen During My Appointment?',
            text: 'The Connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete <span style="font-weight:900; text-decoration:underline">a short survey</span> on the MyConnect app using your mobile phone. If you do not have a mobile phone, we will provide a tablet for you to use complete your survey. You will need your MyConnect app login information to complete the survey.'
        },{
            article: 'support',
            header: 'Questions? Contact the Connect Support Center',
            text:  'Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)'
        },
    ]
};

const henry_ford = {
    concept: '548392715',
    name: 'Henry Ford Health',
    content: [
        {
            article: 'donatingSamples',
            header: 'Donating Your Samples at Henry Ford Health',
            text: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.'
        },{
            article: 'whenToDonate',
            header: 'When Should I Donate My Samples?',
            text: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900; text-decoration:underline">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900; text-decoration:underline">do not</span> donate samples for Connect on the <span style="font-weight:900; text-decoration:underline">same day</span> as your colonoscopy.'
        },{
            article: 'howToDonate',
            header: 'How Do I Donate My Samples?',
            text: 'The email we send you will contain a link to schedule an appointment. Simply click the link to schedule a time that is convenient for you to donate your samples. You can also call Henry Ford Health\'s Connect line at 855-574-7540 to schedule an appointment, or a Connect team member will call you to schedule an appointment to donate your samples at a time that is convenient for you.'
        },{
            article: 'scheduling',
            notesHeader: 'Where Do I Donate My Samples?',
            header: 'Scheduling Information',
            text: 'For questions and scheduling please call 855-574-7540 or email <a href="mailto: ConnectStudy@hfhs.org">ConnectStudy@hfhs.org</a>.<br><br><em>All patients and visitors are required to wear a mask. If you enter the building without a mask, we will give one to you. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.</em>',
            hasLocationNotes: true,
            locationNotes: 'Henry Ford Health currently offers two locations in Detroit: Henry Ford Cancer Institute and Henry Ford Hospital',
            hasLocation: true,
            locations: [
                {
                    locationName: 'Henry Ford Cancer Institute - Detroit',
                    addressHeader: 'Address',
                    address: '2800 W Grand Blvd, 2nd Floor, Radiology<br>Detroit, MI 48202<br>(888) 777-4167<br><br>We are located on the second floor within the mammography clinic.',
                    hoursHeader: 'Hours',
                    hours: 'Monday and Wednesday: 10:00 a.m. - 2:00 p.m.',
                    parkingInstructionsHeader: 'Parking Instructions',
                    parkingInstructions: 'Easy, free self-parking is available in the parking deck attached to the pavilion.'
                },{
                    locationName: 'Henry Ford Hospital K13 Research Clinic',
                    addressHeader: 'Address',
                    address: '2799 W Grand Blvd, K Building Floor 13<br>Detroit, MI 48202<br>(888) 777-4167',
                    hoursHeader: 'Hours',
                    hours: 'Tuesday and Thursday 1:00 p.m. – 5:00 p.m.',
                    parkingInstructionsHeader: 'Parking Instructions',
                    parkingInstructions: 'Free self-parking available to visitors. Lots located near each hospital entrance (Main, West, East) or use the parking garage on the Lodge service drive, near Bethune.'
                },{
                    locationName: 'Henry Ford Medical Center - Livonia',
                    addressHeader: 'Address',
                    address: '29200 Schoolcraft Road<br>Livonia, MI 48150',
                    hoursHeader: 'Hours',
                    hours: 'TBD',
                    parkingInstructionsHeader: 'Parking Instructions',
                    parkingInstructions: 'Easy, free self-parking is available in the surface lot in front of the building. From the service road, please turn right at the light and head towards the Aldi.'
                }
            ]
        },{
            article: 'howLong',
            header: 'How Long Will My Appointment Take?',
            text: 'Please expect to spend about one hour at your appointment to donate your samples and complete a short survey.'
        },{
            article: 'prepareInstructions',
            header: 'How Should I Prepare On the Day of My Appointment?',
            text: 'On the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink, chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>We will ask you to complete a short survey when you donate your samples. You will need your login information for the MyConnect app to complete the survey. It may also be helpful to have this information:<ul><li>The last time you ate or drank before your appointment, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul></li></ul>'
        },{
            article: 'whatHappens',
            header: 'What Will Happen During My Appointment?',
            text: 'The Connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. You will need your MyConnect app login information to complete the survey. If you do not have a mobile phone, we will provide you with a tablet to complete your survey. We strongly encourage you to complete your survey at your appointment. If you choose to complete it after you leave your appointment, it is important to do so as soon as possible.<br><br>At your appointment, we will ask you to complete your first Connect survey if you haven\'t already done so. If you are able to complete this survey before your appointment, it will save you time. You will receive your $25 gift card after you donate a blood sample and complete your first survey.'
        },{
            article: 'support',
            header: 'Questions? Contact the Connect Support Center',
            text:  'Call 1-877-505-0253 (9:00 a.m.-11:00 p.m. ET on weekdays and 10:00 a.m.-7:00 p.m. ET on weekends)'
        },
    ]
};

const u_chicago = {
    concept: '809703864',
    name: 'UChicago Medicine',
    content: [
        {
            article: 'donatingSamples',
            header: 'Donating Your Samples at UChicago Medicine',
            text: 'As part of participating in Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.'
        },{
            article: 'whenToDonate',
            header: 'When Should I Donate My Samples?',
            text: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900; text-decoration:underline">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900; text-decoration:underline">do not</span> donate samples for Connect on the <span style="font-weight:900; text-decoration:underline">same day</span> as your colonoscopy.'
        },{
            article: 'howToDonate',
            header: 'How Do I Donate My Samples?',
            text: 'The email we send you will contain a link to schedule an appointment. Simply click the link to schedule a time that is convenient for you to donate your samples. You can also call UChicago at (773) 834-9992 or walk into the clinic location below without scheduling an appointment. Please note that the wait time for a walk-in sample donation may be longer than for a scheduled appointment.'
        },{
            article: 'scheduling',
            notesHeader: 'Where Do I Donate My Samples?',
            header: 'Scheduling Information',
            text: 'For questions and scheduling please call <span style="font-weight:900; text-decoration:underline">773-795-4767</span> or email <a href="mailto: connect@bsd.uchicago.edu">connect@bsd.uchicago.edu</a>.',
            hasLocationNotes: false,
            locationNotes: '',
            hasLocation: true,
            locations: [
                {
                    locationName: 'University of Chicago, Duchossois Center for Advanced Medicine (DCAM) in Hyde Park',
                    addressHeader: 'Address and Directions',
                    address: '#2101 5758 S. Maryland Avenue<br>Chicago, IL 60637<br><br>After entering the DCAM building from the main enterance, look for us at the top of the stairs on the 2nd floor.',
                    hoursHeader: 'Hours',
                    hours: 'Monday - Friday: 8:00 a.m.-3:00 p.m.',
                    parkingInstructionsHeader: 'Parking Instructions',
                    parkingInstructions: 'The University of Chicago Medicine offers valet and self-parking. Patients and visitors will have parking passes validated. Please show your self-parking ticket to research staff.'
                }
            ]
        },{
            article: 'howLong',
            header: 'How Long Will My Appointment Take?',
            text: 'Please expect to spend about 45 minutes at your appointment to donate your samples and complete a short survey.'
        },{
            article: 'prepareInstructions',
            header: 'How Should I Prepare On the Day of My Appointment?',
            text: '<em>All patients and visitors are required to wear a mask per UChicago Medicine mask policy. If you enter the building without a mask, we will give one to you. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.</em><br><br>Hand sanitizer will be available for your use, and staff will check your temperature when you arrive. All patients and visitors are required to practice social distancing while in our clinics and hospitals.<br><br>On the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Please remember to bring a valid photo ID that is not expired (driver\'s license, passport, Chicago CityKey, school photo ID, or other photo ID)</li><li>Make sure you know your login information for the MyConnect app</li><li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information on hand:<ul><li>The last time you ate or drank before your appointment, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul></li></ul>'
        },{
            article: 'whatHappens',
            header: 'What Will Happen During My Appointment?',
            text: 'The research team will check you in for your appointment and then collect your samples. At the end of your visit, the research team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. You will need your MyConnect app login information to complete the survey. If you do not have a mobile phone, we will provide you with a tablet to complete your survey. We strongly encourage you to complete your survey at your appointment. If you choose to complete it after you leave your appointment, it is important to do so as soon as possible.<br><br>To save time at your appointment, please also complete your first Connect survey on the MyConnect app before donating samples. If you are not able to complete the survey before your appointment, we will ask you to complete the survey during your appointment.'
        },{
            article: 'support',
            header: 'Questions? Contact the Connect Support Center',
            text:  'Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)'
        },
    ]
};

const nci = {
    concept: '13',
    name: 'NCI',
    content: [
        {
            article: 'donatingSamples',
            header: 'Donating Your Samples at NCI',
            text: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
        },{
            article: 'whenToDonate',
            header: 'When Should I Donate My Samples?',
            text: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect.',
        },{
            article: 'howToDonate',
            header: 'How Do I Donate My Samples?',
            text: 'When you receive the email, please call us at 123-456-7891 to schedule an appointment to donate your samples at a time that is convenient for you.',
        },{
            article: 'scheduling',
            notesHeader: 'Where Do I Donate My Samples?',
            header: 'Scheduling Information',
            text: 'For questions and scheduling please call us at 123-456-7891.<br><br>All patients and visitors are required to wear a mask. If you enter the building without a mask, one will be provided to you, if you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.',
            hasLocationNotes: false,
            locationNotes: '',
            hasLocation: true,
            locations: [
                {
                    locationName: 'National Cancer Institute Sample Location',
                    addressHeader: 'Address and Directions',
                    address: 'Rockville, MD',
                    hoursHeader: 'Hours',
                    hours: 'Monday - Friday: 8:00 a.m.-2:00 p.m.',
                    parkingInstructionsHeader: 'Parking Instructions',
                    parkingInstructions: 'General parking available.'
                }
            ]
        },{
            article: 'howLong',
            header: 'How Long Will My Appointment Take?',
            text: 'Please expect to spend an average of one hour at your appointment to donate your samples and complete a short survey.',
        },{
            article: 'prepareInstructions',
            header: 'How Should I Prepare On the Day of My Appointment?',
            text: 'One the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Make sure you know your login information for the MyConnect app</li><li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information:<ul><li>The last time you ate or drank before your appointment, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul></li></ul>',
        },{
            article: 'whatHappens',
            header: 'What Will Happen During My Appointment?',
            text: 'The connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a <span style="font-weight:900; text-decoration:underline">short survey</span> on the MyConnect app using your mobile phone. If you do not have a mobile phone, we will provide a device for you to use to complete your survey. You will need your MyConnect app log-in information to complete the survey.',
        },{
            article: 'support',
            header: 'Questions? Contact the Connect Support Center',
            text: 'Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)',
        },
    ]
};

const kpga = {
    concept: '327912200',
    name: 'KP Georgia',
    content: [
        {
            article: 'donatingSamples',
            header: 'Donating Your Samples at KP Georgia',
            text: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete two short surveys.',
        },{
            article: 'whenToDonate',
            header: 'When Should I Donate My Samples?',
            text: 'We will send you an email when it is time to donate your samples. After you receive the email, it is important to donate your samples as soon as you can.',
        },{
            article: 'howToDonateBloodAndUrine',
            header: 'How Do I Donate My Blood and Urine Samples?',
            text: 'Please visit the lab at any Kaiser Permanente location that is convenient for you.<br></br><span style="font-weight:900;">You do not need an appointment</span> and there is no co-pay involved. You may eat and drink before your visit.<br></br>When you arrive at the Kaiser Permanente lab, please use the lab kiosk to check in according to the steps below:<br></br><ol><li> Touch the screen to get started.</li><li> Enter your Medical Record Number (MRN).</li><li> Enter your Date of Birth.</li><li> Choose “Walk-in.”</li><li> Select “Other Lab Services.”</li><li> Answer COVID-19 symptoms questions if displayed.</li><li> Select “No” to answer questions regarding additional coverage, payment, or text messaging.</li><li> You will see a message on the kiosk screen that reads, “You are checked-in" when you have finished the check-in process.</li><li> Have a seat and lab staff will call you back when they are ready.</li><li> When called back, please communicate with the lab staff you are there for a “Research draw for Connect” and the KP lab staff will take it from there.</li></ol>If possible, please go to the lab <span style="font-weight:900;">Monday - Thursday before 2:00 p.m.</span><br></br>For locations, hours and directions, please visit <a style="text-decoration:underline" href="https://healthy.kaiserpermanente.org/georgia/doctors-locations?kp_shortcut_referrer=kp.org/locations#/search-form">kp.org/locations</a> or call 1-888-413-0601.<br></br><span style="font-weight:900;">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900;">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900;">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900;">do not</span> donate samples for Connect on the <span style="font-weight:900;">same day</span> as your colonoscopy.',
        },{
            article: 'prepInstructionsText',
            header: 'How Should I Prepare On the Day of My Visit?',
            text: '<span style="font-style:italic;">All patients are required to wear a mask when visiting any Kaiser Permanente facility. If you enter the building without a mask, one will be provided to you. If you are unable to wear a mask for the duration of the visit, we ask that you do not plan to visit at this time.</span><br></br>A visitor may accompany you in the lab waiting area but they will not be permitted back to the lab area with you. Hand sanitizer will be available for your use. Please follow any physical distancing guidelines provided in the facility.<br></br><span style="font-weight:900;">Things to bring and remember:</span><br></br><ul><li>Please bring your Kaiser Permanente ID card and a picture ID.</li><ul>',
        },{
            article: 'whatHappensDuring',
            header: 'What Will Happen During My Visit?',
            text: 'Donating your research blood and urine samples is just like providing samples requested by your health care provider. When you arrive at the facility, you may go directly to the lab to check in according to the steps above.<br></br>When it is your turn, the lab will call you back, confirm your ID, and collect your samples.',
        },{
            article: 'whatHappensAfter',
            header: 'What Will Happen After My Visit?',
            text: 'Within a day of your blood and urine donation, we will send you an email asking you to complete a short survey on the MyConnect app. The survey will ask about recent actions, such as:<br></br><ul style="list-style-type:circle;"><li>The last time you ate or drank before your visit, and the times you went to sleep the night before your visit and woke up on the day of your visit.</li><li> If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li> Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul><span style="font-style:italic; font-weight:900;">When you receive our email, it is important that you complete the survey as soon as possible.</span>',
        },{
            article: 'howToDonateSaliva',
            header: 'How Do I Donate My Saliva Sample?',
            text: 'You can do this in the comfort of your own home. When it is time to donate your saliva sample, we will mail you a mouthwash home collection kit. This kit will include instructions and all of the items needed to collect your sample, including a return shipping box with a pre-paid shipping label to return your sample to us.<br></br>When you collect your saliva sample, we will ask you to complete a short survey on the MyConnect app.<p style="font-weight:900; font-style:italic;"> It is important to complete this survey on the same day that you collect your saliva sample.</p>',
        },{
            article: 'support',
            header: 'Questions? Contact the Connect Support Center',
            text: 'Call 1-877-505-0253 (9:00 a.m-11:00 p.m. ET on weekdays and 10:00 a.m.-7:00 p.m. ET on weekends)'
        }
    ]
};

const kphi = {
    concept: '300267574',
    name: 'KP Hawaii',
    content: [
        {
            article: 'donatingSamples',
            header: 'Donating Your Samples at KP Hawaii',
            text: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete two short surveys.',
        },{
            article: 'whenToDonate',
            header: 'When Should I Donate My Samples?',
            text: 'We will send you an email when it is time to donate your samples. After you receive the email, it is important to donate your samples as soon as you can.',
        },{
            article: 'howToDonateBloodAndUrine',
            header: 'How Do I Donate My Blood and Urine Samples?',
            text: 'Please visit the lab at any Kaiser Permanente location convenient for you.<br></br><span style="font-weight:900;">You do not need an appointment</span> and there is no co-pay involved. You may eat and drink before your visit.<br></br>If possible, please go to the lab <span style="font-weight:900;">Monday - Thursday before 2:00 p.m.</span><br></br>For locations, hours, and directions, please go to <a style="text-decoration:underline" href="https://healthy.kaiserpermanente.org/hawaii/doctors-locations?kp_shortcut_referrer=kp.org/locations#/search-form">kp.org/locations</a> or call <span style="font-weight:900;">toll-free 833-417-0846.</span><br></br><span style="font-weight:900;">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900;">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900;">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900;">do not</span> donate samples for Connect on the <span style="font-weight:900;">same day</span> as your colonoscopy.',
        },{
            article: 'prepInstructionsText',
            header: 'What Should I Bring to the Visit?',
            text: '<ul><li>Please bring your Kaiser Permanente member ID card and a picture ID.</li><li>All patients and visitors are required to wear a mask and practice physical distancing within the KP facility.</li></ul><span style="font-style:italic;">Note: Hand sanitizer will be available for your use.</span>',
        },{
            article: 'whatHappensDuring',
            header: 'What Will Happen During My Visit?',
            text: 'Donating your research blood and urine samples is just like providing samples requested by your health care provider. When you arrive at the clinic, you may go directly to the lab. When it is your turn, the lab will call you back, check your ID, and collect your samples.',
        },{
            article: 'whatHappensAfter',
            header: 'What Will Happen After My Visit?',
            text: 'Within a day of your blood and urine donation, we will send you an email asking you to complete a short survey on the MyConnect app. The survey will ask about recent actions, such as:<ul style="list-style-type:circle;"><li>The last time you ate or drank before your visit, and the times you went to sleep the night before your visit and woke up on the day of your visit.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul><span style="font-style:italic; font-weight:900;">When you receive our email, it is important that you complete the survey as soon as possible.</span>',
        },{
            article: 'howToDonateSaliva',
            header: 'How Do I Donate My Saliva Sample?',
            text: 'You can do this in the comfort of your own home. When it is time to donate your saliva sample, we will mail you a mouthwash home collection kit. This kit will include instructions and all of the items needed to collect your sample, including a return shipping box with a pre-paid shipping label to return your sample to us.<br></br>When you collect your saliva sample, we will ask you to complete a short survey on the MyConnect app.<p style="font-style:italic; font-weight:900;">It is important to complete this survey on the same day that you collect your saliva sample.</p>',
        },{
            article: 'support',
            header: 'Questions? Contact the Connect Support Center',
            text: 'Call 1-877-505-0253 (3:00 a.m-5:00 p.m. HT on weekdays and 4:00 a.m.-1:00 p.m. HT on weekends)'
        }
    ]
};

const kpco = {
    concept: '125001209',
    name: 'KP Colorado',
    content: [
        {
            article: 'donatingSamples',
            header: 'Donating Your Samples at KP Colorado',
            text: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete two short surveys.',
        },{
            article: 'whenToDonate',
            header: 'When Should I Donate My Samples?',
            text: 'We will send you an email when it is time to donate your samples. After you receive the email, it is important to donate your samples as soon as you can.',
        },{
            article: 'howToDonateBloodAndUrine',
            header: 'How Do I Donate My Blood and Urine Samples?',
            text: 'Please visit the lab at any Kaiser Permanente location that is convenient for you.<br></br><span style="font-weight:900;">You do not need an appointment</span> and there is no co-pay involved. You may eat and drink before your visit.<br></br>If possible, please go to the lab <span style="font-weight:900;">Monday - Thursday before 2:00 p.m.</span><br></br>For locations, hours and directions, please visit <a style="text-decoration:underline" href="https://healthy.kaiserpermanente.org/colorado/doctors-locations?kp_shortcut_referrer=kp.org/locations#/search-form">kp.org/locations</a> or call 303-338-3800.<br></br><span style="font-weight:900;">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900;">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900;">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900;">do not</span> donate samples for Connect on the <span style="font-weight:900;">same day</span> as your colonoscopy.',
        },{
            article: 'prepInstructionsText',
            header: 'How Should I Prepare on the Day of My Visit?',
            text: '<span style="font-style:italic;">All patients and visitors are required to wear a mask when you visit any Kaiser Permanente building. If you enter the building without a mask, one will be provided to you. Hand sanitizer will be available for your use. Please follow any physical distancing guidelines provided in the clinic.</span><br></br><span style="font-weight:900;">Things to bring and remember:<br></br></span><ul><li>Please bring your Kaiser Permanente member ID card and a picture ID.</li></ul>',
        },{
            article: 'whatHappensDuring',
            header: 'What Will Happen During My Visit?',
            text: 'Donating your research blood and urine samples is just like providing samples requested by your health care provider. When you arrive at the clinic, you may go directly to the lab. When it is your turn, the lab will call you back, check your ID, and collect your samples.',
        },{
            article: 'whatHappensAfter',
            header: 'What Will Happen After My Visit?',
            text: 'Within a day of your blood and urine donation, we will send you an email asking you to complete a short survey on the MyConnect app. The survey will ask about recent actions, such as:<br></br><ul style="list-style-type:circle;"><li>The last time you ate or drank before your visit, and the times you went to sleep the night before your visit and woke up on the day of your visit.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul><span style="font-style:italic; font-weight:900;">When you receive our email, it is important that you complete the survey as soon as possible.</span>',
        },{
            article: 'howToDonateSaliva',
            header: 'How Do I Donate My Saliva Sample?',
            text: 'You can do this in the comfort of your own home. When it is time to donate your saliva sample, we will mail you a mouthwash home collection kit. This kit will include instructions and all of the items you need to collect your sample, including a return shipping box with a pre-paid shipping label to return your sample to us.<br></br>When you collect your saliva sample, we will ask you to complete a short survey on the MyConnect app.<p style="font-style:italic; font-weight:900;">It is important to complete this survey on the same day that you collect your saliva sample.</p>',
        },{
            article: 'support',
            header: 'Questions? Contact the Connect Support Center',
            text: 'Call 1-877-505-0253 (7:00 a.m-9:00 p.m. CT on weekdays and 8:00 a.m.-5:00 p.m. CT on weekends)'
        }
    ]

};

const kpnw = {
    concept: '452412599',
    name: 'KP Northwest',
    content: [
        {
            article: 'donatingSamples',
            header: 'Donating Your Samples at KP Northwest',
            text: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete two short surveys.',
        },{
            article: 'whenToDonate',
            header: 'When Should I Donate My Samples?',
            text: 'We will send you an email when it is time to donate your samples. After you receive the email, it is important to donate your samples as soon as you can.',
        },{
            article: 'howToDonateBloodAndUrine',
            header: 'How Do I Donate My Blood and Urine Samples?',
            text: 'Please visit the lab at any Kaiser Permanente location that is convenient for you.<br></br><span style="font-weight:900;">You do not need an appointment</span> and there is no co-pay involved. You may eat and drink before your visit.<br></br>If possible, please go to the lab <span style="font-weight:900;">Monday - Thursday before 2:00 p.m.</span><br></br>For locations, hours and directions, please visit <a style="text-decoration:underline" href="https://healthy.kaiserpermanente.org/oregon-washington/community-providers/laboratory">kp.org/locations.</a><br></br><span style="font-weight:900;">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900;">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900;">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900;">do not</span> donate samples for Connect on the <span style="font-weight:900;">same day</span> as your colonoscopy.',
        },{
            article: 'prepInstructionsText',
            header: 'What Should I Bring to the Visit?',
            text: '<ul><li>Please bring your Kaiser Permanente member ID card and a picture ID.</li><li>All patients and visitors are required to wear a mask and practice physical distancing within the KP facility.</li></ul><span style="font-style:italic;">Note: Hand sanitizer will be available for your use.</span>',
        },{
            article: 'whatHappensDuring',
            header: 'What Will Happen During My Visit?',
            text: 'Donating your research blood and urine samples is just like providing a clinical sample requested by your health care provider. When you arrive at the clinic, you may go directly to the lab, get a ticket with a number, and follow the instructions. When it is your turn, the lab staff will call your number and explain how your sample donation will work.',
        },{
            article: 'whatHappensAfter',
            header: 'What Will Happen After My Visit?',
            text: 'Within a day of your blood and urine donation, we will send you an email asking you to complete a short survey on the MyConnect app. The survey will ask about recent actions, such as:<br></br><ul  style="list-style-type:circle;"><li>The last time you ate or drank before your visit, and the times you went to sleep the night before your visit and woke up on the day of your visit.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul><span style="font-weight:900; font-style:italic;">When you receive our email, it is important that you complete the survey as soon as possible.</span>',
        },{
            article: 'howToDonateSaliva',
            header: 'How Do I Donate My Saliva Sample?',
            text: 'You can do this in the comfort of your own home. When it is time to donate your saliva sample, we will mail you a mouthwash home collection kit. This kit will include instructions and all of the items needed to collect your sample, including a return shipping box with a pre-paid shipping label to return your sample to us.<br></br>When you collect your saliva sample, we will ask you to complete a short survey on the MyConnect app.<p style="font-weight:900;">It is important to complete this survey on the same day that you collect your saliva sample.</p>',
        },{
            article: 'support',
            header: 'Questions? Contact the Connect Support Center',
            text: 'Call 1-877-505-0253 (6:00 a.m-8:00 p.m. PT on weekdays and 7:00 a.m.-4:00 p.m. PT on weekends)'
        }
    ]
};

const locations = [
    health_partners,
    sanford,
    marshfield,
    henry_ford,
    u_chicago,
    nci,
    kpga,
    kphi,
    kpco,
    kpnw
];


const renderLocations = (site) => {
    let template = '';

    // console.log(site);
    if(site.length > 0){
        site.forEach(location => {
            template += `
                <div class="row" style="width:100%">
                    <div class="messagesHeaderFont">
                        ${location.locationName}
                    </div>
                </div>
    
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            ${location.addressHeader}
                        </div>
                        <div class="messagesBodyFont">
                            ${location.address}
                        </div>
                    </div>
                </div>
    
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            ${location.hoursHeader}
                        </div>
                        <div class="messagesBodyFont">
                            ${location.hours}
                        </div>
                    </div>
                </div>
    
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            ${location.parkingInstructionsHeader}
                        </div>
                        <div class="messagesBodyFont">
                            ${location.parkingInstructions}
                        </div>
                    </div>
                </div>
    
                <div class="row" style="width:100%"></div>
                <br>
                <br>
            `;
        });
    }


    return template;
}