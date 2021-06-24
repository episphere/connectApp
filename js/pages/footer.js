export const footerTemplate = () => {
    // return `
    //     <div class="row footer-content">
    //         <div class="col content-wrapper">
    //             <ul class="menu">
    //                 <li class="menu-item links-border-right"><a class="footer-links" href="https://dceg.cancer.gov/research/who-we-study/cohorts/connect">DCEG Connect Study</a></li>
    //                 <li class="menu-item links-border-right"><a class="footer-links" href="https://dceg.cancer.gov/">DCEG Home</a></li>
    //                 <li class="menu-item links-border-right"><a class="footer-links" href="https://dceg.cancer.gov/about/contact-dceg">Contact DCEG</a></li>
    //                 <li class="menu-item links-border-right"><a class="footer-links" href="https://www.cancer.gov/global/web/policies">Policies</a></li>
    //                 <li class="menu-item links-border-right"><a class="footer-links" href="https://www.cancer.gov/global/web/policies/accessibility">Accessibility</a></li>
    //                 <li class="menu-item links-border-right"><a class="footer-links" href="https://www.cancer.gov/global/viewing-files">Viewing files</a></li>
    //                 <li class="menu-item links-border-right"><a class="footer-links" href="https://www.cancer.gov/global/web/policies/foia">FOIA</a></li>
    //                 <li class="menu-item"><a class="footer-links" href="https://dceg.cancer.gov/about/sitemap">DCEG Sitemap</a></li>
    //             </ul>
    //             <ul class="menu">
    //                 <li class="menu-item links-border-right"><a class="footer-links" href="http://www.hhs.gov/">U.S. Department of Health and Human Services</a></li>
    //                 <li class="menu-item links-border-right"><a class="footer-links" href="http://www.nih.gov/">National Institutes of Health</a></li> 
    //                 <li class="menu-item links-border-right"><a class="footer-links" href="http://www.cancer.gov/">National Cancer Institute</a></li> 
    //                 <li class="menu-item"><a class="footer-links" href="http://www.usa.gov/">USA.gov</a></li>
    //             </ul>
    //             <p class="menu footer-tagline">NIH…Turning Discovery Into Health<sup>®</sup></p>
    //         </div>
    //     </div>
    //     `;
    return `
        <div class="row footer-content">
            <div class="row w-100">
                <div class="col content-wrapper">
                    <div class="dceg-footer align-left">Division of Cancer Epidemiology and Genetics</div>
                    <div class="nci-dceg-footer align-left">at the National Cancer Institute</div>
                </div>
            </div>
            <div class="row w-100 align-left">
                <div class="col-lg-6 content-wrapper">
                    <div class="footer-heading">CONTACT</div>
                    <div class="footer-sub-heading pt-3">(800) 000-0000</div>
                </div>
                <div class="col-lg-6 content-wrapper">
                    <div class="footer-heading">POLICIES</div>
                    <div class="footer-sub-heading pt-3"><a class="footer-links" target="__blank" href="https://www.cancer.gov/global/web/policies/accessibility">Accessibility</a></div>
                    <div class="footer-sub-heading pt-3">Disclaimer</div>
                    <div class="footer-sub-heading pt-3"><a class="footer-links" target="__blank" href="https://www.cancer.gov/global/web/policies/foia">FOIA</a></div>
                    <div class="footer-sub-heading pt-3">Privacy & Security</div>
                    <div class="footer-sub-heading pt-3"><a class="footer-links" target="__blank" href="https://dceg.cancer.gov/about/sitemap">Site Map</a></div>
                </div>
            </div>
            <div class="row w-100 pt-5">
                <div class="col-lg-2"></div>
                <div class="col no-wrap align-left pr-0"><a class="footer-links gov-dept-links p-0" target="__blank" href="http://www.hhs.gov/">U.S. Department of Health and Human Services</a></div>
                <div class="col no-wrap align-left pr-0"><a class="footer-links gov-dept-links p-0" target="__blank" href="http://www.nih.gov/">National Institutes of Health</a></div>
                <div class="col no-wrap align-left pr-0"><a class="footer-links gov-dept-links p-0" target="__blank" href="http://www.cancer.gov/">National Cancer Institute</a></div>
                <div class="col no-wrap align-left p-0"><a class="footer-links gov-dept-links p-0" target="__blank" href="http://www.usa.gov/">USA.gov</a></div>
                <div class="col-lg-2"></div>
            </div>
            <div class="row pt-3 w-100">
                <div class="col">
                    <p class="nih-tagline">NIH…Turning Discovery Into Health<sup>®</sup></p>
                </div>
            </div>
        </div>
    `
}