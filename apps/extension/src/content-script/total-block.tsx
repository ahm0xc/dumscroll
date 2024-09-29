import * as React from "react";
import ReactDOM from "react-dom/client";

export function blockTotalWebsite() {
  const rootEl = document.createElement("div");
  rootEl.id = "root";
  document.body.innerHTML = "";
  document.body.appendChild(rootEl);
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

  root.render(
    <React.StrictMode>
      <Blocker />
    </React.StrictMode>,
  );
}

function Blocker() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <p>This website is blocked, for you own betterment.</p>
    </div>
  );
}

// function blockAllSound() {
//   // Mute all <audio> and <video> elements
//   document.querySelectorAll("audio, video").forEach((el) => {
//     // @ts-ignore
//     el.muted = true;
//     // @ts-ignore
//     el.pause();
//   });

//   // Disable Web Audio API
//   // @ts-ignore
//   if (window.AudioContext || window.webkitAudioContext) {
//     const dummyContext = new (window.AudioContext ||
//       // @ts-ignore
//       window.webkitAudioContext)();
//     dummyContext.suspend();

//     // Override the AudioContext constructor
//     // @ts-ignore
//     window.AudioContext = window.webkitAudioContext = () => dummyContext;
//   }

//   // Block audio from iframes
//   document.querySelectorAll("iframe").forEach((iframe) => {
//     try {
//       // @ts-ignore
//       iframe.contentWindow.postMessage("mute", "*");
//     } catch {
//       // Ignore errors for cross-origin iframes
//     }
//   });
// }

// To unblock sound, you'd need to reverse these changes
// function unblockAllSound() {
//   // Unmute all <audio> and <video> elements
//   document.querySelectorAll("audio, video").forEach((el) => {
//     el.muted = false;
//   });

//   // Re-enable Web Audio API (this may require a page reload)
//   if (window.AudioContext || window.webkitAudioContext) {
//     delete window.AudioContext;
//     delete window.webkitAudioContext;
//   }

//   // Unblock audio from iframes
//   document.querySelectorAll("iframe").forEach((iframe) => {
//     try {
//       iframe.contentWindow.postMessage("unmute", "*");
//     } catch (e) {
//       // Ignore errors for cross-origin iframes
//     }
//   });
// }
