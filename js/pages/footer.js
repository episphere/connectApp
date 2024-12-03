import { urls, translateHTML } from "./../shared.js";

export const footerTemplate = () => {
    const footerHTML = `
        <div class="row footer-content" style="margin:0">
            <div class="row w-100" style="margin:0">
                <div class="col content-wrapper" data-i18n="footer.nci-dceg">
                    <div class="dceg-footer align-left text-center text-sm-center">Division of Cancer Epidemiology and Genetics</div>
                    <div class="nci-dceg-footer align-left text-center text-sm-center">at the National Cancer Institute</div>
                </div>
            </div>
            <div class="row w-100 pt-0 align-left" style="margin:0">
                <div class="col-lg-4 pt-3 content-wrapper text-center text-sm-center">
                    <div class="footer-heading" data-i18n="footer.Questions">HAVE QUESTIONS?</div>
                    <div class="footer-sub-heading pt-3" data-i18n="footer.contactLink"><a class="footer-links" target="__blank" href="https://norcfedramp.servicenowservices.com/recruit">Contact the Connect Support Center</a></div>
                    <div class="footer-sub-heading pt-3" data-i18n="footer.emailUs"><a class="footer-links" href="mailto:ConnectStudy@norc.org">Email Us</a></div>
                </div>
                <div class="col-lg-4 pt-3 content-wrapper text-center text-sm-center">
                    <div class="footer-heading" data-i18n="footer.policies">POLICIES</div>
                    <div class="footer-sub-heading pt-3" data-i18n="footer.accessibility"><a class="footer-links" target="__blank" href="https://www.cancer.gov/global/web/policies/accessibility">Accessibility</a></div>
                    <div class="footer-sub-heading pt-3" data-i18n="footer.disclaimer"><a class="footer-links" target="__blank" href="https://www.cancer.gov/policies/disclaimer">Disclaimer</a></div>
                    <div class="footer-sub-heading pt-3" data-i18n="footer.foia"><a class="footer-links" target="__blank" href="https://www.cancer.gov/global/web/policies/foia">FOIA</a></div>
                    <div class="footer-sub-heading pt-3" data-i18n="footer.privacySecurity"><a class="footer-links" target="__blank" href="https://www.cancer.gov/policies/privacy-security">Privacy & Security</a></div>
                    <div class="footer-sub-heading pt-3" data-i18n="footer.vulnerability"><a class="footer-links" target="__blank" href="https://www.hhs.gov/vulnerability-disclosure-policy/index.html">HHS Vulnerability Disclosure</a></div>
                    <div class="footer-sub-heading pt-3" data-i18n="footer.siteMap"><a class="footer-links" target="__blank" href="https://dceg.cancer.gov/about/sitemap">Site Map</a></div>
                </div>

            </div>
            <div class="row w-100 pt-5 align-center" style="margin:0">
                <ul class="menu w-100" style="padding:0" data-i18n="footer.menuList">
                    <li class="menu-item p-0 footer-menu-item"><a target="__blank" class="footer-links gov-dept-links p-0" href="http://www.hhs.gov/">U.S. Department of Health and Human Services</a></li>
                    <li class="menu-item p-0 footer-menu-item"><a target="__blank" class="footer-links gov-dept-links p-0" href="http://www.nih.gov/">National Institutes of Health</a></li> 
                    <li class="menu-item p-0 footer-menu-item"><a target="__blank" class="footer-links gov-dept-links p-0" href="http://www.cancer.gov/">National Cancer Institute</a></li> 
                    <li class="menu-item p-0"><a target="__blank" class="footer-links gov-dept-links p-0" href="http://www.usa.gov/">USA.gov</a></li>
                </ul>
            </div>
            <div class="row w-100">
                <div class="col-md-2">
                </div>
                <div class="col-md-8">
                    <p class="gov-dept-links" data-i18n="footer.cancerPrevention">Connect for Cancer Prevention Study, the Connect for Cancer Prevention Study logo, and “Connect today. Prevent cancer tomorrow.” are trademarks of the U.S. Department of Health and Human Services (HHS).<sup>®</sup></p>
                </div>
                <div class="col-md-2">
                </div>
            </div>
            <div class="row w-100" style="margin:0">
                <div class="col">
                    <p class="nih-tagline" data-i18n="footer.nihHealth">NIH…Turning Discovery Into Health<sup>®</sup></p>
                    <p id="appVersion"></p>
                </div>
            </div>
        </div>
    `;

    return translateHTML(footerHTML);
};
