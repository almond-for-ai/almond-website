/**
 * Inline product logos used in the ConnectorDiagram solar system + Impact cards.
 * Each logo renders inside a circular disc; they accept a `size` prop and
 * normalize to a square viewBox. Colors are baked in to match brand palettes.
 *
 * Lookup pattern (consumed by value cards):
 *   import { LOGO_BY_KEY, LOGO_NAME } from "@/components/tool-logos";
 *   const Logo = LOGO_BY_KEY["claude-code"];
 *   <Logo size={24} />
 */

import type { ToolKey } from "@/lib/site-data";

type LogoProps = {
  size?: number;
  className?: string;
};

export function ClaudeCodeLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z"
        fill="#D97757"
      />
    </svg>
  );
}

export function ClaudeLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 58 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M11.2406 37.5412L22.5074 31.3129L22.6984 30.7718L22.5074 30.4706H21.9608L20.075 30.3576L13.6348 30.1859L8.05149 29.9576L2.64246 29.6706L1.27945 29.3859L0 27.7271L0.131287 26.8988L1.27707 26.1435L2.91458 26.2847L6.54288 26.5271L11.9806 26.8988L15.924 27.1271L21.7698 27.7271H22.6984L22.8297 27.3576L22.5098 27.1271L22.2639 26.8988L16.6353 23.1435L10.5436 19.1718L7.35448 16.8847L5.62626 15.7294L4.75737 14.6424L4.38022 12.2706L5.94612 10.5718L8.0491 10.7129L8.58619 10.8565L10.7178 12.4706L15.2723 15.9435L21.2184 20.2565L22.0897 20.9718L22.4358 20.7294L22.4812 20.5576L22.0897 19.9129L18.8552 14.1576L15.4036 8.29882L13.8663 5.87059L13.4605 4.41412C13.3059 3.85472 13.2225 3.27853 13.2123 2.69882L14.9978 0.315294L15.9836 0L18.3611 0.315294L19.3637 1.17176L20.8436 4.49882L23.2355 9.74353L26.9473 16.8729L28.0358 18.9859L28.6159 20.9435L28.8331 21.5435H29.2102V21.2L29.5158 17.1859L30.0815 12.2565L30.6305 5.91529L30.8215 4.12706L31.719 1.98588L33.5021 0.828235L34.8962 1.48706L36.0419 3.09882L35.882 4.14353L35.1993 8.49882L33.865 15.3294L32.9961 19.8988H33.5021L34.0822 19.3294L36.4334 16.2565L40.3768 11.4L42.1194 9.47059L44.1483 7.34353L45.454 6.32941H47.9199L49.734 8.98588L48.9224 11.7294L46.3826 14.8988L44.2796 17.5859L41.2624 21.5859L39.3766 24.7859L39.5509 25.0447L39.9997 24.9976L46.8171 23.5718L50.5003 22.9129L54.8948 22.1718L56.8832 23.0847L57.1004 24.0141L56.3175 25.9129L51.6174 27.0565L46.1057 28.1435L37.8967 30.0565L37.7964 30.1271L37.9134 30.2706L41.6109 30.6141L43.1911 30.6988H47.0629L54.2718 31.2282L56.1575 32.4565L57.289 33.9576L57.1004 35.0988L54.2002 36.5576L50.2854 35.6424L41.1454 33.5012L38.0136 32.7271H37.5792V32.9859L40.1882 35.4988L44.9766 39.7576L50.9657 45.24L51.2689 46.6L50.5003 47.6706L49.6887 47.5553L44.4252 43.6565L42.3939 41.8988L37.7964 38.0871H37.4909V38.4871L38.5507 40.0141L44.1483 48.2988L44.4396 50.84L44.0338 51.6706L42.5824 52.1718L40.9879 51.8847L37.7081 47.3553L34.3304 42.2565L31.602 37.6847L31.2679 37.8729L29.659 54.9412L28.9047 55.8118L27.1645 56.4706L25.7156 55.3859L24.947 53.6282L25.7156 50.1553L26.6442 45.6282L27.3961 42.0282L28.0788 37.5576L28.4846 36.0706L28.4559 35.9718L28.1217 36.0141L24.6987 40.6424L19.495 47.5718L15.3749 51.9129L14.3867 52.2988L12.6752 51.4282L12.8351 49.8706L13.7923 48.4847L19.4926 41.3412L22.9299 36.9129L25.1499 34.3576L25.1355 33.9859H25.0043L9.86326 43.6706L7.1659 44.0141L6.00341 42.9412L6.14902 41.1859L6.70043 40.6141L11.2549 37.5271L11.2406 37.5412Z"
        fill="#D77857"
      />
    </svg>
  );
}

