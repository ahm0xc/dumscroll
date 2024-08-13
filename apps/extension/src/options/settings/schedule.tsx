import { AnimatePresence, motion } from "framer-motion";
import { TimerResetIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { settings } from "~/config";
import { WEEK_NAMES } from "~/constants";
import useGlobalStorage from "~/hooks/globalstorage";
import { cn, convertTime, isFirstTimeGreater, isShallowEqual, isValidURL } from "~/lib/utils";

export interface ScheduleType {
  url: string;
  startingTime: string;
  endingTime: string;
  weeks: number[];
}

export default function Schedule() {
  const { value: currentSchedules, set: setSchedule } = useGlobalStorage<ScheduleType[]>(
    settings.schedule.default,
    {
      key: settings.schedule.key,
    },
  );

  function addSchedule(schedule: ScheduleType) {
    setSchedule([schedule, ...currentSchedules]);
  }

  function removeSchedule(schedule: ScheduleType) {
    setSchedule(currentSchedules.filter((sch) => !isShallowEqual(sch, schedule)));
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-8">
      <div className="p-6 rounded-lg border bg-neutral-50">
        <p className="text-neutral-900 text-lg font-medium">Schedule blocking</p>
        <p className="text-sm mt-1 text-neutral-700">
          Specify websites to block them in certain time of your day.
        </p>
        <div className="mt-4">
          <ScheduleForm addSchedule={addSchedule} currentSchedules={currentSchedules} />
        </div>
      </div>
      <div className="xl:col-span-2">
        <BlockedWebsites schedules={currentSchedules} removeSchedule={removeSchedule} />
      </div>
    </div>
  );
}

function ScheduleForm({
  currentSchedules,
  addSchedule,
}: {
  currentSchedules: ScheduleType[];
  addSchedule: (schedule: ScheduleType) => void;
}) {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [startingTime, setStartingTime] = useState("00:00");
  const [endingTime, setEndingTime] = useState("23:59");
  const [weeks, setWeeks] = useState<Array<number>>(settings.schedule.defaultWeeks);

  async function handleSubmit() {
    if (!websiteUrl) {
      toast.error("Please specify a website url");
      return;
    }

    const url = websiteUrl.startsWith("https://") ? websiteUrl : `https://${websiteUrl}`;

    if (!isValidURL(url)) {
      toast.error("Invalid URL: ");
      return;
    }

    if (startingTime === endingTime) {
      toast.error("Ending time must be greater than starting time");
      return;
    }

    if (!startingTime || !endingTime) {
      toast.error("Missing starting time or ending time");
      return;
    }

    if (isFirstTimeGreater(startingTime, endingTime)) {
      toast.error("Ending time must come after starting time");
      return;
    }

    const scheduleToUpload: ScheduleType = {
      url,
      startingTime,
      endingTime,
      weeks,
    };

    const existingSchedule = currentSchedules.find((sch) => isShallowEqual(sch, scheduleToUpload));

    if (existingSchedule) {
      toast.error("Schedule already exists");
      return;
    }

    addSchedule(scheduleToUpload);
    toast.success("Added new schedule");
    reset();
  }

  function reset() {
    setWebsiteUrl("");
    setStartingTime("");
    setEndingTime("");
    setWeeks(settings.schedule.defaultWeeks);
  }

  return (
    <div className="space-y-2 border p-4 rounded-lg">
      <div className="space-y-1">
        <p className="text-xs">Website url</p>
        <Input
          placeholder="facebook.com"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs">Repeat</p>
        <div className="flex gap-2 justify-between">
          {Array.from({ length: 7 }).map((_, i) => {
            const isActive = weeks.includes(i);
            function toggle() {
              if (isActive) {
                setWeeks((prev) => prev.filter((w) => w !== i));
              } else {
                setWeeks((prev) => [...prev, i]);
              }
            }
            return (
              <button
                type="button"
                onClick={toggle}
                className={cn(
                  "uppercase w-full bg-neutral-200 rounded-md h-9 flex justify-center items-center text-xs",
                  isActive && "bg-orange-500 text-neutral-100",
                )}
                key={`week-names-${WEEK_NAMES[i]}`}
              >
                {WEEK_NAMES[i].slice(0, 1)}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs">Starting time</p>
          <input
            type="time"
            value={startingTime}
            onChange={(e) => setStartingTime(e.target.value)}
            className="border outline-none p-2 rounded-md text-sm"
          />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-right">Ending time</p>
          <input
            type="time"
            value={endingTime}
            onChange={(e) => setEndingTime(e.target.value)}
            className="border outline-none p-2 rounded-md text-sm"
          />
        </div>
      </div>
      <div className="mt-2">
        <Button size="lg" className="w-full" onClick={handleSubmit}>
          <TimerResetIcon className="w-5 h-5 mr-2" />
          Add Schedule
        </Button>
      </div>
    </div>
  );
}

function BlockedWebsites({
  schedules,
  removeSchedule,
}: {
  schedules: ScheduleType[];
  removeSchedule: (schedule: ScheduleType) => void;
}) {
  return (
    <div className="p-6 rounded-lg border bg-neutral-50">
      <div>
        <p className="text-neutral-900 text-lg font-medium">Blocked websites</p>
        <p className="text-sm mt-1 text-neutral-700">See and manege all the blocked websites</p>
      </div>
      <div className="mt-4">
        {schedules.length <= 0 && (
          <p className="text-sm italic text-neutral-700">No website added</p>
        )}
        <ScrollArea className="h-[380px]">
          <div className="grid gap-6 xl:grid-cols-2">
            <AnimatePresence>
              {schedules.map((schedule, i) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(15px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(15px)" }}
                    transition={{ delay: 0.05 * i }}
                    className="p-4 border rounded-lg bg-neutral-200/50"
                    key={`blocked-website-schedule-${schedule.url}-${schedule.startingTime}-${schedule.endingTime}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[15px] line-clamp-1 whitespace-break-spaces">
                        {new URL(schedule.url).hostname}
                      </p>
                      <button
                        type="button"
                        className="h-7 w-7 flex items-center justify-center rounded-md text-red-400 hover:text-white hover:bg-red-500 duration-200 transition-colors"
                        onClick={() => removeSchedule(schedule)}
                      >
                        <Trash2Icon size={14} />
                      </button>
                    </div>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-neutral-700">
                        {convertTime(schedule.startingTime).time12}
                        {convertTime(schedule.startingTime).ampm} -{" "}
                        {convertTime(schedule.endingTime).time12}
                        {convertTime(schedule.endingTime).ampm}
                      </p>
                      <p className="text-sm text-neutral-700">
                        {WEEK_NAMES.filter((_, i) => schedule.weeks.includes(i))
                          .map((n) => n.slice(0, 3))
                          .join(",")}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
