export const renderMyDataPage = () => {
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
                <div class="row">Completed on: ---</div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-1">
                <i class="fas fa-user-circle fa-4x"></i>
            </div>
            <div class="col-md-10">
                <div class="row">Module 2</div>
                <div class="row">Completed on: ---</div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-1">
                <i class="fas fa-user-circle fa-4x"></i>
            </div>
            <div class="col-md-10">
                <div class="row">Module 3</div>
                <div class="row">Completed on: ---</div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-1">
                <i class="fas fa-user-circle fa-4x"></i>
            </div>
            <div class="col-md-10">
                <div class="row">Module 4</div>
                <div class="row">Completed on: ---</div>
            </div>
        </div>
    `;
    document.getElementById('root').innerHTML = template;
}