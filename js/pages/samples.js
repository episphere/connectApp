
export const renderSamplesPage = async () => {
    document.title = 'My Connect - Samples';
    
    let template = `
    <br>
    
    <div class="row">
        <div class="col-md-2">
        </div>
        <div class="col-md-8 NotoSansFont">
            Sample collection will begin in fall 2021. Our team will reach out to you with instructions and next steps when it is time to donate your samples. Thank you for being a part of Connect!
        </div>
        <div class="col-md-2">
        </div>
    </div>    
    `;
    document.getElementById('root').innerHTML = template;
    
}