export function ChatGPTLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.0035 21.1863C49.5989 19.4443 49.8053 17.5959 49.6086 15.7678C49.4118 13.9398 48.8165 12.1754 47.8636 10.5957C44.9613 5.67803 39.1307 3.14626 33.4359 4.33685C32.1746 2.95896 30.6319 1.86017 28.9093 1.11276C27.1867 0.365339 25.3232 -0.0137644 23.4415 0.0003818C17.6203 -0.0113829 12.455 3.63803 10.664 9.03097C8.82315 9.39457 7.08166 10.1402 5.55509 11.2185C4.02851 12.2967 2.75176 13.6829 1.80951 15.2851C0.385294 17.6716 -0.223391 20.4467 0.0733331 23.2007C0.370057 25.9546 1.55646 28.5415 3.45736 30.5792C2.8612 32.3213 2.65419 34.1701 2.85055 35.9986C3.0469 37.8271 3.64196 39.592 4.59488 41.1721C7.49711 46.0898 13.3278 48.6192 19.0225 47.431C20.2834 48.8086 21.8258 49.9071 23.548 50.6541C25.2703 51.4012 27.1333 51.7798 29.0146 51.7651C34.8405 51.7792 40.0082 48.1274 41.7992 42.7298C43.6413 42.3663 45.384 41.6202 46.9115 40.5411C48.4389 39.462 49.7162 38.0746 50.6585 36.471C52.08 34.0846 52.6867 31.3107 52.3892 28.5583C52.0916 25.8059 50.9055 23.2207 49.0059 21.1839L49.0035 21.1863ZM29.017 48.3816C26.6909 48.3871 24.4354 47.5934 22.6378 46.1369C22.7189 46.0945 22.8596 46.0192 22.9526 45.9627L33.5408 40.0098C33.8051 39.8643 34.025 39.6516 34.1777 39.3938C34.3303 39.136 34.4102 38.8425 34.4089 38.5439V24.0121L38.885 26.5274C38.9327 26.551 38.9637 26.5957 38.9709 26.6451V38.6804C38.9637 44.031 34.5114 48.3698 29.017 48.3816ZM7.60919 39.4827C6.44217 37.524 6.02109 35.219 6.42159 32.9816C6.4979 33.0286 6.63622 33.111 6.73399 33.1651L17.3222 39.118C17.8588 39.4239 18.5241 39.4239 19.0631 39.118L31.9884 31.8521V36.8827C31.9894 36.9086 31.9841 36.9343 31.9729 36.9576C31.9617 36.981 31.9449 37.0013 31.924 37.0169L21.2213 43.031C16.4542 45.7039 10.3659 44.1133 7.61158 39.478L7.60919 39.4827ZM4.82143 16.9792C5.99303 15.0074 7.82853 13.5037 10.0082 12.7298L10.0035 13.0851V24.991C10.002 25.2899 10.0818 25.5838 10.2344 25.842C10.3871 26.1002 10.6071 26.3133 10.8715 26.4592L23.7968 33.7227L19.323 36.2404C19.3009 36.2544 19.2756 36.2628 19.2494 36.2648C19.2232 36.2669 19.1969 36.2625 19.1728 36.2521L8.4677 30.231C3.71015 27.5486 2.07899 21.6239 4.81905 16.9839L4.82143 16.9792ZM41.5869 25.3086L28.6617 18.0427L33.1354 15.5298C33.1574 15.5154 33.1825 15.5066 33.2087 15.5041C33.235 15.5017 33.2614 15.5056 33.2857 15.5157L43.9908 21.5321C48.7555 24.2145 50.389 30.1486 47.637 34.7863C46.4644 36.7568 44.6305 38.2608 42.4526 39.038V26.7769C42.4541 26.4785 42.3746 26.1852 42.2224 25.9274C42.0702 25.6696 41.8507 25.4568 41.5869 25.311V25.3086ZM46.0392 18.7839C45.9351 18.7214 45.8302 18.6602 45.7245 18.6004L35.1362 12.6474C34.8718 12.4974 34.5721 12.4184 34.267 12.4184C33.9619 12.4184 33.6622 12.4974 33.3977 12.6474L20.4725 19.9133V14.8827C20.4714 14.8569 20.4767 14.8312 20.4879 14.8079C20.4992 14.7845 20.5159 14.7642 20.5369 14.7486L31.2372 8.73685C36.0067 6.06156 42.0997 7.6545 44.8469 12.2969C46.0082 14.2569 46.4327 16.5533 46.0392 18.7839ZM18.04 27.7486L13.5639 25.2357C13.5405 25.2244 13.5204 25.2075 13.5054 25.1865C13.4904 25.1655 13.481 25.1412 13.478 25.1157V13.0804C13.4804 7.72274 17.9446 3.38156 23.4486 3.38626C25.7761 3.38626 28.0273 4.18156 29.8183 5.63097C29.7372 5.67332 29.5989 5.74862 29.5059 5.80274L18.9176 11.7557C18.6529 11.9009 18.4325 12.1135 18.2794 12.3713C18.1263 12.6291 18.0461 12.9227 18.0472 13.2216L18.04 27.7463V27.7486ZM20.4725 22.6474L26.2292 19.4121L31.986 22.6474V29.118L26.2292 32.3533L20.4701 29.118V22.6474H20.4725Z"
        fill="#0f0f0f"
      />
    </svg>
  );
}

