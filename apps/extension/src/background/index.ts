// console.log('background is running')

// chrome.runtime.onMessage.addListener((request) => {
//   if (request.type === 'COUNT') {
//     console.log('background has received a message from popup, and count is ', request?.count)
//   }
// })

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.url) {
    handleChange(changeInfo.url, tabId)
  }
})

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  handleChange(details.url, details.tabId)
});

function handleChange(url:string, tabId:number) {
  console.log({url, tabId})
}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.includes('/shorts/')) {
      return { redirectUrl: details.url.replace('/shorts/', '/watch?v=') };
    }
  },
  { urls: ['https://*.youtube.com/*'] },
  // ['blocking']
);