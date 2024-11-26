chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addToWhitelist") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = (new URL(tabs[0].url)).hostname;
      chrome.storage.sync.get("whitelist", (data) => {
        const whitelist = [...data.whitelist, currentUrl];
        chrome.storage.sync.set({ whitelist: whitelist }, () => {
          sendResponse({});
        });
      });
    });
    // TODO: handle synchronously
    return true;
  }
  return true;
});
