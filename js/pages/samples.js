
export const renderSamplesPage = async () => {
    document.title = 'My Connect - Samples';
    //827220437
    const site = locations.filter(location => location.name === 'UChicago Medicine')[0];
    
    let template = `
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
                <div class="row" style="width:100%">
                    <div class="messagesHeaderFont">
                        ${site.fullName}
                    </div>
                </div>
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Address and Relevant Directions
                        </div>
                        <div class="messagesBodyFont">
                            ${site.address}
                        </div>
                    </div>
                </div>
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Hours
                        </div>
                        <div class="messagesBodyFont">
                            ${site.hours}
                        </div>
                    </div>
                </div>
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Parking Instructions
                        </div>
                        <div class="messagesBodyFont">
                            ${site.parking}
                        </div>
                    </div>
                </div>
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Scheduling Information
                        </div>
                        <div class="messagesBodyFont">
                            ${site.scheduling}
                        </div>
                    </div>
                </div>
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
            </div>
            <div class="row" style="width:100%">
                <div class="consentHeadersFont" style="color:#606060;width:100%">
                    <div>
                        Questions? Contact the Connect Support Center
                    </div>
                </div>
                <div class="messagesBodyFont" style="width:100%">
                    <div>
                        MyConnect.cancer.gov/support
                        <br>
                        <br>
                        ConnectSupport@norc.org
                        <br>
                        <br>
                        Call 1-877-505-0253 (8:00 a.m.-10:00 p.m. CT on weekdays and 9:00 a.m.-6:00 p.m. CT on weekends)
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2">
        </div>
    </div>    
    `;
    document.getElementById('root').innerHTML = template;
    
}

const health_partners = {
    concept: '531629870',
    name: 'HealthPartners',
    fullName: 'HealthPartners Neuroscience Center',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
    whenToDonate: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect.',
    howToDonate: 'When you receive the email, please call HealthPartners at 952-967-5067 to schedule an appointment to donate your samples at a time that is convenient for you.',
    address: '295 Phalen Boulevard<br>St. Paul, MN 55130<br><br>Upon arrival, please proceed to the Lower Level lobby and wait for research staff to greet you.',
    hours: 'Monday - Thursday: 7:30 a.m.-4:00 p.m.<br>Friday: 7:30 a.m.-3:00 p.m.',
    parking: 'Park in the Neuroscience Center parking ramp located across from Olive Street.',
    scheduling: 'For questions and scheduling, please call 952-967-5067.',
    howLong: 'Please expect to spend about 30-45 minutes at your appointment to donate your samples and complete a short survey.',
    prepareInstructions: '<em>To help reduce the spread of COVID-19, all patients and visitors are required to wear a face mask. Face shields alone do not meet the requirement, but can be worn with a mask. If you enter the building without a mask, one will be provided to you immediately. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.</em><br><br>One the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Make sure you know your log-in information for the MyConnect app.<ul><li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information on hand: The last time you ate or drank, and the times you went to sleep the night before your appointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul></li></ul>',
    whatHappens: 'The Connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. If you do not have a mobile phone we will provide you with a tablet to complete your survey. You will need your MyConnect app log-in information to complete the survey.'
};

