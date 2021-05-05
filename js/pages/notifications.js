import { getMyData, retrieveNotifications, showAnimation, hideAnimation } from "../shared.js";
import {humanReadableMDYwithTime} from "../util.js";


export const renderNotificationsPage = async () => {
    showAnimation();
    //let template = '<h2>Notifications</h2>';
    
    let notifs = await retrieveNotifications()
    console.log(notifs)

    let template = `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
            
    `;
    let read = [];
    let unread = [];
    
    for(let i = 0; i < notifs.data.length; i++){
        if(notifs.data[i].read){
            read.push(notifs.data[i])

        }
        else{
            unread.push(notifs.data[i])
        }
    }
    if(unread.length == 0){
        template += `
                <ul class="nav nav-tabs" style="border-bottom:none; margin-top:20px">
                    <li class="nav-item">
                        <button class="nav-link navbar-btn survey-Active-Nav" id="readNotiifs">Read</button>
                    </li>
                </ul>`
    }
    else{
        template += `
                <ul class="nav nav-tabs" style="border-bottom:none; margin-top:20px">
                    <li class="nav-item" >
                        <button class=" nav-link navbar-btn survey-Active-Nav" id="unreadNotifs">Unread</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link navbar-btn survey-Inactive-Nav" id="readNotifs">Read</button>
                    </li>
                </ul>`
    }

    
    template += `
    <div style="border: 1px solid #dee2e6; padding: 20px; border-radius:0px 10px 10px 10px;" id="surveyMainBody">
    `;
    if(unread.length == 0){
        template += renderMainBody(notifs.data, 'read')
    }
    else{
        template += renderMainBody(notifs.data, 'unread')
    }
    
    template += `</ul>`
    template += `
        </div>
        <div class="col-lg-2">
        </div>
    </div>
    `
    
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = template;
    if(unread.length > 0){
        document.getElementById('readNotifs').addEventListener('click', () => {
            document.getElementById('surveyMainBody').innerHTML = renderMainBody(notifs.data, 'read') 
            if(!document.getElementById('readNotifs').classList.contains('survey-Active-Nav')){
                let toActive = document.getElementById('readNotifs');   
                let toInactive = document.getElementById('unreadNotifs');
                toActive.classList.remove('survey-Inactive-Nav')
                toActive.classList.add('survey-Active-Nav')
                toInactive.classList.add('survey-Inactive-Nav')
                toInactive.classList.remove('survey-Active-Nav')
            }
        })
        document.getElementById('unreadNotifs').addEventListener('click', () => {
            if(!document.getElementById('unreadNotifs').classList.contains('survey-Active-Nav')){
                let toInactive = document.getElementById('readNotifs');   
                let toActive = document.getElementById('unreadNotifs');
                toActive.classList.remove('survey-Inactive-Nav')
                toActive.classList.add('survey-Active-Nav')
                toInactive.classList.add('survey-Inactive-Nav')
                toInactive.classList.remove('survey-Active-Nav')
            }
            document.getElementById('surveyMainBody').innerHTML = renderMainBody(notifs.data, 'unread') 
        })
    }
    hideAnimation();
}



const renderMainBody = (data, tab) => {
    let template = `<ul class="questionnaire-module-list">`;
    let hasNotification = false;
    for(let i = 0; i < data.length; i++){

        //${notif.notification.body}
        if((tab == 'read' && data[i].read == true) || (tab == 'unread' && data[i].read == false)){
            template += `<li style="width:100%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                <div class="row">
                    
                   
                    <div class="col-md-1">
                        <i class="fas fa-bell d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                    </div>
                    

                    <div class="col-md-11">
                        <span class="consentBodyFont1">
                            ${data[i].notification.title}
                        </span>
                    </div>
                
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-10">
                    ${data[i].notification.body}
                    </div>
                    <div class="col-md-1">
                    </div>
                
                </div>
            </li>
            `
            console.log(data[i].notification.title)
            hasNotification = true;
        }
        
    }
    if(!hasNotification){
        template += `
            <div class="row">
                <span class="consentBodyFont1" style="text-align:center; margin:auto;">
                    You currently have no messages!
                </span>
            </div>
            `
    }
    
    return template;
}