import { useEffect } from "react";

import { Card } from "~/components/ui/card";
import SwitchCard from "./_components/switch-card";
import useGlobalStorage from "~/hooks/use-globalstorage";
import { settings } from "~/config";
import { GlobalStorage } from "~/helpers/globalstorage";

const GeneralSettings: React.FC = () => {
  return (
    <div>
      <div className="columns-1 lg:columns-2 [&>div]:break-inside-avoid-column [&>div]:mt-6 gap-6">
        <div className="!mt-0">
          <YoutubeSettings />
        </div>
        <div>
          <FacebookSettings />
        </div>
        <div>
          <InstagramSettings />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;

function YoutubeSettings() {
  const { value: isShortsBlocked, set: setIsShortsBlocked } =
    useGlobalStorage<boolean>(
      settings.platformDefaults.youtube.blockShorts.default,
      {
        key: settings.platformDefaults.youtube.blockShorts.key,
      },
    );
  const { value: isGrayScaleThumbnails, set: setIsGrayScaleThumbnails } =
    useGlobalStorage<boolean>(
      settings.platformDefaults.youtube.grayScaleThumbnails.default,
      {
        key: settings.platformDefaults.youtube.grayScaleThumbnails.key,
      },
    );
  const { value: isBlackThumbnails, set: setIsBlackThumbnails } =
    useGlobalStorage<boolean>(
      settings.platformDefaults.youtube.blackThumbnails.default,
      {
        key: settings.platformDefaults.youtube.blackThumbnails.key,
      },
    );

  useEffect(() => {
    GlobalStorage.get("hello").then((v) => console.log(v));
  }, []);

  return (
    <Block
      title="Youtube settings"
      description="Manage you youtube configuration"
    >
      <div className="space-y-2">
        <SwitchCard
          title="Block shorts"
          description="This convert any shorts you visit to a video"
          checked={isShortsBlocked}
          onCheckedChange={setIsShortsBlocked}
        />
        <SwitchCard
          title="Gray thumbnails"
          description="Makes the thumbnails gray to make them less distracting"
          checked={isGrayScaleThumbnails}
          onCheckedChange={setIsGrayScaleThumbnails}
        />
        <SwitchCard
          title="Black thumbnails"
          description="Makes the thumbnails totally black."
          checked={isBlackThumbnails}
          onCheckedChange={setIsBlackThumbnails}
        />
      </div>
    </Block>
  );
}

function FacebookSettings() {
  const { value: isReelsBlocked, set: setIsReelsBlocked } =
    useGlobalStorage<boolean>(
      settings.platformDefaults.facebook.blockReels.default,
      {
        key: settings.platformDefaults.facebook.blockReels.key,
      },
    );

  return (
    <Block
      title="Facebook settings"
      description="Manage you facebook configuration"
    >
      <div className="space-y-2">
        <SwitchCard
          title="Block reels"
          description="This prevents from doom scroll into reels"
          checked={isReelsBlocked}
          onCheckedChange={setIsReelsBlocked}
        />
      </div>
    </Block>
  );
}

function InstagramSettings() {
  const { value: isReelsBlocked, set: setIsReelsBlocked } =
    useGlobalStorage<boolean>(
      settings.platformDefaults.instagram.blockReels.default,
      {
        key: settings.platformDefaults.instagram.blockReels.key,
      },
    );

  return (
    <Block
      title="Instagram settings"
      description="Manage you instagram configuration"
    >
      <div className="space-y-2">
        <SwitchCard
          title="Block reels"
          description="This prevents from doom scroll into reels"
          checked={isReelsBlocked}
          onCheckedChange={setIsReelsBlocked}
        />
      </div>
    </Block>
  );
}

function Block({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-6 rounded-2xl space-y-4">
      <div className="">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-sm text-neutral-700">{description}</p>
      </div>
      <div>{children}</div>
    </Card>
  );
}
