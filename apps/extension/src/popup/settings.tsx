import YoutubeSettingsCard from "./youtube-settings-card";
import FacebookSettingsCard from "./facebook-settings-card";
import InstagramSettingsCard from "./instagram-settings-card";
import TiktokSettingsCard from "./tiktok-settings-card";
import SettingsFooter from "./settings-footer";

export default function Settings() {
  return (
    <div className="w-[750px]">
      <div className="columns-2 gap-6 w-full">
        <div className="break-inside-avoid-column mt-6 first:mt-0">
          <YoutubeSettingsCard />
        </div>
        <div className="break-inside-avoid-column mt-6">
          <FacebookSettingsCard />
        </div>
        <div className="break-inside-avoid-column mt-6">
          <InstagramSettingsCard />
        </div>
        <div className="break-inside-avoid-column mt-6">
          <TiktokSettingsCard />
        </div>
      </div>
      <div className="pt-6">
        <SettingsFooter />
      </div>
    </div>
  );
}
