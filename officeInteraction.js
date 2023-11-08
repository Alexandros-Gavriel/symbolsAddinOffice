// Ensure that Office.js is initialized before calling any Office.js specific APIs
Office.onReady((info) => {
    if (info.host === Office.HostType.Outlook) {
        console.log("Office.js is ready!");
    }
});

function insertSymbolIntoEmail(symbol) {
    // Check if the Office context is available
    if (Office && Office.context && Office.context.mailbox && Office.context.mailbox.item) {
        Office.context.mailbox.item.body.setSelectedDataAsync(symbol, { coercionType: Office.CoercionType.Text }, (result) => {
            if (result.status === Office.AsyncResultStatus.Failed) {
                console.error('Failed to insert text: ' + result.error.message);
            } else {
                console.log('Symbol inserted into email body.');
            }
        });
    } else {
        console.error('Office context is not available. This function should be run within the context of an Outlook add-in.');
    }
}
