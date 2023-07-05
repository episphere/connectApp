import { getMyData, hasUserData } from "../shared.js";

export const renderVerifiedPage = async () => {
    const myData = await getMyData();
    let site = 0;
    if(hasUserData(myData)){
        site = myData["data"]['827220437']
    }
    let template =  `
        <br>
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <div class="row">
                    <div class="col">
                        <span class="userProfileHeader">
                            Email has been successfully verified!
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
            </div>
        </div>
    `;
    

    document.getElementById('root').innerHTML = template;
    let tID = setTimeout(() => {
        window.location.hash = "#dashboard";
        window.clearTimeout(tID);
    }, 5000);
}