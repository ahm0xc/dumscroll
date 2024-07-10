import detectUrlChange from 'detect-url-change';
import "./youtube.css"

const DEFAULT_DELAY = 300

function main() {
    detectUrlChange.on('change', (newUrl) => {
        if(newUrl.includes("/shorts/")) {
            const url = new URL(newUrl)
            const v = url.pathname.split("/").pop();
            window.location.replace(`https://youtu.be/watch?v=${v}`)
        }
    });
}

main();