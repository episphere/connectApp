
export const renderSamplesPage = async () => {
    document.title = 'My Connect - Samples';
    
    let template = `
    <br>
    
    <div class="row">
        <div class="col-md-2">
        </div>
        <div class="col-md-8">
            <div class="row" style="width:100%">
                <div class="consentHeadersFont" style="color:#606060;width:100%">
                    <div>
                        Donating Your Samples at [LOCATION]
                    </div>
                </div>
                <div class="messagesBodyFont" style="width:100%">
                    <div>
                        As part of Connect, we ask you to donate blood, urine, and saliva samples and complete a short survey.
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
                        The Connect team will send you an email when it is time to donate yor samples. Be sure to check your spam or junk folder. After you receive the email, it is important to donate your samples as soon as you can. It is easy to donate all of your samples in one visit.
                        <br>
                        <br>
                        <strong>Note:</strong> If you have recently had a blood transfusion or donated blood, please wait at least <strong>eight weeks</strong> from your donation or transfusion before donating your samples for Connect.
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
                        When you receive the email, you can call [LOCATION]'s Connect line directly at [PHONE NUMBER] to schedule an appointment, or a member of the Connect team at [LOCATION] will call you to schedule an appointment to donate your samples at a time that is convenient for you.
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
                        [LOCATION] Center
                    </div>
                </div>
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Address and Relevant Directions
                        </div>
                        <div class="messagesBodyFont">
                            Address Line 1
                            <br>
                            Address Line 2
                        </div>
                    </div>
                </div>
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Hours
                        </div>
                        <div class="messagesBodyFont">
                            Hours 1
                            <br>
                            Hours 2
                        </div>
                    </div>
                </div>
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Parking Instructions
                        </div>
                        <div class="messagesBodyFont">
                            Parking Instructions
                        </div>
                    </div>
                </div>
                <div class="row" style="width:100%">
                    <div style="width:100%">
                        <div class="messagesHeaderFont">
                            Scheduling Information
                        </div>
                        <div class="messagesBodyFont">
                            For questions, please call [NUMBER] or email [EMAIL]
                            <br>
                            <br>
                            <em>All patients and visitors are required to wear a mask. If you enter the building without a mask, one will be provided to you immediately. If you are unable to wear a mask for the duration of the visit, we ask that you do not schedule your visit at this time.</em>
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
                        Please expect to spend about one hour at your appointment to donate your samples and complete a short survey.
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
                        One the day of your appointment, please drink plenty of water, but <strong>stop drinking water one hour before your appointment.</strong>
                        <br>
                        <br>
                        <strong>One hour before your appointment:</strong> Please <strong>do not</strong> eat, drink, chew gum, smoke, vape, or chew any products (including tobacco), rinse your mouth, or brush your teeth.
                        <br>
                        <br>
                        <strong>Things to bring and remember:</strong>
                        <br>
                        <br>
                        <ul>
                            <li>
                                We will ask you to complete a short survey when you donate your samples. You will need your login information for the MyConnect app to complete the survey. It may also be helpful to have this information:

                                <ul>
                                    <li>
                                        The last time you ate or drank before your appointment, and the times you went to sleep the night before your apointment and woke up on the day of your appointment.
                                    </li>
                                    <li>
                                        If you are menstruating, the start date of your most recent menstrual period in the last 12 months.
                                    </li>
                                    <li>
                                        Information and dates regarding COVID-19 testing, symptoms, recovery information (including any hospital stay and treatment), and vaccination status.
                                    </li>
                                </ul>
                            </li>
                        </ul>
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
                        The Connect team will check you in for your appointment and then collect your samples. At the end of your visit, the Connect team will check you out of yoru appointment.
                        <br>
                        <br>
                        We will draw a blood sample, collect a urine sample, and collect a saliva sample by asking you to swish your mouthwash.
                        <br>
                        <br>
                        We will also ask you to complete a short survey on the MyConnect app using your mobile phone. You will need your MyConnect app log-in information to compelte the survey. If you do not have a mobile phone we will provide you with a tablet to compelte your survey. We strongly encourage you to complete your survey at your apointment. If you choose to compelte them after you elave your appointment, it is important to do so as soon as possible.
                        <br>
                        <br>
                        If you have not already done so, we will ask you to complete yourfirst Connect survey at your appointment. If you are able to complete this survey before your appointment, it will save you time.
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