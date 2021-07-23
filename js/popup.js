const unsubscribeChannels = document.querySelector("#unsubscribeChannels")
const removeLikedVideos = document.querySelector("#removeLikedVideos")
const deleteLikedPrivateVideos = document.querySelector(
  "#deleteLikedPrivateVideos"
)

chrome.storage.local.get("tabId", (stored) => {
  removeLikedVideos.addEventListener("click", () => {
    chrome.tabs.sendMessage(stored.tabId, {
      message: "deleteLikedVideos",
    })
  })
  unsubscribeChannels.addEventListener("click", () => {
    chrome.tabs.sendMessage(stored.tabId, {
      message: "unsubscribeChannels",
    })
  })
  deleteLikedPrivateVideos.addEventListener("click", () => {
    chrome.tabs.sendMessage(stored.tabId, {
      message: "deleteLikedPrivateVideos",
    })
  })
})
