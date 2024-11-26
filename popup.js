//TODO: update "whitelist" to "blacklist"

document.addEventListener("DOMContentLoaded", () => {
  const toggleWhitelistButton = document.getElementById("toggle-whitelist-button");
  toggleWhitelistButton.addEventListener("click", toggleWhitelist);
  const whitelistStatus = document.getElementById("whitelist-status");
  let refresh = false;
  updateWhitelistStatus();

  function updateWhitelistStatus() {
    chrome.storage.sync.get("whitelist", (data) => {
      const whitelist = data.whitelist || [];
      console.log("Hyperfocus - Current Whitelist:", whitelist.join(', '));
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentHostname = new URL(tabs[0].url).hostname;
        toggleWhitelistButton.innerText = whitelist.includes(currentHostname) 
          ? "Remove from Blacklist" : "Add to Blacklist";
        if (refresh) toggleWhitelistButton.innerText = "Refresh";
      });
    });
  }

  function toggleWhitelist() {
    if (refresh) {
      chrome.tabs.reload(null, { bypassCache: true });
      refresh = false;
      window.close();
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentHostname = new URL(tabs[0].url).hostname;
      chrome.storage.sync.get("whitelist", (data) => {
        const whitelist = data.whitelist || [];
        const updatedWhitelist = whitelist.includes(currentHostname)
          ? whitelist.filter((item) => item !== currentHostname) // removes currentHostname
          : [...whitelist, currentHostname]; // adds currentHostname
        chrome.storage.sync.set({ whitelist: updatedWhitelist }, () => {
          refresh = true;
          updateWhitelistStatus();
        });
      });
    });
  }

  // TODO: add import/export whitelist functionality
    // Workaround: enter these into Chrome console as appropriate
      // chrome.storage.sync.get("whitelist", (data) => {
      //   console.log(data.whitelist);
      // });

      // chrome.storage.sync.clear(() => {
      //   console.log("All sync storage data cleared!");
      // });

      // (perhaps ask ChatGPT for a command that would let you load a list in a similar fashion)
});
