document.addEventListener("DOMContentLoaded", () => {
  const addToWhitelistButton = document.getElementById("add-to-whitelist-button");
  const whitelistStatus = document.getElementById("whitelist-status");

  // when the popup is opened:
  updateWhitelistStatus();

  addToWhitelistButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "addToWhitelist" }, () => {
      updateWhitelistStatus();
    });
  });

  // IDEA: Create remove-from-whitelist button
  // IDEA: Implement (option to) refresh with add to whitelist button

  function updateWhitelistStatus() {
    chrome.storage.sync.get("whitelist", (data) => {
      const whitelist = data.whitelist || [];
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = (new URL(tabs[0].url)).hostname;
        const isWhitelisted = whitelist.some((whitelistItem) => currentUrl === whitelistItem);
        if (isWhitelisted) {
          whitelistStatus.innerText = currentUrl + "\nis whitelisted.";
          addToWhitelistButton.disabled = true;
        } else {
          whitelistStatus.innerText = currentUrl + "\nis not whitelisted.";
          addToWhitelistButton.disabled = false;
        }
      });
    });
  }
});
