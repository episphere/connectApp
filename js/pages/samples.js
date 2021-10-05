
export const renderSamplesPage = async () => {
    document.title = 'My Connect - Samples';
    
    let template = `
    <br>
    
    <div class="row">
        <div class="col-md-2">
        </div>
        <div class="col-md-8 NotoSansFont">
            We will begin collecting samples early in 2022. We will reach out to you with instructions and next steps when it is time to donate samples. Thank you for being part of Connect!
        </div>
        <div class="col-md-2">
        </div>
    </div>    
    `;
    document.getElementById('root').innerHTML = template;
    
}