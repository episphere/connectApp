import { getMyData, hasUserData } from "../shared.js";

export const renderSamplesPage = async () => {
    document.title = 'My Connect - Samples';
    getMyData().then(res => {

        if(!hasUserData(res)) return;
        
        const site = locations.filter(location => location.concept == res.data['827220437'])[0];
        
        let template; 

        if(site && site !== kpga && site !==  kphi && site !==  kpco && site !==  kpnw) {
            const locationTemplate = renderLocations(site);

            template = `
            <br>
            
            <div class="row">
            <div class="col-md-2">
                </div>
                <div class="col-md-8">
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                Donating Your Samples at ${site.name}
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.donatingSamples}
                            </div>
                        </div>
                    </div>
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                When Should I Donate My Samples?
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.whenToDonate}
                            </div>
                        </div>
                    </div>
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                How Do I Donate My Samples?
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.howToDonate}
                            </div>
                        </div>          
                    </div>
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                Where Do I Donate My Samples?
                            </div>
                        </div>

                        ${site.locationNotes ? `
                        <div class="row" style="width:100%;">
                            <div class="messagesHeaderFont">
                                ${site.locationNotes}
                            </div>
                        </div>`
                        : ''}

                        ${locationTemplate}

                        ${site.scheduling ? `
                        <div class="row" style="width:100%">
                            <div style="width:100%">
                                <div class="messagesHeaderFont">
                                    Scheduling Information
                                </div>
                                <div class="messagesBodyFont">
                                    ${site.scheduling}
                                </div>
                            </div>
                        </div>` : ''
                        }
                    </div>
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                How Long Will My Appointment Take?
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.howLong}
                            </div>
                        </div>
                    </div>
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                How Should I Prepare On the Day of My Appointment?
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.prepareInstructions}
                            </div>
                        </div>
                    </div>

                    ${site.name !== henry_ford.name ? `
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                What Will Happen During My Appointment?
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.whatHappens}
                            </div>
                        </div>
                    </div>` 
                    : '' 
                    }
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                Questions? Contact the Connect Support Center
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
                                ${site.support}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                </div>
            </div>    
            `;
        }
        else if (site && (site === kpga || site ===  kphi || site ===  kpco || site ===  kpnw)) {
            const locationTemplate = renderLocations(site);
            template = `
            <br>
            
            <div class="row">
            <div class="col-md-2">
                </div>
                <div class="col-md-8">
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                Donating Your Samples at ${site.name}
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.donatingSamples}
                            </div>
                        </div>
                    </div>
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                When Should I Donate My Samples?
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.whenToDonate}
                            </div>
                        </div>
                    </div>
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                How Do I Donate My Blood and Urine Samples?
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.howToDonateBloodAndUrine}
                            </div>
                        </div>          
                    </div>
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                            ${site.prepInstructionsHeader}
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.prepInstructionsText}
                            </div>
                        </div>          
                    </div>          
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                What Will Happen During My Visit?
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.whatHappensDuring}
                            </div>
                        </div>          
                    </div>  
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                What Will Happen After My Visit?
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.whatHappensAfter}
                            </div>
                        </div>          
                    </div>
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                How Do I Donate My Saliva Sample?
                            </div>
                        </div>
                        <div class="messagesBodyFont" style="width:100%">
                            <div>
                                ${site.howToDonateSaliva}
                            </div>
                        </div>          
                    </div>
                    <div class="row" style="width:100%">
                        <div class="consentHeadersFont" style="color:#606060;width:100%">
                            <div>
                                Questions? Contact the Connect Support Center
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
                                ${site.support}
                            </div>
                        </div>
                    </div>
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
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
    whenToDonate: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900; text-decoration:underline">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900; text-decoration:underline">do not</span> donate samples for Connect on the <span style="font-weight:900; text-decoration:underline">same day</span> as your colonoscopy.',
    howToDonate: 'When you receive the email, please call HealthPartners at 952-967-5067 to schedule an appointment to donate your samples at a time that is convenient for you.',
    scheduling: 'For questions and scheduling, please call 952-967-5067.',
    howLong: 'Please expect to spend about 30-45 minutes at your appointment to donate your samples and complete a short survey.',
    prepareInstructions: '<em>To help reduce the spread of COVID-19, all patients and visitors are required to wear a face mask. Face shields alone do not meet the requirement, but can be worn with a mask. If you enter the building without a mask, we will give one to you. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.</em><br><br>On the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Please bring a valid government-issued photo ID, such as a driver\'s license.</li><li>Make sure you know your login information for the MyConnect app.<li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information on hand:</li><ul><li>The last time you ate or drank, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and your vaccination status.</li></ul></li></ul>',
    whatHappens: 'The Connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. If you do not have a mobile phone, we will provide you with a tablet to complete your survey. You will need your MyConnect app login information to complete the survey.',
    support: 'Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)',
    locations: [
        [
            'HealthPartners Neuroscience Center',
            '295 Phalen Boulevard<br>St. Paul, MN 55130<br><br>Upon arrival, please proceed to the Welcome Desk on the first floor to check in for your appointment.',
            'Monday - Thursday: 7:30 a.m.-3:00 p.m.<br>Friday: 7:30 a.m.-1:30 p.m.',
            'Park in the Neuroscience Center parking ramp located across from Olive Street.'
        ]
    ]
};

const sanford = {
    concept: '657167265',
    name: 'Sanford',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
    whenToDonate: 'The Connect team will send a MyChart message when it is time to donate your samples. If you do not have a MyChart account, we will send you an email. Be sure to check your spam or junk folder. After you receive the MyChart message or email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900; text-decoration:underline">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900; text-decoration:underline">do not</span> donate samples for Connect on the <span style="font-weight:900; text-decoration:underline">same day</span> as your colonoscopy.',
    howToDonate: 'The MyChart message or email we send you will contain a link to schedule an appointment. Simply click the link to schedule an appointment at a time and location that is convenient for you. Be sure you are scheduling an appointment in the city you are closest to.',
    scheduling: 'Scheduling information will be sent by the Connect team at Sanford via your MyChart or email.<br><br>For questions, please call 605-312-6100 or email <a href="mailto: connectstudy@sanfordhealth.org">connectstudy@sanfordhealth.org</a>.',
    howLong: 'Please expect to spend about 30 minutes at your appointment to donate your samples and complete a short survey.',
    prepareInstructions: 'On the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Make sure you know your login information for the MyConnect app.</li><li>We will ask you to complete a short survey when you donate your samples. It may also be helpful to have this information on hand:<ul><li>The last time you ate or drank before your appointment, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li></ul></li></ul>',
    whatHappens: 'Check in at the registration desk. The registration team will direct you where to go next in order to get your samples collected.  At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. You will need your MyConnect app login information to complete the survey. If you do not have a mobile phone, we may be able to provide you with a tablet to complete your survey.<br><br>We strongly encourage you to complete your survey at your appointment. If you choose to complete it after you leave your appointment, it is important to do so as soon as possible.',
    support: 'Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)',
    locations: [
        [
            'Sioux Falls: Sanford Imagenetics',
            '1321 W. 22nd St.<br>Sioux Falls, SD 57104',
            '',
            'Free patient parking available is available in the lot near the front entrance--Door JJ. No parking validation needed.'
        ],
        [
            'Fargo: South University Urgent Care/Orthopedic Walk-In Clinic',
            '1720 University Drive S<br>Fargo, ND 58102<br>Enter Through Door #8',
            '',
            'Free patient parking available is available in the lot near the Urgent Care entrance—Door #8. No parking validation needed.',
        ]
    ]
};

const marshfield = {
    concept: '303349821',
    name: 'Marshfield',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
    whenToDonate: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900; text-decoration:underline">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900; text-decoration:underline">do not</span> donate samples for Connect on the <span style="font-weight:900; text-decoration:underline">same day</span> as your colonoscopy.',
    howToDonate: 'The email we send you will contain a link to schedule an appointment. Simply click the link to schedule a time that is convenient for you to donate your samples. You can also call Marshfield Clinic Research Institute at 715-898-9444 to schedule an appointment, or a Connect team member will call you to schedule an appointment to donate your samples at a time that is convenient for you.',
    scheduling: 'For questions and scheduling please call: 715-898-9444 or email <a href="mailto: connectstudy@marshfieldresearch.org">connectstudy@marshfieldresearch.org</a>.',
    howLong: 'Please expect to spend an average of one hour at your appointment to donate your samples and complete a short survey.',
    prepareInstructions: 'On the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Make sure you know your login information for the MyConnect app.</li><li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information on hand:<ul><li>The last time you ate or drank, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li></ul></li></ul>',
    whatHappens: 'The Connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete <span style="font-weight:900; text-decoration:underline">a short survey</span> on the MyConnect app using your mobile phone. If you do not have a mobile phone, we will provide a tablet for you to use complete your survey. You will need your MyConnect app login information to complete the survey.',
    support: 'Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)',
    locations: [
        [
            'Marshfield Clinic, Marshfield Center',
            '1000 N. Oak Ave<br>Marshfield, WI 54449',
            'Monday - Thursday: 7:00 a.m. to 4:00 p.m. and Friday 7:00 a.m. to noon',
            'General parking available'
        ],
        [
            'Lake Hallie Center',
            '12961 27th Ave<br>Chippewa Falls, WI 54729',
            'Monday - Thursday: 7:00 a.m. to 4:00 p.m.<br>Fridays: 8:00 a.m. to 2:00 p.m.',
            'General parking available'
        ],
        [
            'Minocqua Center',
            '9576 WI-70 Trunk<br>Minocqua, WI 54548',
            'Wednesdays: 8:00 a.m. to 1:00 p.m.',
            'General parking available'
        ],
        [
            'Weston Center',
            '3400 Ministry Pkwy<br>Weston, WI 54476',
            'Mondays - Thursdays: 7:00 a.m. to 1:00 p.m. *Please ask about evening and Friday appointment availability if needed',
            'General parking available'
        ],
        [
            'Wisconsin Rapids Center',
            '220 24th St S,<br>Wisconsin Rapids,WI 54494',
            'Thursdays: 7:00 a.m. to 4:00 p.m.<br>Fridays: 7:00 a.m. to 10:00 a.m.',
            'General parking available'
        ]
    ]
};

const henry_ford = {
    concept: '548392715',
    name: 'Henry Ford Health',
    donatingSamples: 'Thank you for being part of Connect. As part of the study, we ask you to donate blood, urine, and saliva samples.',
    whenToDonate: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can.<br><br><span class="site-info-bold">Important Notes:</span><br><br><ol><li> If you have had a blood transfusion or donated blood recently:<br> Please wait at least <span class="site-info-bold">eight weeks</span> from your donation or transfusion before donating your samples for Connect.</li><br><li> If you have recently donated plasma:<br> Please wait at least <span class="site-info-bold">two days</span> from your plasma donation before donating samples for Connect.</li><br><li> If you have an upcoming colonoscopy:<br> Please be sure that you <span class="site-info-bold">do not</span> donate samples for Connect on the <span class="site-info-bold">same day</span> as your colonoscopy.</li></ol>',
    howToDonate: 'Connect participants at Henry Ford Health have two options for donating samples. You can choose the most convenient option for you.<br><br><span class="site-info-bold">Option 1:</span> Make an appointment to come into one of our Connect Research Labs to donate your samples.<br><br><span class="site-info-bold">Option 2:</span> A study team member can request a lab order be placed for you. After you receive the order confirmation email, you can donate samples by visiting a participating Henry Ford Health Lab Services location during normal hours of operation.<br><br> The table below includes more information about these options.<br><br><table border="1"><tr><th><span class="site-info-bold">Option 1: Connect Research Lab</span> </th><th><span class="site-info-bold">Option 2: HFH Lab Services</span></th></tr><tr><td>Connect team will greet you and walk you through your visit.</td><td>More hours and more locations, no need to schedule an appointment.</td></tr><tr><td>The team will draw blood, collect urine, and collect a saliva sample by asking you to swish with mouthwash.</td><td>Lab staff will collect blood and urine samples at your visit. We will send a mouthwash collection kit and instructions to you to complete your saliva sample at home.</td></tr><tr><td>Schedule your appointment using the link in the email we send or schedule with Connect staff by calling 855-574-7540.</td><td>Request a lab order using the link in the email we send. The order will be placed by Connect staff.<span class="site-info-bold"> Please allow up to 48 hours to receive order confirmation via email.</span> Once you receive the confirmation email, visit a participating HFH Lab Services location.<span class="site-info-bold"> Orders expire after 90 days.</span></td></tr></table><br>When it is time to donate your samples, we will send you an email with a link to make your selection. Simply click the link to schedule a time that works for you to donate your samples at a Connect Research Lab or to request a lab order be placed so you can donate samples at a participating Henry Ford Health Lab Services location. <br><br> You can donate Connect samples and complete any labs ordered by your provider in the same visit.<br><br><span class="site-info-bold">For questions or assistance with transportation, please call 855-574-7540 or email <a href="mailto:ConnectStudy@hfhs.org">ConnectStudy@hfhs.org</a></span>',
    howLong: '<span class="site-info-bold">For Option 1: Connect Research Lab Appointment</span><br>Please expect to spend about one hour at your appointment to donate your samples and complete a short survey.<br><br><span class="site-info-bold">For Option 2: Henry Ford Health Lab Services Locations</span><br>Wait times to donate samples may vary by location. To better serve HFH patients, Henry Ford Lab Services have started using <span class="site-info-bold">“Save My Spot".</span><br><br><span class="site-info-bold">“Save My Spot"</span> is an optional service to reserve your spot in line at one of the participating Henry Ford Health Lab Services locations (Macomb and Wyandotte). All lab orders must be placed before using “Save My Spot,” including your lab order for Connect.<br><br>To use this optional service, click this link only after receiving order confirmation from Connect staff: <a href= "https://www.henryford.com/locations/henry-ford-hospital/lab-services">https://www.henryford.com/locations/henry-ford-hospital/lab-services</a> ',
    prepareInstructions: 'On the day of your visit to donate samples for Connect, you do not need to fast unless told to do so by your provider for any other lab work they’ve ordered. We request you drink plenty of water to keep hydrated but <span class="site-info-bold">stop drinking water one hour before your visit.</span><br><br><span class="site-info-bold">One hour before your visit:</span> Please <span class="site-info-bold">do not</span> eat, drink, chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span class="site-info-bold">Things to bring and remember:</span> We will ask you to complete a short survey on MyConnect after you donate samples. You will need your login method for MyConnect and a personal device to complete the survey. <br><br>You will be asked questions related to:<ul><li>The last time you ate or drank before your appointment, and the time you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li></ul><br><div class="consentHeadersFont" style="color:#606060;width:100%">When Will I Receive My $25 Payment?</div><br>You will receive your $25 gift card after you donate a blood sample and complete <span class="site-info-bold">all four sections</span> of your first Connect survey.<br><br>You can find the four sections of your first survey on your MyConnect Dashboard. These sections are:<ol><li>Background and Overall Health</li><li>Medications, Reproductive Health, Exercise, and Sleep</li><li>Smoking, Alcohol, and Sun Exposure</li><li>Where you Live and Work</li>',
    support: 'Call 1-877-505-0253 (9:00 a.m.-11:00 p.m. ET on weekdays and 10:00 a.m.-7:00 p.m. ET on weekends)',
    locationNotes: '<h4>Option 1: Connect Research Labs</h4>',
    locations: [
        [
            'Henry Ford Hospital - Detroit, K13 Research Clinic',
            '2799 W Grand Blvd<br>K Building, Floor 13<br>Detroit, MI 48202<br>(313) 542-9709',
            '',
            'Free self-parking available to visitors. Lots located near each hospital entrance (Main, West, East) or use the parking garage on the Lodge service drive, near Bethune.'
        ],
        [
            'Henry Ford Medical Center - Livonia',
            '29200 Schoolcraft Road<br>Radiology, Floor 1<br>Livonia, MI 48150<br>(313) 269-5634',
            '',
            'Easy, free self-parking is available in the surface lot in front of the building. The medical center visitor lot is located behind Aldi.<br><br><br><h4><div class="consentHeadersFont" style="color:#606060;width:100%">Option 2: Henry Ford Health Lab Services locations</div></h4>',
        ],
        [
            'Henry Ford Hospital - Detroit',
            '2799 W Grand Blvd<br>Detroit, MI 48202<br>Location: K1 Outpatient Lab',
            '',
            'Free self-parking available to visitors. Lots located near each hospital entrance (Main, West, East) or use the parking garage on the Lodge service drive, near Bethune.',
        ],

        [
           'Henry Ford Hospital - Macomb',  
           '16151 19 Mile Road<br> Ste 110<br>Clinton Township, MI 48038<br>Location: First Floor, Suite 110',
           '',
           'All self-parking at Henry Ford Macomb Hospital is free. Self-parking areas are available near the Main entrance, Medical Pavilion and Emergency entrance. Wheelchairs are available at all entrances.',
        ],
        [
          'Henry Ford Hospital - Wyandotte',
          '2333 Biddle Ave<br> Wyandotte, MI 48192<br> Location: First Floor Lab Services',
          '',
          'Parking lots are conveniently located near all hospital entrances for those who do not wish to use valet. Wheelchairs are available at all entrances and handicapped parking is available in each parking area. Valet parking is available at all hospital entrances for $3.00. This service is not available on holidays.',
        ],
        [
           'Henry Ford Hospital - West Bloomfield',
           '6777 West Maple Road<br>West Bloomfield, MI 48322<br>Location: Lab Services First Floor - Bloomfield Reception',
           '',
           'All self-parking at Henry Ford West Bloomfield Hospital is free. Self-parking areas are available near the Main entrance and at the Henry Ford Cancer entrance. Wheelchairs are available at all entrances. Handicapped-designated parking spaces are located in front of the Main entrance, the West entrance and the Emergency entrance.',
        ],
        [
           'Henry Ford Medical Center - Fairlane',
           '19401 Hubbard Dr.<br>Dearborn, MI 48126<br>Location: First Floor Lab Services',
           '',
           'Self-parking available in parking lot near building. All self-parking at Henry Ford Medical Center Fairlane is free.',
        ],
        [
           'Henry Ford Medical Center - Royal Oak',
           '110 E. 2<sup>nd</sup> Street<br>Royal Oak, MI 48067<br>Location: First Floor Lab Services',
           '',
           'Convenient patient parking spots in parking structure located 100 feet from entrance.',
        ],
        [
           'Henry Ford Medical Center - Troy',
           '2825 Livernois<br>Troy, MI 48083<br>Location: First Floor Lab Services',
           '',
           '',
        ],
        [
           'Henry Ford Medical Center - Plymouth',
           '4077 Ann Arbor Road<br>Plymouth, MI 48067<br>Location: First Floor Lab Services',
           '',
           '',
        ],
    ]
};

const u_chicago = {
    concept: '809703864',
    name: 'UChicago Medicine',
    donatingSamples: 'As part of  Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
    whenToDonate: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span class="site-info-bold">Note:</span> If you have recently had a blood transfusion or donated blood please wait at least <span class="site-info-bold">eight weeks</span> from your transfusion or donation before donating your samples for Connect. If you have recently donated plasma, please wait at least <span class="site-info-bold">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span class="site-info-bold">do not</span> donate samples for Connect on the <span class="site-info-bold">same day</span> as your colonoscopy.',
    howToDonate: 'The email we send you will contain a link to schedule an appointment. Simply click the link to schedule a time that is convenient for you to donate your samples. You can also call UChicago at (773) 834-5804  or walk into a clinic location below without scheduling an appointment. Please note that the wait time for a walk-in sample donation may be longer than for a scheduled appointment.',
    howLong: 'If you complete your first Connect survey before your appointment, please expect to spend about 45 minutes at your appointment to donate your samples and complete a short survey',
    prepareInstructions: '<em>All patients and visitors are required to wear a mask per UChicago Medicine mask policy. If you enter the building without a mask, we will give one to you. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.</em><br><br>Hand sanitizer will be available for your use, and staff will check your temperature when you arrive. All patients and visitors are required to practice social distancing while in our clinics and hospitals.<br><br>On the day of your appointment, you do not need to fast. We request you to drink plenty of water to keep hydrated, but <span class="site-info-bold">stop drinking water one hour before your appointment.</span><br><br><span class="site-info-bold">One hour before your appointment:</span> Please <span class="site-info-bold">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span class="site-info-bold">Things to bring and remember:</span><br><br><ul><li>Please remember to bring a valid photo ID that is not expired (driver\'s license, passport, Chicago CityKey, school photo ID, or other photo ID)</li><li>Make sure you know your login information for the MyConnect app</li><li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information on hand:<ul><li>The last time you ate or drank before your appointment, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li></ul></li></ul>',
    whatHappens: 'The research team will check you in for your appointment and then collect your samples. At the end of your visit, the research team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. You will need your MyConnect app login information to complete the survey. If you do not have a mobile phone, we will provide you with a tablet to complete your survey. We strongly encourage you to complete your survey at your appointment. If you choose to complete it after you leave your appointment, it is important to do so as soon as possible.<br><br><span class="site-info-underline">To save time at your appointment, please also complete your first Connect survey on the MyConnect app before donating samples.</span> If you are not able to complete the survey before your appointment, we will ask you to complete the survey during your appointment.',
    support: 'Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)',
    locationNotes: '<p>UChicago currently offers four locations in Chicagoland. For questions and scheduling please call 773-834-5804 or email connect@bsd.uchicago.edu.</p>',
    locations: 
    [
        [
            '<span class="site-info-underline">UChicago, Duchossois Center for Advanced Medicine (DCAM) in Hyde Park</span>',
            'University of Chicago Medicine <br>Duchossois Center for Advanced Medicine (DCAM) #2101 </br>5758 S. Maryland Avenue <br>Chicago, IL 60637</br><br>After entering the DCAM building from the main entrance, look for us at the top of the stairs on the 2nd floor.</br></p>',
            '',
            'The University of Chicago Medicine offers valet and self-parking. We will validate your parking pass. Please show your self-parking ticket to research staff.',
        ],
        [
            '<span class="site-info-underline">UChicago Ingalls Memorial Hospital in Harvey, IL</span>',
            'Ingalls Outpatient Center, Suite #212</br>71 W. 156th St.<br>Harvey, IL 60426</br>',
            '',
            'Ingalls Memorial Hospital offers free valet and self-parking.',
        ],
        [
            '<span class="site-info-underline">UChicago Medicine – South Loop, in Downtown Chicago</span>',
            'Southgate Market P1 <br>1101 S Canal St </br> Chicago, IL 60607',
            '',
            'The clinic is located on the P1 level next to the DSW. Entrances are located off of Canal St right beside the Panera Bread and on the P1 level of the parking garage. We will validate your parking pass from the parking garage. Please show your self-parking ticket to research staff. We are unable to validate street parking.',
        ],
        [
            '<span class="site-info-underline">UChicago Medicine – River East, in Downtown Chicago</span>',
            'Located in Lucky Strike Downtown Chicago <br>355 E. Grand Ave <br>Chicago, IL 60611',
            '',
            'From Lake Shore Drive: Exit at Grand Ave. and proceed west towards McClurg Ct.  An entrance to the parking garage is located past that intersection on your left at 321 E. Grand.<br><br>From the West: Take Illinois St. east towards Columbus Dr. An entrance to the parking garage is located past that intersection on your left at 300 E. Illinois.<br><br>Once inside the parking garage, follow the signs to LL3 (Fall) for designated UChicago Medicine patient parking.  We will validate your parking pass from the parking garage. Please show your self-parking ticket to research staff. We are unable to validate street parking.',
        ],
        [
            '<span class="site-info-underline">UChicago Medicine Orland Park in Orland Park, IL</span>',
            '9661 W 143rd St<br>Orland Park, IL 60462',
            '',
            'The clinic building is located across the street from the UChicago Medicine Orland Park building on the southwest corner of 143rd St and S Ravinia Ave. This location offers free parking in front of the building. Once parked, the suite location is through the front doors and the last door on the left down the lefthand hallway.',
        ],
    ]
};

const nci = {
    concept: '13',
    name: 'NCI',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
    whenToDonate: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect.',
    howToDonate: 'When you receive the email, please call us at 123-456-7891 to schedule an appointment to donate your samples at a time that is convenient for you.',
    scheduling: 'For questions and scheduling please call us at 123-456-7891.<br><br>All patients and visitors are required to wear a mask. If you enter the building without a mask, one will be provided to you, if you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.',
    howLong: 'Please expect to spend an average of one hour at your appointment to donate your samples and complete a short survey.',
    prepareInstructions: 'One the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Make sure you know your login information for the MyConnect app</li><li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information:<ul><li>The last time you ate or drank before your appointment, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul></li></ul>',
    whatHappens: 'The connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a <span style="font-weight:900; text-decoration:underline">short survey</span> on the MyConnect app using your mobile phone. If you do not have a mobile phone, we will provide a device for you to use to complete your survey. You will need your MyConnect app log-in information to complete the survey.',
    support: 'Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)',
    locations: [
        [
            'National Cancer Institute Sample Location',
            'Rockville, MD',
            'Monday - Friday: 8:00 a.m.-2:00 p.m.',
            'General parking available.'
        ]
    ]
};

const kpga = {
    concept: '327912200',
    name: 'KP Georgia',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete two short surveys.',
    whenToDonate: 'We will send you an email when it is time to donate your samples. After you receive the email, it is important to donate your samples as soon as you can.',
    howToDonateBloodAndUrine: 'Please visit the lab at any Kaiser Permanente location that is convenient for you.<br></br><span style="font-weight:900;">You do not need an appointment</span> and there is no co-pay involved. You may eat and drink before your visit.<br></br>When you arrive at the Kaiser Permanente lab, please use the lab kiosk to check in according to the steps below:<br></br><ol><li> Touch the screen to get started.</li><li> Enter your Medical Record Number (MRN).</li><li> Enter your Date of Birth.</li><li> Choose “Walk-in.”</li><li> Select “Other Lab Services.”</li><li> Answer COVID-19 symptoms questions if displayed.</li><li> Select “No” to answer questions regarding additional coverage, payment, or text messaging.</li><li> You will see a message on the kiosk screen that reads, “You are checked-in" when you have finished the check-in process.</li><li> Have a seat and lab staff will call you back when they are ready.</li><li> When called back, please communicate with the lab staff you are there for a “Research draw for Connect” and the KP lab staff will take it from there.</li></ol><br></br>For locations, hours and directions, please visit <a style="text-decoration:underline" href="https://healthy.kaiserpermanente.org/georgia/doctors-locations?kp_shortcut_referrer=kp.org/locations#/search-form">kp.org/locations</a> or call 1-888-413-0601.<br></br><span style="font-weight:900;">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900;">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900;">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900;">do not</span> donate samples for Connect on the <span style="font-weight:900;">same day</span> as your colonoscopy.',
    prepInstructionsHeader: 'How Should I Prepare On the Day of My Visit?',
    prepInstructionsText: '<span style="font-style:italic;">All patients are required to wear a mask when visiting any Kaiser Permanente facility. If you enter the building without a mask, one will be provided to you. If you are unable to wear a mask for the duration of the visit, we ask that you do not plan to visit at this time.</span><br></br>A visitor may accompany you in the lab waiting area but they will not be permitted back to the lab area with you. Hand sanitizer will be available for your use. Please follow any physical distancing guidelines provided in the facility.<br></br><span style="font-weight:900;">Things to bring and remember:</span><br></br><ul><li>Please bring your Kaiser Permanente ID card and a picture ID.</li><ul>',
    whatHappensDuring: 'Donating your research blood and urine samples is just like providing samples requested by your health care provider. When you arrive at the facility, you may go directly to the lab to check in according to the steps above.<br></br>When it is your turn, the lab will call you back, confirm your ID, and collect your samples.',
    whatHappensAfter: 'Within a day of your blood and urine donation, we will send you an email asking you to complete a short survey on the MyConnect app. The survey will ask about recent actions, such as:<br></br><ul style="list-style-type:circle;"><li>The last time you ate or drank before your visit, and the times you went to sleep the night before your visit and woke up on the day of your visit.</li><li> If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li> Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul><span style="font-style:italic; font-weight:900;">When you receive our email, it is important that you complete the survey as soon as possible.</span>',
    howToDonateSaliva: 'You can do this in the comfort of your own home. When it is time to donate your saliva sample, we will mail you a mouthwash home collection kit. This kit will include instructions and all of the items needed to collect your sample, including a return shipping box with a pre-paid shipping label to return your sample to us.<br></br>When you collect your saliva sample, we will ask you to complete a short survey on the MyConnect app.<p style="font-weight:900; font-style:italic;"> It is important to complete this survey on the same day that you collect your saliva sample.</p>',
    support: 'Call 1-877-505-0253 (9:00 a.m-11:00 p.m. ET on weekdays and 10:00 a.m.-7:00 p.m. ET on weekends)'
};

const kphi = {
    concept: '300267574',
    name: 'KP Hawaii',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete two short surveys.',
    whenToDonate: 'We will send you an email when it is time to donate your samples. After you receive the email, it is important to donate your samples as soon as you can.',
    howToDonateBloodAndUrine: 'Please visit the lab at any Kaiser Permanente location convenient for you.<br></br><span style="font-weight:900;">You do not need an appointment</span> and there is no co-pay involved. You may eat and drink before your visit.<br></br>For locations, hours, and directions, please go to <a style="text-decoration:underline" href="https://healthy.kaiserpermanente.org/hawaii/doctors-locations?kp_shortcut_referrer=kp.org/locations#/search-form">kp.org/locations</a> or call <span style="font-weight:900;">toll-free 833-417-0846.</span><br></br><span style="font-weight:900;">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900;">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900;">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900;">do not</span> donate samples for Connect on the <span style="font-weight:900;">same day</span> as your colonoscopy.',
    prepInstructionsHeader: 'What Should I Bring to the Visit?',
    prepInstructionsText: '<ul><li>Please bring your Kaiser Permanente member ID card and a picture ID.</li><li>All patients and visitors are required to wear a mask and practice physical distancing within the KP facility.</li></ul><span style="font-style:italic;">Note: Hand sanitizer will be available for your use.</span>',
    whatHappensDuring: 'Donating your research blood and urine samples is just like providing samples requested by your health care provider. When you arrive at the clinic, you may go directly to the lab. When it is your turn, the lab will call you back, check your ID, and collect your samples.',
    whatHappensAfter: 'Within a day of your blood and urine donation, we will send you an email asking you to complete a short survey on the MyConnect app. The survey will ask about recent actions, such as:<ul style="list-style-type:circle;"><li>The last time you ate or drank before your visit, and the times you went to sleep the night before your visit and woke up on the day of your visit.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul><span style="font-style:italic; font-weight:900;">When you receive our email, it is important that you complete the survey as soon as possible.</span>',
    howToDonateSaliva: 'You can do this in the comfort of your own home. When it is time to donate your saliva sample, we will mail you a mouthwash home collection kit. This kit will include instructions and all of the items needed to collect your sample, including a return shipping box with a pre-paid shipping label to return your sample to us.<br></br>When you collect your saliva sample, we will ask you to complete a short survey on the MyConnect app.<p style="font-style:italic; font-weight:900;">It is important to complete this survey on the same day that you collect your saliva sample.</p>',
    support: 'Call 1-877-505-0253 (3:00 a.m-5:00 p.m. HT on weekdays and 4:00 a.m.-1:00 p.m. HT on weekends)'
};

const kpco = {
    concept: '125001209',
    name: 'KP Colorado',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete two short surveys.',
    whenToDonate: 'We will send you an email when it is time to donate your samples. After you receive the email, it is important to donate your samples as soon as you can.',
    howToDonateBloodAndUrine: 'Please visit the lab at any Kaiser Permanente location that is convenient for you.<br></br><span style="font-weight:900;">You do not need an appointment</span> and there is no co-pay involved. You may eat and drink before your visit.<br></br>For locations, hours and directions, please visit <a style="text-decoration:underline" href="https://healthy.kaiserpermanente.org/colorado/doctors-locations?kp_shortcut_referrer=kp.org/locations#/search-form">kp.org/locations</a> or call 303-338-3800.<br></br><span style="font-weight:900;">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900;">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900;">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900;">do not</span> donate samples for Connect on the <span style="font-weight:900;">same day</span> as your colonoscopy.',
    prepInstructionsHeader: 'How Should I Prepare on the Day of My Visit?',
    prepInstructionsText: '<span style="font-style:italic;">All patients and visitors are required to wear a mask when you visit any Kaiser Permanente building. If you enter the building without a mask, one will be provided to you. Hand sanitizer will be available for your use. Please follow any physical distancing guidelines provided in the clinic.</span><br></br><span style="font-weight:900;">Things to bring and remember:<br></br></span><ul><li>Please bring your Kaiser Permanente member ID card and a picture ID.</li></ul>',
    whatHappensDuring: 'Donating your research blood and urine samples is just like providing samples requested by your health care provider. When you arrive at the clinic, you may go directly to the lab. When it is your turn, the lab will call you back, check your ID, and collect your samples.',
    whatHappensAfter: 'Within a day of your blood and urine donation, we will send you an email asking you to complete a short survey on the MyConnect app. The survey will ask about recent actions, such as:<br></br><ul style="list-style-type:circle;"><li>The last time you ate or drank before your visit, and the times you went to sleep the night before your visit and woke up on the day of your visit.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul><span style="font-style:italic; font-weight:900;">When you receive our email, it is important that you complete the survey as soon as possible.</span>',
    howToDonateSaliva: 'You can do this in the comfort of your own home. When it is time to donate your saliva sample, we will mail you a mouthwash home collection kit. This kit will include instructions and all of the items you need to collect your sample, including a return shipping box with a pre-paid shipping label to return your sample to us.<br></br>When you collect your saliva sample, we will ask you to complete a short survey on the MyConnect app.<p style="font-style:italic; font-weight:900;">It is important to complete this survey on the same day that you collect your saliva sample.</p>',
    support: 'Call 1-877-505-0253 (6:00 a.m-8:00 p.m. MT on weekdays and 7:00 a.m.-4:00 p.m. MT on weekends)'
};

const kpnw = {
    concept: '452412599',
    name: 'KP Northwest',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete two short surveys.',
    whenToDonate: 'We will send you an email when it is time to donate your samples. After you receive the email, it is important to donate your samples as soon as you can.',
    howToDonateBloodAndUrine: 'Please visit the lab at any Kaiser Permanente location that is convenient for you.<br></br><span style="font-weight:900;">You do not need an appointment</span> and there is no co-pay involved. You may eat and drink before your visit.<br></br>For locations, hours and directions, please visit <a style="text-decoration:underline" href="https://healthy.kaiserpermanente.org/oregon-washington/community-providers/laboratory">kp.org/locations.</a><br></br><span style="font-weight:900;">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900;">eight weeks</span> from your donation or transfusion before donating your samples for Connect. If you have recently donated plasma, please wait at least <span style="font-weight:900;">two days</span> from your plasma donation before donating samples for Connect. If you have an upcoming colonoscopy, please be sure that you <span style="font-weight:900;">do not</span> donate samples for Connect on the <span style="font-weight:900;">same day</span> as your colonoscopy.',
    prepInstructionsHeader: 'What Should I Bring to the Visit?',
    prepInstructionsText: '<ul><li>Please bring your Kaiser Permanente member ID card and a picture ID.</li><li>All patients and visitors are required to wear a mask and practice physical distancing within the KP facility.</li></ul><span style="font-style:italic;">Note: Hand sanitizer will be available for your use.</span>',
    whatHappensDuring: 'Donating your research blood and urine samples is just like providing a clinical sample requested by your health care provider. When you arrive at the clinic, you may go directly to the lab, get a ticket with a number, and follow the instructions. When it is your turn, the lab staff will call your number and explain how your sample donation will work.',
    whatHappensAfter: 'Within a day of your blood and urine donation, we will send you an email asking you to complete a short survey on the MyConnect app. The survey will ask about recent actions, such as:<br></br><ul  style="list-style-type:circle;"><li>The last time you ate or drank before your visit, and the times you went to sleep the night before your visit and woke up on the day of your visit.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul><span style="font-weight:900; font-style:italic;">When you receive our email, it is important that you complete the survey as soon as possible.</span>',
    howToDonateSaliva: 'You can do this in the comfort of your own home. When it is time to donate your saliva sample, we will mail you a mouthwash home collection kit. This kit will include instructions and all of the items needed to collect your sample, including a return shipping box with a pre-paid shipping label to return your sample to us.<br></br>When you collect your saliva sample, we will ask you to complete a short survey on the MyConnect app.<p style="font-weight:900;">It is important to complete this survey on the same day that you collect your saliva sample.</p>',
    support: 'Call 1-877-505-0253 (6:00 a.m-8:00 p.m. PT on weekdays and 7:00 a.m.-4:00 p.m. PT on weekends)'
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
    if(site.locations){
        site.locations.forEach(location => {
            template += `
                <div class="row" style="width:100%">
                    <div class="messagesHeaderFont">
                        ${location[0]}
                    </div>
                </div>`
            if (site === henry_ford) {
                template += `
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Address
                        </div>
                        <div class="messagesBodyFont">
                            ${location[1]}
                        </div>
                    </div>
                </div>`
            } else if (site === u_chicago && !location[1]){
                template += `<div class="row" style="width:100%">
                <div style="width:100%">
                    <div class="messagesBodyFont">
                        ${location[1]}
                    </div>
                </div>
            </div>`
            } else {
                template += `<div class="row" style="width:100%">
                <div style="width:100%">
                    <div class="messagesHeaderFont">
                        Address and Directions
                    </div>
                    <div class="messagesBodyFont">
                        ${location[1]}
                    </div>
                </div>
            </div>`
            }
            if(location[2])  {
                template+=`    
                <div class="row" style="width:100%;padding:5px 15px;">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Hours
                        </div>
                        <div class="messagesBodyFont">
                            ${location[2]}
                        </div>
                    </div>
                </div>`
            }
            
            if(location[3])  {
            template+=` 
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Parking Instructions
                        </div>
                        <div class="messagesBodyFont">
                            ${location[3]}
                        </div>
                    </div>
                </div>`
            }

            template+=`
                <br>
                <br>
            `;
        });
    }

    return template;
}