export function CursorLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#0f0f0f"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z" />
    </svg>
  );
}

export function WindsurfLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#0CA678"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M23.78 5.004h-.228a2.187 2.187 0 00-2.18 2.196v4.912c0 .98-.804 1.775-1.76 1.775a1.818 1.818 0 01-1.472-.773L13.168 5.95a2.197 2.197 0 00-1.81-.95c-1.134 0-2.154.972-2.154 2.173v4.94c0 .98-.797 1.775-1.76 1.775-.57 0-1.136-.289-1.472-.773L.408 5.098C.282 4.918 0 5.007 0 5.228v4.284c0 .216.066.426.188.604l5.475 7.889c.324.466.8.812 1.351.938 1.377.316 2.645-.754 2.645-2.117V11.89c0-.98.787-1.775 1.76-1.775h.002c.586 0 1.135.288 1.472.773l4.972 7.163a2.15 2.15 0 001.81.95c1.158 0 2.151-.973 2.151-2.173v-4.939c0-.98.787-1.775 1.76-1.775h.194c.122 0 .22-.1.22-.222V5.225a.221.221 0 00-.22-.222z"
      />
    </svg>
  );
}

export function V0Logo({ size = 22, className }: LogoProps) {
  // Square viewBox so the logo centers inside square containers.
  // Path is shifted down by (40 - 21) / 2 = 9.5 to vertically center.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="#0f0f0f"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g transform="translate(0 9.5)">
        <path d="M23.392 0h9.527a6.995 6.995 0 0 1 6.995 6.995v9.085H36V6.995c0-.093-.004-.186-.011-.277l-9.527 9.361.096.002h9.442v3.695H26.56c-3.864 0-7.081-3.162-7.081-7.025V3.689h3.913v9.062c0 .174.013.347.04.516L33.168 3.7a3.02 3.02 0 0 0-.25-.01h-9.526V0zM13.769 19.096L0 3.688h5.54l8.083 9.046V3.688h4.13v13.887c0 2.096-2.588 3.083-3.984 1.52z" />
      </g>
    </svg>
  );
}