const sanford = {
    concept: '657167265',
    name: 'Sanford',
    fullName: 'Sanford Cancer Center',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
    whenToDonate: 'The Connect team will send a MyChart message when it is time to donate your samples. If you do not have a MyChart account, we will send you an email. Be sure to check your spam or junk folder. After you receive the MyChart message or email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect.',
    howToDonate: 'The MyChart message or email we send you will contain a link to schedule an appointment. Simply click the link to schedule a time that is convenient for you to donate your samples.',
    address: '1309 W. 17th Street<br>Sioux Falls, SD 57104',
    hours: 'Monday - Thursday: 7:00 a.m.-4:00 p.m.<br>Friday: 7:00 a.m.-2:00 p.m.',
    parking: 'Patient parking available in lot. Free valet parking is also available.',
    scheduling: 'Scheduling link will be sent by the Connect team at Sanford.<br><br>For questions, please call 605-312-6100 or email connectstudy@sanfordhealth.org.',
    howLong: 'Please expect to spend about 30 minutes at your appointment to donate your samples and complete a short survey.',
    prepareInstructions: '<em>All patients and visitors are required to wear a mask per Sanford mask policy. If you enter the building without a mask, one will be provided to you immediately. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.</em><br><br>One the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Make sure you know your login information for the MyConnect app.</li><li>We will ask you to complete a short survey when you donate your samples. It may also be helpful to have this information:<ul><li>The last time you ate or drank before your appointment, and the times you went to sleep the night before your apointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul></li></ul>',
    whatHappens: 'Check in at the front desk when you enter the Cancer Center. The registration team will direct you to the lab where the Connect team will collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. You will need your MyConnect app log-in information to complete the survey. If you do not have a mobile phone we will provide you with a tablet to complete your survey.<br><br>We strongly encourage you to complete your survey at your appointment. If you choose to complete them after you leave your appointment, it is important to do so as soon as possible.'
};

const marshfield = {
    concept: '303349821',
    name: 'Marshfield',
    fullName: 'Marshfield Clinic Lake Hallie Center',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
    whenToDonate: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect.',
    howToDonate: 'When you receive the email, please call Marshfield Clinic Research Institute at 715-898-9444 to schedule an appointment to donate your samples at a time that is convenient for you.',
    address: '12961 27th Ave<br>Chippewa Falls, WI 54729',
    hours: 'Monday - Friday: 10:00 a.m.-2:00 p.m.',
    parking: 'General parking available.',
    scheduling: 'For questions and scheduling please call: 715-898-9444 or email connectstudy@marshfieldresearch.org.<br><br>All patients and visitors are required to wear a mask. If you enter the building without a mask, one will be provided to you, if you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.',
    howLong: 'Please expect to spend an average of one hour at your appointment to donate your samples and complete a short survey.',
    prepareInstructions: 'One the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Make sure you know your login information for the MyConnect app.</li><li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information on hand:<ul><li>The last time you ate or drank, and the times you went to sleep the night before your apointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul></li></ul>',
    whatHappens: 'The Connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete <span style="font-weight:900; text-decoration:underline">a short survey</span> on the MyConnect app using your mobile phone. If you do not have a mobile phone we will provide a laptop for you to use complete your survey. You will need your MyConnect app log-in information to complete the survey.'
};

const henry_ford = {
    concept: '548392715',
    name: 'Henry Ford',
    fullName: 'Henry Ford Cancer Institute',
    donatingSamples: 'As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
    whenToDonate: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect.',
    howToDonate: 'When you receive the email, you can call Henry Ford Health System\'s Connect line directly at 855-574-7540 to schedule an appointment, or a member of the Connect team at Henry Ford will call you to schedule and appointment to donate your samples at a time that is convenient for you.',
    address: '2800 W Grand Blvd 2W412<br>Detroit, MI 48202<br><br>We are located on the second floor within the mammography clinic.',
    hours: 'Monday: 10:00 a.m.-2:00 p.m.<br>Wednesday: 10:00 a.m.-2:00 p.m.<br>Friday: 10:00 a.m.-2:00 p.m.',
    parking: 'General parking is available at no cost.',
    scheduling: 'For questions and scheduling please call 855-574-7540 or email ConnectStudy@hfhs.org.<br><br><em>All patients and visitors are required to wear a mask. If you enter the building without a mask, one will be provided to you immediately. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.</em>',
    howLong: 'Please expect to spend about one hour at your appointment to donate your samples and complete a short survey.',
    prepareInstructions: 'One the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink, chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>We will ask you to complete a short survey when you donate your samples. You will need your login information for the MyConnect app to complete the survey. It may also be helpful to have this information:<ul><li>The last time you ate or drank before your appointment, and the times you went to sleep the night before your apointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul></li></ul>',
    whatHappens: 'The Connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. You will need your MyConnect app log-in information to complete the survey. If you do not have a mobile phone we will provide you with a tablet to complete your survey. We strongly encourage you to complete your survey at your appointment. If you choose to complete them after you leave your appointment, it is imporant to do so as soon as possible.<br><br>If you have not already done so, we will ask you to complete your first Connect survey at your appointment. If you are able to complete this survey before your appointment, it will save you time.'
};

