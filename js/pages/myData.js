import { storeResponse, getMyData } from "../shared.js";

export const renderMyDataPage = () => {
    getMyData().then(res => {
    let template = `
        <div class="row">
            <div class="col">
                <h3>My Data</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-1">
                <i class="fas fa-user-circle fa-4x"></i>
            </div>
            <div class="col-md-10">
                <div class="row">Module 1</div>
                <div class="row">Completed on: ${(res.data.Module1 && res.data.Module1.COMPLETED_TS)? new Date(res.data.Module1.COMPLETED_TS).toLocaleString()  : "---"}</div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-1">
                <i class="fas fa-user-circle fa-4x"></i>
            </div>
            <div class="col-md-10">
                <div class="row">Module 2</div>
                <div class="row">Completed on: ${(res.data.Module2 && res.data.Module2.COMPLETED_TS)? new Date(res.data.Module2.COMPLETED_TS).toLocaleString()  : "---"}</div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-1">
                <i class="fas fa-user-circle fa-4x"></i>
            </div>
            <div class="col-md-10">
                <div class="row">Module 3</div>
                <div class="row">Completed on: ${(res.data.Module3 && res.data.Module3.COMPLETED_TS)? new Date(res.data.Module3.COMPLETED_TS).toLocaleString()  : "---"}</div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-1">
                <i class="fas fa-user-circle fa-4x"></i>
            </div>
            <div class="col-md-10">
                <div class="row">Module 4</div>
                <div class="row">Completed on: ${(res.data.Module4 && res.data.Module4.COMPLETED_TS)? new Date(res.data.Module4.COMPLETED_TS).toLocaleString()  : "---"}</div>
            </div>
        </div>
    `;
    document.getElementById('root').innerHTML = template;
    });
}