export function LinearLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M3.03509 12.9431C3.24245 14.9227 4.10472 16.8468 5.62188 18.364C7.13904 19.8811 9.0631 20.7434 11.0428 20.9508L3.03509 12.9431Z" fill="#5E6AD2" />
      <path d="M3 11.4938L12.4921 20.9858C13.2976 20.9407 14.0981 20.7879 14.8704 20.5273L3.4585 9.11548C3.19793 9.88771 3.0451 10.6883 3 11.4938Z" fill="#5E6AD2" />
      <path d="M3.86722 8.10999L15.8758 20.1186C16.4988 19.8201 17.0946 19.4458 17.6493 18.9956L4.99021 6.33659C4.54006 6.89125 4.16573 7.487 3.86722 8.10999Z" fill="#5E6AD2" />
      <path d="M5.66301 5.59517C9.18091 2.12137 14.8488 2.135 18.3498 5.63604C21.8508 9.13708 21.8645 14.8049 18.3907 18.3228L5.66301 5.59517Z" fill="#5E6AD2" />
    </svg>
  );
}

export function ClineLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#7B4019"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M17.035 3.991c2.75 0 4.98 2.24 4.98 5.003v1.667l1.45 2.896a1.01 1.01 0 01-.002.909l-1.448 2.864v1.668c0 2.762-2.23 5.002-4.98 5.002H7.074c-2.751 0-4.98-2.24-4.98-5.002V17.33l-1.48-2.855a1.01 1.01 0 01-.003-.927l1.482-2.887V8.994c0-2.763 2.23-5.003 4.98-5.003h9.962zM8.265 9.6a2.274 2.274 0 00-2.274 2.274v4.042a2.274 2.274 0 004.547 0v-4.042A2.274 2.274 0 008.265 9.6zm7.326 0a2.274 2.274 0 00-2.274 2.274v4.042a2.274 2.274 0 104.548 0v-4.042A2.274 2.274 0 0015.59 9.6z" />
      <path d="M12.054 5.558a2.779 2.779 0 100-5.558 2.779 2.779 0 000 5.558z" />
    </svg>
  );
}

export function AntigravityLogo({ size = 22, className }: LogoProps) {
  // Simplified Antigravity mark (skipping the heavy blur filters at small sizes).
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="ag-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFE432" />
          <stop offset="0.4" stopColor="#FC413D" />
          <stop offset="0.75" stopColor="#3186FF" />
          <stop offset="1" stopColor="#00B95C" />
        </linearGradient>
      </defs>
      <path
        d="M21.751 22.607c1.34 1.005 3.35.335 1.508-1.508C17.73 15.74 18.904 1 12.037 1 5.17 1 6.342 15.74.815 21.1c-2.01 2.009.167 2.511 1.507 1.506 5.192-3.517 4.857-9.714 9.715-9.714 4.857 0 4.522 6.197 9.714 9.715z"
        fill="url(#ag-grad)"
      />
    </svg>
  );
}

export function LovableLogo({ size = 22, className }: LogoProps) {
  // Stylized heart wordmark stand-in (Lovable raster too heavy for inline).
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12 21s-7.5-4.45-9.5-9.05A5.45 5.45 0 0 1 12 6.5a5.45 5.45 0 0 1 9.5 5.45C19.5 16.55 12 21 12 21z"
        fill="#FF5B7D"
      />
    </svg>
  );
}

