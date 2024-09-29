import detectUrlChange from "detect-url-change";

import { settings } from "~/config";
import { GlobalStorage } from "~/helpers/globalstorage";
// import { handleDefaultBlocks } from ".";

async function main() {
  GlobalStorage.get(settings.platformDefaults.youtube.blockShorts.key).then((v) => {
    if (v) removeShortsNavigation();
  });

  GlobalStorage.get(settings.platformDefaults.youtube.grayScaleThumbnails.key).then((v) => {
    if (v) grayScaleThumbnails();
  });

  GlobalStorage.get(settings.platformDefaults.youtube.blackThumbnails.key).then((v) => {
    if (v) blackThumbnails();
  });

  GlobalStorage.get(settings.platformDefaults.youtube.blockShorts.key).then((v) => {
    if (!v) return;

    detectUrlChange.on("change", (newUrl) => {
      // handleDefaultBlocks(newUrl);
    });
  });
}

main();

function removeShortsNavigation() {
  const style = document.createElement("style");
  style.textContent = `
    a[title='Shorts'] {
      display: none !important;
    }
    ytd-rich-shelf-renderer[is-shorts] {
      display: none !important;
    }
    ytd-reel-shelf-renderer {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

function grayScaleThumbnails() {
  const style = document.createElement("style");
  style.textContent = `
    yt-image.ytd-thumbnail img,
    yt-image.ytd-playlist-video-thumbnail-renderer,
    ytd-display-ad-renderer {
      filter: grayscale(1);
    }
    `;
  document.head.appendChild(style);
}

function blackThumbnails() {
  const style = document.createElement("style");
  style.textContent = `
    yt-image.ytd-thumbnail img,
    yt-image.ytd-playlist-video-thumbnail-renderer,
    ytd-display-ad-renderer {
      filter: brightness(0);
    }
    `;
  document.head.appendChild(style);
}
