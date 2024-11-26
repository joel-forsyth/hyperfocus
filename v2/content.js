function removeLinks() {
  // remove references from links
  const links = document.querySelectorAll("a, area");
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    link.removeAttribute("href");
  }
  // edge case
  const clickElements = document.querySelectorAll('[class*=click]');
  for (const clickElement of clickElements) {
    for (const className of clickElement.classList) {
      if (className.includes("click")) {
        clickElement.classList.remove(className);
      }
    }
  }
}

// main[]
chrome.storage.sync.get("whitelist", (data) => {
  const whitelist = data.whitelist || [];
  const currentUrl = window.location.hostname;
  if (whitelist.includes(currentUrl)) return; // without removing links
  // else run removeLinks every half-second for 5 seconds
  // TODO: Update to use Alarms API
  let intervalId = setInterval(removeLinks, 500);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 5000);
});