export function FigmaLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M8.5 24a3.5 3.5 0 0 0 3.5-3.5V17H8.5a3.5 3.5 0 1 0 0 7z" fill="#0ACF83" />
      <path d="M5 13.5A3.5 3.5 0 0 1 8.5 10H12v7H8.5A3.5 3.5 0 0 1 5 13.5z" fill="#A259FF" />
      <path d="M5 6.5A3.5 3.5 0 0 1 8.5 3H12v7H8.5A3.5 3.5 0 0 1 5 6.5z" fill="#F24E1E" />
      <path d="M12 3h3.5a3.5 3.5 0 1 1 0 7H12V3z" fill="#FF7262" />
      <path d="M19 13.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" fill="#1ABCFE" />
    </svg>
  );
}

export function NotionLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M4.5 3.4 14.7 2.6c1.3-.1 1.6-.0 2.4.6l3.2 2.3c.6.4.8.5.8 1v13.9c0 .9-.3 1.4-1.4 1.5l-11.9.7c-.8 0-1.2-.1-1.7-.6l-2.4-3.2c-.5-.7-.7-1.2-.7-1.8V4.9c0-.7.3-1.3 1.5-1.5z"
        fill="#fff"
        stroke="#0f0f0f"
        strokeWidth="0.9"
      />
      <path
        d="M14.7 2.6 4.5 3.4c-1.2.2-1.5.8-1.5 1.5l.1.3 11 .7c.8 0 1.2.1 1.7.6l2.4 3.1V5.5c0-.5-.2-.6-.8-1l-3.2-2.3c-.7-.5-1-.6-1.4-.6h-.1z"
        fill="#0f0f0f"
      />
      <path d="M8 8.7v9.6l1.5-.1V12l5 6.3 1.5-.1V8.4l-1.5.1v6l-4.9-6.2-1.6.4z" fill="#0f0f0f" />
    </svg>
  );
}

export function GitHubLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#0f0f0f"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.77 1.06.77 2.13v3.16c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export type LogoComponent = (props: LogoProps) => React.ReactElement;

export const LOGO_BY_KEY: Record<ToolKey, LogoComponent> = {
  "claude-code": ClaudeCodeLogo,
  cursor: CursorLogo,
  figma: FigmaLogo,
  chatgpt: ChatGPTLogo,
  claude: ClaudeLogo,
  linear: LinearLogo,
  github: GitHubLogo,
  notion: NotionLogo,
  windsurf: WindsurfLogo,
  v0: V0Logo,
  cline: ClineLogo,
  antigravity: AntigravityLogo,
  lovable: LovableLogo,
};

export const LOGO_NAME: Record<ToolKey, string> = {
  "claude-code": "Claude Code",
  cursor: "Cursor",
  figma: "Figma",
  chatgpt: "ChatGPT",
  claude: "Claude",
  linear: "Linear",
  github: "GitHub",
  notion: "Notion",
  windsurf: "Windsurf",
  v0: "v0",
  cline: "Cline",
  antigravity: "Antigravity",
  lovable: "Lovable",
};

/** Per-brand wordmark typography (sans/display mix, not mono). */
export const TOOL_WORDMARK: Record<ToolKey, string> = {
  "claude-code": "font-display text-[15px] font-normal tracking-[-0.02em]",
  cursor: "font-sans text-[14px] font-medium tracking-[-0.04em]",
  figma: "font-sans text-[15px] font-bold tracking-[-0.03em]",
  chatgpt: "font-sans text-[14px] font-semibold tracking-[-0.01em]",
  claude: "font-display text-[15px] font-normal tracking-[-0.015em]",
  linear: "font-sans text-[14px] font-medium tracking-[-0.03em]",
  github: "font-sans text-[14px] font-semibold tracking-[-0.02em]",
  notion: "font-display text-[15px] font-normal tracking-[-0.01em]",
  windsurf: "font-sans text-[14px] font-semibold tracking-[-0.025em]",
  v0: "font-sans text-[15px] font-bold tracking-[-0.06em]",
  cline: "font-sans text-[14px] font-medium tracking-[-0.02em]",
  antigravity: "font-sans text-[14px] font-medium tracking-[-0.02em]",
  lovable: "font-sans text-[14px] font-semibold tracking-[-0.01em]",
};
