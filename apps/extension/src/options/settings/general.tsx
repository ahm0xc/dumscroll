import { type ReactNode, useEffect } from "react";

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
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FF3D00"
            d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
          />
          <path fill="#FFF" d="M20 31L20 17 32 24z" />
        </svg>
      }
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
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <linearGradient
            id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
            x1="9.993"
            x2="40.615"
            y1="9.993"
            y2="40.615"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#2aa4f4" />
            <stop offset="1" stop-color="#007ad9" />
          </linearGradient>
          <path
            fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
            d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
          />
          <path
            fill="#fff"
            d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
          />
        </svg>
      }
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
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <radialGradient
            id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
            cx="19.38"
            cy="42.035"
            r="44.899"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#fd5" />
            <stop offset=".328" stop-color="#ff543f" />
            <stop offset=".348" stop-color="#fc5245" />
            <stop offset=".504" stop-color="#e64771" />
            <stop offset=".643" stop-color="#d53e91" />
            <stop offset=".761" stop-color="#cc39a4" />
            <stop offset=".841" stop-color="#c837ab" />
          </radialGradient>
          <path
            fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
            d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
          />
          <radialGradient
            id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
            cx="11.786"
            cy="5.54"
            r="29.813"
            gradientTransform="matrix(1 0 0 .6663 0 1.849)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#4168c9" />
            <stop offset=".999" stop-color="#4168c9" stop-opacity="0" />
          </radialGradient>
          <path
            fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
            d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
          />
          <path
            fill="#fff"
            d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
          />
          <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
          <path
            fill="#fff"
            d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
          />
        </svg>
      }
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
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon: ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-6 rounded-2xl space-y-4">
      <div className="flex items-start gap-3">
        <div className="[&_svg]:h-8 [&_svg]:w-8 mt-1">{Icon}</div>
        <div>
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-sm text-neutral-700">{description}</p>
        </div>
      </div>
      <div>{children}</div>
    </Card>
  );
}