const u_chicago = {
    concept: '809703864',
    name: 'UChicago Medicine',
    fullName: 'University of Chicago, Duchossois Center for Advanced Medicine (DCAM) in Hyde Park',
    donatingSamples: 'As part of participating in Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.',
    whenToDonate: 'The Connect team will send you an email when it is time to donate your samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.<br><br><span style="font-weight:900; text-decoration:underline">Note:</span> If you have recently had a blood transfusion or donated blood, please wait at least <span style="font-weight:900; text-decoration:underline">eight weeks</span> from your donation or transfusion before donating your samples for Connect.',
    howToDonate: 'The email we send you will contain a link to schedule an appointment. Simply click the link to schedule a time that is convenient for you to donate your samples. You can also call UChicago at (773) 834-9992 or walk into the clinic at either location below without scheduling an appointment. Please note that the wait time for a walk-in sample donation may be longer than for a scheduled appointment.',
    address: '#2101 5758 S. Maryland Avenue<br>Chicago, IL 60637<br><br>After entering the DCAM building from the main enterance, look for us at the top of the stairs on the 2nd floor.',
    hours: 'Monday - Friday: 8:00 a.m.-3:00 p.m.',
    parking: 'The University of Chicago Medicine offers valet and self-parking. Patients and visitors will have parking passes validated. Please show your self-parking ticket to research staff.',
    scheduling: 'For questions and scheduling please call <span style="font-weight:900; text-decoration:underline">773-795-4767</span> or email connect@bsd.uchicago.edu.<br><br>All patients and visitors are required to wear a mask per UChicago Medicine policy. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit for now.',
    howLong: 'Please expect to spend about 45 minutes at your appointment to donate your samples and complete a short survey.',
    prepareInstructions: 'All patients and visitors are required to wear a mask per UChicago Medicine mask policy. If you enter the building without a mask, one will be provided to you immediately. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.<br><br>Hand sanitizer will be available for your use, and staff will check your temperature when you arrive. All patients and visitors are required to practice social distancing while in our clinics and hospitals.<br><br>One the day of your appointment, please drink plenty of water, but <span style="font-weight:900; text-decoration:underline">stop drinking water one hour before your appointment.</span><br><br><span style="font-weight:900; text-decoration:underline">One hour before your appointment:</span> Please <span style="font-weight:900; text-decoration:underline">do not</span> eat, drink any liquids (including water), chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.<br><br><span style="font-weight:900; text-decoration:underline">Things to bring and remember:</span><br><br><ul><li>Please remember to bring a valid photo ID (driver\'s license, passport, Chicago CityKey, school photo ID, or other photo ID)</li><li>Make sure you know your login information for the MyConnect app</li><li>We will ask you to complete a short survey when you donate your samples. It may be helpful to have this information:<ul><li>The last time you ate or drank before your appointment, and the times you went to sleep the night before your apointment and woke up on the day of your appointment.</li><li>If you are menstruating, the start date of your most recent menstrual period in the last 12 months.</li><li>Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.</li></ul></li></ul>',
    whatHappens: 'The research team will check you in for your appointment and then collect your samples. At the end of your visit, the research team will check you out of your appointment.<br><br>We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish with mouthwash.<br><br>We will also ask you to complete a short survey on the MyConnect app using your mobile phone. You will need your MyConnect app login information to complete the survey. If you do not have a mobile phone we will provide you with a tablet to complete your surveys. We strongly encourage you to complete your survey at your apointment. If you choose to complete it after you leave your appointment, it is important to do so as soon as possible'
};

const locations = [
    health_partners,
    sanford,
    marshfield,
    henry_ford,
    u_chicago
];