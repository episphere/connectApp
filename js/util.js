
export const humanReadableMDYwithTime = (date) => {
    if (!date)
        return;
    let consentTimeSubmitted = date;
    let submittedDate = String(consentTimeSubmitted);
    submittedDate = submittedDate.split("T");
    let submittedTime = submittedDate[1];
    submittedTime = submittedTime.split(".");
    submittedTime = submittedTime[0];
    submittedDate = submittedDate[0];
    submittedDate = submittedDate.split("-");
    const readableYear = submittedDate[0];
    const readableMonth = parseInt(submittedDate[1])-1;
    const readableDate = submittedDate[2];
    const readableConsentDateTime = readableMonth + "/" + readableDate + "/" + readableYear + " " + submittedTime;
    return readableConsentDateTime; // 10/30/2020 20:30:22
  }