function filterVideos(topics) {
  const videoElements = document.querySelectorAll(
    "ytd-rich-item-renderer, ytd-video-renderer"
  );

  videoElements.forEach((video) => {
    const titleElement = video.querySelector("#video-title");
    const title = titleElement ? titleElement.textContent.toLowerCase() : "";

    const matchesTopic = topics.some((topic) =>
      title.includes(topic.toLowerCase())
    );
    if (!matchesTopic) {
      video.style.display = "none";
    }
  });
}

chrome.storage.sync.get("topics", (data) => {
  const topics = data.topics || ["default", "topics"];
  filterVideos(topics);
});

const observer = new MutationObserver(() => {
  chrome.storage.sync.get("topics", (data) => {
    const topics = data.topics || ["default", "topics"];
    filterVideos(topics);
  });
});

observer.observe(document.body, { childList: true, subtree: true });
