const sleep = (milliSecond) => {
  return new Promise((resolve) => setTimeout(resolve, milliSecond))
}

const deleteLikedVideos = async () => {
  const videos = document.querySelectorAll(
    "#primary ytd-playlist-video-renderer yt-icon-button.dropdown-trigger > button[aria-label]"
  )

  let sleepOut

  for (let video of videos) {
    video.click()

    sleepOut = setTimeout(() => {
      if (
        document.querySelector(
          "tp-yt-paper-listbox.style-scope.ytd-menu-popup-renderer"
        ).lastElementChild
      ) {
        document
          .querySelector(
            "tp-yt-paper-listbox.style-scope.ytd-menu-popup-renderer"
          )
          .lastElementChild.click()
      }
    }, 100)

    await sleep(500)
    clearTimeout(sleepOut)
  }
}

const unsubscribeChannels = async () => {
  const channels = document.querySelectorAll(
    "#primary tp-yt-paper-button.ytd-subscribe-button-renderer"
  )

  let sleepout

  for (let channel of channels) {
    channel.click()

    sleepout = setTimeout(function () {
      if (document.querySelector("yt-button-renderer#confirm-button")) {
        document.querySelector("yt-button-renderer#confirm-button").click()
      }
    }, 100)

    await sleep(500)
    clearTimeout(sleepout)
  }
}

const deleteLikedPrivateVideos = async () => {
  document
    .querySelectorAll("#menu yt-icon-button.dropdown-trigger > button")[0]
    .click()
  await sleep(500)

  document
    .querySelector("#contentWrapper ytd-menu-navigation-item-renderer a")
    .click()
  await sleep(500)

  const videos = document.querySelectorAll(
    "#primary ytd-playlist-video-renderer yt-icon-button.dropdown-trigger > button"
  )

  let sleepOut

  for (let video of videos) {
    video.click()

    sleepOut = setTimeout(() => {
      if (
        document.querySelector(
          "tp-yt-paper-listbox.style-scope.ytd-menu-popup-renderer"
        ).lastElementChild
      ) {
        document
          .querySelector(
            "tp-yt-paper-listbox.style-scope.ytd-menu-popup-renderer"
          )
          .lastElementChild.click()
      }
    }, 100)

    await sleep(500)
    clearTimeout(sleepOut)
  }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.message === "deleteLikedVideos") {
    deleteLikedVideos()
  }
  if (request.message === "unsubscribeChannels") {
    unsubscribeChannels()
  }

  if (request.message === "deleteLikedPrivateVideos") {
    deleteLikedPrivateVideos()
  }
})
