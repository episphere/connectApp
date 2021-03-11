import { getMyData } from "../shared.js";

export const renderNotificationsPage = async () => {
    let template = '<h2>Notifications</h2>';
    let notifs = ['Please complete the your My Profile page so you can move on to the surveys!', 'If you would like to participate in this study, please go and sign the consent forms.']
    let times = ['2 days ago', '4 days ago']
    for(let i = 0; i<notifs.length; i++){
        let notif = notifs[i];
        let time = times[i];
        template += `
            <div style="width:80%; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px; border-left:5px solid #2a72a5;">
                <div class="row">
                    
                    <div class="col-1">
                        <div style = "width:32px; margin:auto">
                        <img src="../../images/icons/Connect-Favicon-32x32.png" alt="NCI-Connect logo">
                        </div>
                    </div>

                    <div class="col-10">
                        <p class="style="font-style:bold; font-size:24px; margin-left:30px">
                            ${notif}
                        </p>
                        <em>
                            ${time}
                        </em>
                    </div>
                </div>
            </div>`
    }
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = template;
}