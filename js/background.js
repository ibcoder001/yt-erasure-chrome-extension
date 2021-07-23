chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ tabId: -1 })
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  try {
    chrome.storage.local.set({ tabId: tabId })
    if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
      const result = await chrome.scripting.executeScript({
        target: { tabId },
        files: ["/js/foreground.js"],
      })

      if (result) {
        console.log(
          `Foreground script successfully injected in the permitted hosts`
        )
      }
    }
  } catch (error) {
    console.error(error)
  }
})
