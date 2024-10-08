document.getElementById("save").addEventListener("click", () => {
  const topics = document
    .getElementById("topics")
    .value.split(",")
    .map((topic) => topic.trim());
  chrome.storage.sync.set({ topics }, () => {
    console.log("Topics saved:", topics);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  });
});

document.getElementById("quit").addEventListener("click", () => {
  chrome.storage.sync.remove("topics", () => {
    console.log("Settings cleared");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  });
});
