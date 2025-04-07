import { listenForChanges } from "./utils";

listenForChanges("cs-instagram-remove-feed", (enabled) => {
  if (enabled) {
    const style = document.createElement("style");
    style.id = "cs-instagram-remove-feed";
    style.textContent = `
      main div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1 {
        display: none;
      }
      .x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x6s0dn4.x1oa3qoh.x1nhvcw1 {
        height: 100vh;
      }
    `;
    document.head.appendChild(style);
  }
  else {
    const style = document.getElementById("cs-instagram-remove-feed");
    if (style) {
      style.remove();
    }
  }
});

listenForChanges("cs-instagram-remove-stories", (enabled) => {
  if (enabled) {
    const style = document.createElement("style");
    style.id = "cs-instagram-remove-stories";
    style.textContent = `
    [data-pagelet='story_tray'] {
      display: none;
    }
    `;
    document.head.appendChild(style);
  }
  else {
    const style = document.getElementById("cs-instagram-remove-stories");
    if (style) {
      style.remove();
    }
  }
});

listenForChanges("cs-instagram-filter-grayscale", (enabled) => {
  if (enabled) {
    const style = document.createElement("style");
    style.id = "cs-instagram-filter-grayscale";
    style.textContent = `
      .xw7yly9 .x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x6s0dn4.x1oa3qoh.x1nhvcw1 img,
      .xw7yly9 .x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x6s0dn4.x1oa3qoh.x1nhvcw1 video {
        filter: grayscale(100%);
      }
    `;
    document.head.appendChild(style);
  }
  else {
    const style = document.getElementById("cs-instagram-filter-grayscale");
    if (style) {
      style.remove();
    }
  }
});

listenForChanges("cs-instagram-block-reels", (enabled) => {
  if (enabled) {
    const style = document.createElement("style");
    style.id = "cs-instagram-block-reels";
    style.textContent = `
      .x1iyjqo2.xh8yej3 span:has(a[href*='reels']) {
        display: none;
      }
    `;
    document.head.appendChild(style);
  }
  else {
    const style = document.getElementById("cs-instagram-block-reels");
    if (style) {
      style.remove();
    }
  }
});

listenForChanges("cs-instagram-block-explore", (enabled) => {
  if (enabled) {
    const style = document.createElement("style");
    style.id = "cs-instagram-block-explore";
    style.textContent = `
      .x1iyjqo2.xh8yej3 span:has(a[href*='explore']) {
        display: none;
      }
    `;
    document.head.appendChild(style);
  }
  else {
    const style = document.getElementById("cs-instagram-block-explore");
    if (style) {
      style.remove();
    }
  }
});
