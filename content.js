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
    } else {
      video.style.display = ""; // Reset display style
    }
  });
}

chrome.storage.sync.get("topics", (data) => {
  const topics = data.topics || [];
  if (topics.length > 0) filterVideos(topics);
});

const observer = new MutationObserver(() => {
  chrome.storage.sync.get("topics", (data) => {
    const topics = data.topics || [];
    if (topics.length > 0) {
      filterVideos(topics);
    } else {
      // Show all videos if no topics are set
      const videoElements = document.querySelectorAll(
        "ytd-rich-item-renderer, ytd-video-renderer"
      );
      videoElements.forEach((video) => {
        video.style.display = "";
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
