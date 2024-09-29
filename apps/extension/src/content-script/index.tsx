// import detectUrlChange from "detect-url-change";

// import { defaultBlocks, settings } from "~/config";
// import { GlobalStorage } from "~/helpers/globalstorage";
// import { getHigherLevelDomain } from "~/lib/utils";
// import type { ScheduleType } from "~/options/settings/schedule";
// import { openCrimeModal } from "./crime-modal";
// import { blockTotalWebsite } from "./total-block";
// import { trackTime } from "./track-time";

// const origin = window.location.origin;
// trackTime({
//   url: origin,
// });

// const rootEl = document.createElement("dumscroll-root");
// document.body.appendChild(rootEl);

// detectUrlChange.on("change", async (newUrl) => {
//   // handle schedules
//   const schedules = (await GlobalStorage.get(settings.schedule.key)) as ScheduleType[] | undefined;
//   if (schedules) {
//     handleSchedules(newUrl, schedules);
//   }
//   // handle default blocks
//   // handleDefaultBlocks(newUrl);
// });

// function handleSchedules(newUrl: string, schedules: ScheduleType[]): void {
//   for (let i = 0; i < schedules.length; i++) {
//     const schedule = schedules[i];

//     const higherLevelDomainWithPath = getHigherLevelDomain(schedule.url);
//     if (!newUrl.includes(higherLevelDomainWithPath)) continue;
//     console.info("DETECTED BLOCKED WEBSITE: ", newUrl);

//     const [startHour, startMinute] = schedule.startingTime.split(":").map(Number);
//     const [endHour, endMinute] = schedule.endingTime.split(":").map(Number);

//     const currentTime = new Date();
//     const currentHour = currentTime.getHours();
//     const currentMinute = currentTime.getMinutes();

//     if (
//       schedule.weeks.includes(currentTime.getDay()) &&
//       currentHour >= startHour &&
//       currentMinute >= startMinute &&
//       currentHour <= endHour &&
//       currentMinute < endMinute
//     ) {
//       console.info("BLOCKING: ", newUrl);
//       // TODO: add feat to handle multiple types of blocking like `admit` and `total`
//       blockTotalWebsite();
//     }
//   }
// }

// export function handleDefaultBlocks(newUrl: string) {
//   for (let i = 0; i < defaultBlocks.length; i++) {
//     const block = defaultBlocks[i];
//     if (!newUrl.includes(block.url)) continue;

//     if (block.blockType === "admit") {
//       openCrimeModal(newUrl);
//     }
//     if (block.blockType === "total") {
//       blockTotalWebsite();
//     }
//   }
// }
