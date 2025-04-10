import type { LucideProps } from "lucide-react";

export type IconProps = LucideProps;

export function SearchIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M17 17L21 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CommandIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path d="M15 9V15H9V9H15Z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M15 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18V15Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 15.002H6C4.34315 15.002 3 16.3451 3 18.002C3 19.6588 4.34315 21.002 6 21.002C7.65685 21.002 9 19.6588 9 18.002V15.002Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15 9L15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9H15Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 9V6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H9Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function HelpIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M17 10.8045C17 10.4588 17 10.286 17.052 10.132C17.2032 9.68444 17.6018 9.51076 18.0011 9.32888C18.45 9.12442 18.6744 9.02219 18.8968 9.0042C19.1493 8.98378 19.4022 9.03818 19.618 9.15929C19.9041 9.31984 20.1036 9.62493 20.3079 9.87302C21.2513 11.0188 21.7229 11.5918 21.8955 12.2236C22.0348 12.7334 22.0348 13.2666 21.8955 13.7764C21.6438 14.6979 20.8485 15.4704 20.2598 16.1854C19.9587 16.5511 19.8081 16.734 19.618 16.8407C19.4022 16.9618 19.1493 17.0162 18.8968 16.9958C18.6744 16.9778 18.45 16.8756 18.0011 16.6711C17.6018 16.4892 17.2032 16.3156 17.052 15.868C17 15.714 17 15.5412 17 15.1955V10.8045Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 10.8046C7 10.3694 6.98778 9.97821 6.63591 9.6722C6.50793 9.5609 6.33825 9.48361 5.99891 9.32905C5.55001 9.12458 5.32556 9.02235 5.10316 9.00436C4.43591 8.9504 4.07692 9.40581 3.69213 9.87318C2.74875 11.019 2.27706 11.5919 2.10446 12.2237C1.96518 12.7336 1.96518 13.2668 2.10446 13.7766C2.3562 14.6981 3.15152 15.4705 3.74021 16.1856C4.11129 16.6363 4.46577 17.0475 5.10316 16.996C5.32556 16.978 5.55001 16.8757 5.99891 16.6713C6.33825 16.5167 6.50793 16.4394 6.63591 16.3281C6.98778 16.0221 7 15.631 7 15.1957V10.8046Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 9C5 5.68629 8.13401 3 12 3C15.866 3 19 5.68629 19 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M19 17V17.8C19 19.5673 17.2091 21 15 21H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserCircleSparkleIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M15 2.4578C14.053 2.16035 13.0452 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.49994 19.5001L6.06034 18.5194C6.95055 16.9616 8.60727 16.0001 10.4016 16.0001H13.5983C15.3926 16.0001 17.0493 16.9616 17.9395 18.5194L18.4999 19.5001"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.9737 2.02148C18.9795 1.99284 19.0205 1.99284 19.0263 2.02148C19.3302 3.50808 20.4919 4.66984 21.9785 4.97368C22.0072 4.97954 22.0072 5.02046 21.9785 5.02632C20.4919 5.33016 19.3302 6.49192 19.0263 7.97852C19.0205 8.00716 18.9795 8.00716 18.9737 7.97852C18.6698 6.49192 17.5081 5.33016 16.0215 5.02632C15.9928 5.02046 15.9928 4.97954 16.0215 4.97368C17.5081 4.66984 18.6698 3.50808 18.9737 2.02148Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M5 10H7.5L14 16.5V19C14 20.1046 14.8954 21 16 21H19L17 19V17H19L21 19V16C21 14.8954 20.1046 14 19 14H16.5L10 7.5V5C10 3.89543 9.10457 3 8 3H5L7 5V7H5L3 5V8C3 9.10457 3.89543 10 5 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L3.91421 17.0858C3.13317 17.8668 3.13316 19.1332 3.91421 19.9142L4.08579 20.0858C4.86683 20.8668 6.13317 20.8668 6.91421 20.0858L12 15M13.5 10.5L18.5 5.5M18.5 5.5L17.5 4.5L20 3L21 4L19.5 6.5L18.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlazaIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M2 22L22 21.9873"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 22V10.4783L13 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10.0057L9 9.99561M7 14.003L9 13.9928M7 18.0002L9 17.99"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 22V5.82898L13 2V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SecurityBlockedIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M2 2L22 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.34489 4.57302C3.58552 4.70502 3 5.34825 3 6.12325V11.0511C3 17.4795 9.53762 20.9859 11.4689 21.8815C11.8097 22.0395 12.1903 22.0395 12.5311 21.8815C13.588 21.3914 16.0246 20.1193 18.0142 18.0142M7.70258 3.70258C9.22116 3.1826 10.4387 2.59655 11.1848 2.20154C11.6923 1.93282 12.3077 1.93282 12.8152 2.20154C14.0546 2.85772 16.595 4.04108 19.6551 4.57302C20.4145 4.70502 21 5.34825 21 6.12325V11.0511C21 12.8331 20.4976 14.3906 19.7302 15.7302"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TimeQuarterIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M16 12H12L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.8475 4.17041C19.0217 4.3242 19.1911 4.48354 19.3555 4.648C19.5199 4.81246 19.6791 4.98203 19.8328 5.15629M15 2C15.4821 2.14255 15.9548 2.32634 16.4134 2.54664M21.4375 7.55457C21.6647 8.02313 21.8539 8.50663 22 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlushBrushIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M12 13L15 15M12 13C7.52052 15.7458 4.88172 14.7808 3 13.8508C3 15.9297 3.68122 17.6692 4.69609 19M12 13L15 8.41396M15 15C14.781 17.0373 13.4267 21.1851 10.1556 22C8.34064 22 6.16762 20.9296 4.69609 19M15 15L17.5978 10M17.5978 10L20.876 3.69028C21.1655 3.1134 20.9308 2.41193 20.3519 2.12349C19.7937 1.84536 19.1147 2.05196 18.8076 2.59338L15 8.41396M17.5978 10L15 8.41396M4.69609 19C5.73446 19.1667 8.28008 19.2 10.1556 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 4L6.22108 4.59745C6.51097 5.38087 6.65592 5.77259 6.94167 6.05834C7.22741 6.34408 7.61913 6.48903 8.40255 6.77892L9 7L8.40255 7.22108C7.61913 7.51097 7.22741 7.65592 6.94167 7.94167C6.65592 8.22741 6.51097 8.61913 6.22108 9.40255L6 10L5.77892 9.40255C5.48903 8.61913 5.34408 8.22741 5.05833 7.94167C4.77259 7.65592 4.38087 7.51097 3.59745 7.22108L3 7L3.59745 6.77892C4.38087 6.48903 4.77259 6.34408 5.05833 6.05833C5.34408 5.77259 5.48903 5.38087 5.77892 4.59745L6 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        opacity="0.4"
        d="M12.0572 1.75H11.9428C9.75214 1.74999 8.03143 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50271 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V11.9428C22.25 9.75214 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50271 18.6886 2.11568 17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75Z"
        fill="currentColor"
      />
      <path
        d="M17 6.75001L15.9217 6.75C15.0461 6.74993 14.2675 6.74986 13.6389 6.83438C12.9557 6.92624 12.2658 7.13806 11.7019 7.70191C11.138 8.26577 10.9262 8.95567 10.8344 9.63891C10.7499 10.2675 10.7499 11.0461 10.75 11.9217L10.75 12.75H10C9.30964 12.75 8.75 13.3097 8.75 14C8.75 14.6904 9.30964 15.25 10 15.25H10.75V22.2488C11.1312 22.25 11.5286 22.25 11.9428 22.25H12.0572C12.4714 22.25 12.8688 22.25 13.25 22.2488V15.25H15C15.6904 15.25 16.25 14.6904 16.25 14C16.25 13.3097 15.6904 12.75 15 12.75H13.25V12C13.25 11.0219 13.2527 10.414 13.3121 9.97202C13.3657 9.57311 13.4449 9.49432 13.4685 9.47088L13.4697 9.46968L13.4709 9.46847C13.4943 9.44492 13.5731 9.36572 13.972 9.31209C14.414 9.25266 15.0219 9.25001 16 9.25001H17C17.6904 9.25001 18.25 8.69036 18.25 8.00001C18.25 7.30965 17.6904 6.75001 17 6.75001Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        opacity="0.4"
        d="M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z"
        fill="currentColor"
      />
      <path
        d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5078 6.5C18.5078 7.05228 18.0621 7.5 17.5123 7.5L17.5033 7.5C16.9535 7.5 16.5078 7.05228 16.5078 6.5C16.5078 5.94771 16.9535 5.5 17.5033 5.5L17.5123 5.5C18.0621 5.5 18.5078 5.94772 18.5078 6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        opacity="0.4"
        d="M12.0573 1.75C14.248 1.74999 15.9687 1.74998 17.3121 1.93059C18.6888 2.11568 19.781 2.50271 20.6392 3.36091C21.4974 4.21911 21.8844 5.31137 22.0695 6.68802C22.2501 8.03144 22.2501 9.7521 22.2501 11.9428V11.9428V12.0572V12.0572C22.2501 14.2479 22.2501 15.9686 22.0695 17.312C21.8844 18.6886 21.4974 19.7809 20.6392 20.6391C19.781 21.4973 18.6888 21.8843 17.3121 22.0694C15.9687 22.25 14.248 22.25 12.0573 22.25H12.0573H11.943H11.9429C9.75223 22.25 8.03156 22.25 6.68815 22.0694C5.31149 21.8843 4.21923 21.4973 3.36104 20.6391C2.50284 19.7809 2.1158 18.6886 1.93072 17.312C1.7501 15.9686 1.75011 14.2479 1.75012 12.0572V11.9428C1.75011 9.75212 1.7501 8.03144 1.93072 6.68802C2.1158 5.31137 2.50284 4.21911 3.36104 3.36091C4.21923 2.50271 5.31149 2.11568 6.68815 1.93059C8.03156 1.74998 9.75224 1.74999 11.9429 1.75H12.0573Z"
        fill="currentColor"
      />
      <path
        d="M6.33235 6.65856C6.46057 6.40779 6.71848 6.25 7.00013 6.25H9.7779C10.0187 6.25 10.2449 6.36565 10.3859 6.56088L12.899 10.0405L16.4698 6.46967C16.7627 6.17678 17.2376 6.17678 17.5305 6.46967C17.8233 6.76256 17.8233 7.23744 17.5305 7.53033L13.7886 11.2722L17.6081 16.5609C17.773 16.7892 17.7961 17.0907 17.6679 17.3414C17.5397 17.5922 17.2818 17.75 17.0001 17.75H14.2223C13.9815 17.75 13.7553 17.6344 13.6143 17.4391L11.1013 13.9595L7.53046 17.5303C7.23756 17.8232 6.76269 17.8232 6.4698 17.5303C6.1769 17.2374 6.1769 16.7626 6.4698 16.4697L10.2117 12.7278L6.39212 7.43912C6.22721 7.21079 6.20413 6.90933 6.33235 6.65856Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M12 4V20M20 12H4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 16.5L9.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 16.5L14.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RedoIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3313 3 18.2398 4.80989 19.796 7.5M20.5 3L20.0645 8L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WatchStarIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M18.9737 15.0215C18.9795 14.9928 19.0205 14.9928 19.0263 15.0215C19.3302 16.5081 20.4919 17.6698 21.9785 17.9737C22.0072 17.9795 22.0072 18.0205 21.9785 18.0263C20.4919 18.3302 19.3302 19.4919 19.0263 20.9785C19.0205 21.0072 18.9795 21.0072 18.9737 20.9785C18.6698 19.4919 17.5081 18.3302 16.0215 18.0263C15.9928 18.0205 15.9928 17.9795 16.0215 17.9737C17.5081 17.6698 18.6698 16.5081 18.9737 15.0215Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14.6469 12.6727C15.3884 12.1531 15.7591 11.8934 15.9075 11.5158C16.0308 11.2021 16.0308 10.7979 15.9075 10.4842C15.7591 10.1066 15.3884 9.84685 14.6469 9.3273C14.1274 8.9633 13.5894 8.60214 13.1167 8.3165C12.7229 8.07852 12.2589 7.82314 11.7929 7.57784C11.005 7.16312 10.6111 6.95576 10.2297 7.00792C9.91348 7.05115 9.58281 7.25237 9.38829 7.5199C9.1536 7.84266 9.12432 8.30677 9.06577 9.23497C9.02725 9.84551 9 10.4661 9 11C9 11.5339 9.02725 12.1545 9.06577 12.765C9.12432 13.6932 9.1536 14.1573 9.38829 14.4801C9.58281 14.7476 9.91348 14.9489 10.2297 14.9921C10.6111 15.0442 11.005 14.8369 11.7929 14.4221C12.2589 14.1768 12.7229 13.9215 13.1167 13.6835C13.5894 13.3978 14.1274 13.0367 14.6469 12.6727Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M21.872 14.8357C22 13.9227 22 12.7279 22 11C22 8.19974 22 6.79961 21.455 5.73005C20.9757 4.78924 20.2108 4.02433 19.27 3.54497C18.2004 3 16.8003 3 14 3H10C7.19974 3 5.79961 3 4.73005 3.54497C3.78924 4.02433 3.02433 4.78924 2.54497 5.73005C2 6.79961 2 8.19974 2 11C2 13.8003 2 15.2004 2.54497 16.27C3.02433 17.2108 3.78924 17.9757 4.73005 18.455C5.79961 19 7.19974 19 10 19H13.4257"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserStoryIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M12 2C17.5237 2 22 6.47778 22 12C22 17.5222 17.5237 22 12 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21.5C7.81163 21.0953 6.69532 20.5107 5.72302 19.7462M5.72302 4.25385C6.69532 3.50059 7.81163 2.90473 9 2.5M2 10.2461C2.21607 9.08813 2.66019 7.96386 3.29638 6.94078M2 13.7539C2.21607 14.9119 2.66019 16.0361 3.29638 17.0592"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 16.5C10.0726 14.302 13.9051 14.1986 16 16.5M14.2179 9.75C14.2179 10.9926 13.2215 12 11.9925 12C10.7634 12 9.76708 10.9926 9.76708 9.75C9.76708 8.50736 10.7634 7.5 11.9925 7.5C13.2215 7.5 14.2179 8.50736 14.2179 9.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NewsIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M17.5 8V5C17.5 3.89543 16.6046 3 15.5 3H4.5C3.39543 3 2.5 3.89543 2.5 5V19C2.5 20.1046 3.39543 21 4.5 21H19.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 8H13.5M6.5 12L13.5 12M6.5 16H9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 8H19.5C20.6046 8 21.5 8.89543 21.5 10V19C21.5 20.1046 20.6046 21 19.5 21C18.3954 21 17.5 20.1046 17.5 19V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReelIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M9 21C7.89543 21 7 20.1046 7 19L7 5.00264C7 3.89704 7.89704 3.00118 9.00264 3.00264L15.0026 3.01055C16.1062 3.01201 17 3.90701 17 5.01055L17 19C17 20.1046 16.1046 21 15 21H9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 7L21.1056 7.44721C20.428 7.786 20 8.47852 20 9.23607V14.7639C20 15.5215 20.428 16.214 21.1056 16.5528L22 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 7L2.89443 7.44721C3.572 7.786 4 8.47852 4 9.23607V14.7639C4 15.5215 3.572 16.214 2.89443 16.5528L2 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ColorsIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color="currentColor" fill="none" {...props}>
      <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C12.8417 22 14 22.1163 14 21C14 20.391 13.6832 19.9212 13.3686 19.4544C12.9082 18.7715 12.4523 18.0953 13 17C13.6667 15.6667 14.7778 15.6667 16.4815 15.6667C17.3334 15.6667 18.3334 15.6667 19.5 15.5C21.601 15.1999 22 13.9084 22 12Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 15.002L7.00868 14.9996" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ExploreIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color="currentColor" fill="none" {...props}>
      <path d="M15.7078 8.33055C16.6507 9.26482 15.1422 16.8628 13.5942 16.9967C12.2957 17.109 11.891 14.5478 11.6175 13.7361C11.3476 12.9349 11.0472 12.6465 10.2527 12.3836C8.23415 11.7159 7.22489 11.382 7.02507 10.8533C6.49595 9.45337 14.5036 7.13731 15.7078 8.33055Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
