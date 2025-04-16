import { listenAndHandleHideElement } from "./utils";

listenAndHandleHideElement("cs-youtube-home-page-hide-suggestions-category", "ytd-browse[page-subtype='home'] ytd-two-column-browse-results-renderer[page-subtype='home'] #header");
listenAndHandleHideElement("cs-youtube-home-page-hide-watched-videos", "ytd-browse[page-subtype='home'] ytd-rich-item-renderer:has(#progress)");
listenAndHandleHideElement("cs-youtube-home-page-hide-playlist-and-mixes", "ytd-browse[page-subtype='home'] ytd-rich-grid-renderer > #contents > ytd-rich-item-renderer:has(a[href*='list='])");
