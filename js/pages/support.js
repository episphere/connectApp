export const renderSupportPage = () => {
    let template =  `
        <div class="row">
            <h3>Help Center</h3>
        </div>
        <div class="row">
            <div class="col-md-12">
                <button class="btn faq-btn" type="button" data-toggle="collapse" data-target="#faq1" aria-expanded="false" aria-controls="faq1">
                    <span class="faq-text">General Information</span> <span class="faq-icon"><i class="fas fa-plus"></i></span>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="collapse" id="faq1">
                    <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <button class="btn faq-btn" type="button" data-toggle="collapse" data-target="#faq2" aria-expanded="false" aria-controls="faq2">
                    <span class="faq-text">Study Participation</span> <span class="faq-icon"><i class="fas fa-plus"></i></span>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="collapse" id="faq2">
                    <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <button class="btn faq-btn" type="button" data-toggle="collapse" data-target="#faq3" aria-expanded="false" aria-controls="faq3">
                    <span class="faq-text">Biological Samples</span> <span class="faq-icon"><i class="fas fa-plus"></i></span>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="collapse" id="faq3">
                    <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <button class="btn faq-btn" type="button" data-toggle="collapse" data-target="#faq4" aria-expanded="false" aria-controls="faq4">
                    <span class="faq-text">Policy and Confidentiality</span> <span class="faq-icon"><i class="fas fa-plus"></i></span>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="collapse" id="faq4">
                    <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>
            </div>
        </div>

        <div class="row align-center">
            <div class="col-md-12">
                <strong>Can't find the answer?</strong>
            </div>
        </div>
        <div class="row align-center">
            <div class="col-md-12">
                <button class="btn btn-primary btn-disbaled">Help Form</button>
            </div>
        </div>
        <div class="row align-center">
            <div class="col-md-12">
                <strong>You can also contant our support line at</strong>
            </div>
        </div>
        <div class="row align-center">
            <div class="col-md-12">
                1-800-CONNECT</br>
                helpdesk@connect.gov
            </div>
        </div>
    `;
    document.getElementById('root').innerHTML = template;
    const btns = document.getElementsByClassName('faq-btn');
    Array.from(btns).forEach(element => {
        element.addEventListener('click', () => {
            const childs = element.querySelectorAll("[class='faq-icon']")
            const icon = childs[0].childNodes;
            if(icon[0].classList.contains('fa-plus')){
                icon[0].classList.add('fa-minus')
                icon[0].classList.remove('fa-plus')
            }
            else {
                icon[0].classList.remove('fa-minus')
                icon[0].classList.add('fa-plus')
            }
        })
    });
}