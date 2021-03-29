import { getMyData, retrieveNotifications, showAnimation, hideAnimation } from "../shared.js";
import {humanReadableMDYwithTime} from "../util.js";


export const renderNotificationsPage = async () => {
    showAnimation();
    let template = '<h2>Notifications</h2>';
    
    let notifs = await retrieveNotifications()
    console.log(notifs)
    for(let i = 0; i<notifs.data.length; i++){
        let notif = notifs.data[i];
        template += `
            <div style="width100%; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px; border-left:5px solid ${notif.read == true ? 'lightgrey' : '#2a72a5'};">
                <div class="row">
                    
                    <div class="col-1">
                        <div style = "width:32px; margin:auto">
                        <img src="../../images/icons/Connect-Favicon-32x32.png" alt="NCI-Connect logo">
                        </div>
                    </div>

                    <div class="col-10">
                            ${notif.notification.body}
                        <em>
                            Sent ${humanReadableMDYwithTime(notif.notification.time)}
                        </em>
                    </div>
                </div>
            </div>`
    }
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = template;
    hideAnimation();
}