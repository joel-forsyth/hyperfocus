chrome.storage.sync.get("whitelist", (data) => {
  const whitelist = data.whitelist || [];
  if (!whitelist.includes(window.location.hostname)) return; // if whitelisted, don't removeLinks
  let intervalId = setInterval(removeLinks, 500);           // else run removeLinks every .5s
  setTimeout(() => {clearInterval(intervalId); }, 100000);  // run for 100s
});

function removeLinks() {
  document.querySelectorAll("a, area").forEach(link => { // including "link" here breaks websites
    link.removeAttribute("href");
    link.removeAttribute("data-link");
  });
  document.querySelectorAll('[action="click"]').forEach(element => {
    element.removeAttribute("action");
  });
}
