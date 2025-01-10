let scrapEmail = document.getElementById('scrapeEmails');

scrapEmail.addEventListener("click", async () => {
  // Get the current active tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Execute script to parse emails on the page
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: scrapeEmailFromPage,
  });
});

// Function to scrape emails from the page
function scrapeEmailFromPage() {
  // Regex to parse emails from HTML code
  const emailRegex = /[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}/g;

  // Get all email matches from the page's body content
  let emails = document.body.innerHTML.match(emailRegex);

  // If emails are found, alert them, otherwise show a message
  if (emails && emails.length > 0) {
    alert("Emails found: \n" + emails.join("\n"));
  } else {
    alert("No emails found on this page.");
  }
}
