/**
 * Inline product logos used in the ConnectorDiagram solar system + Impact cards.
 * Each logo renders inside a circular disc; they accept a `size` prop and
 * normalize to a square viewBox. Real brand SVGs (via thesvg.org), not
 * hand-drawn approximations, so the shapes match each product's actual mark.
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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path
        fill="#D97757"
        fillRule="evenodd"
        d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0v-3.1h3V5h17.998zM6 10.949h1.488V8.102H6zm10.51 0H18V8.102h-1.49z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CursorLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}

export function FigmaLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path fill="#24CB71" d="M4 20a4 4 0 0 1 4-4h4v4a4 4 0 0 1-8 0" />
      <path fill="#FF7237" d="M12 0v8h4a4 4 0 0 0 0-8z" />
      <path fill="#00B6FF" d="M15.967 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
      <path fill="#FF3737" d="M4 4a4 4 0 0 0 4 4h4V0H8a4 4 0 0 0-4 4" />
      <path fill="#874FFF" d="M4 12a4 4 0 0 0 4 4h4V8H8a4 4 0 0 0-4 4" />
    </svg>
  );
}

export function ChatGPTLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.8.8 0 0 0-.856 0zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.43.43 0 0 1 .476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142a.45.45 0 0 1-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.48 4.48 0 0 1 4.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.43.43 0 0 1-.476 0m-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71a.79.79 0 0 0 .856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523m5.899 2.83a5.95 5.95 0 0 0 5.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947a5.7 5.7 0 0 0-1.88.31A5.96 5.96 0 0 0 10.205 0a5.95 5.95 0 0 0-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 0 0 4.162 1.713z" />
    </svg>
  );
}

export function ClaudeLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path
        fill="#D97757"
        d="m4.709 15.955 4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a3 3 0 0 1-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312z"
      />
    </svg>
  );
}

export function LinearLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
    >
      <path
        fill="#5E6AD2"
        d="M1.225 61.523c-.222-.949.908-1.546 1.597-.857l36.512 36.512c.69.69.092 1.82-.857 1.597-18.425-4.323-32.93-18.827-37.252-37.252M.002 46.889a1 1 0 0 0 .29.76L52.35 99.71c.201.2.478.307.76.29 2.37-.149 4.695-.46 6.963-.927.765-.157 1.03-1.096.478-1.648L2.576 39.448c-.552-.551-1.491-.286-1.648.479a50 50 0 0 0-.926 6.962M4.21 29.705a.99.99 0 0 0 .208 1.1l64.776 64.776a.99.99 0 0 0 1.1.208 50 50 0 0 0 5.185-2.684.98.98 0 0 0 .183-1.54L8.436 24.336a.98.98 0 0 0-1.541.183 50 50 0 0 0-2.684 5.185Zm8.448-11.631a.986.986 0 0 1-.045-1.354C21.78 6.46 35.111 0 49.952 0 77.592 0 100 22.407 100 50.048c0 14.84-6.46 28.172-16.72 37.338a.986.986 0 0 1-1.354-.045L12.659 18.074Z"
      />
    </svg>
  );
}

export function GitHubLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1024 1024"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path
        fill="#181717"
        fillRule="evenodd"
        d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 417.92 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-.64-52.48-.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-.64-33.92 40.32-.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-232.96-56.96-232.96-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28s87.04 5.76 128 17.28c97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-.64 123.52-.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 929.92 1024 737.92 1024 512 1024 229.12 794.88 0 512 0"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function NotionLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 268"
      className={className}
      aria-hidden
    >
      <path
        fill="#FFF"
        d="M16.092 11.538 164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188"
      />
      <path d="M164.09.608 16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608M69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921M212.377 89.53c1.034 4.681 0 9.362-4.681 9.897l-7.783 1.542v114.404c-6.758 3.637-12.981 5.715-18.18 5.715-8.308 0-10.386-2.604-16.609-10.396l-50.898-80.079v77.476l16.1 3.646s0 9.362-12.989 9.362l-35.814 2.077c-1.043-2.086 0-7.284 3.63-8.318l9.351-2.595V109.823l-12.98-1.052c-1.044-4.68 1.55-11.439 8.826-11.965l38.426-2.585 52.958 81.113v-71.76l-13.498-1.552c-1.043-5.733 3.111-9.896 8.3-10.404z" />
    </svg>
  );
}

export function DevinLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="m2.033 9.867 2.554 1.483a.59.59 0 0 0 .592 0l2.554-1.483.01-.008a.6.6 0 0 0 .11-.084l.013-.015a.6.6 0 0 0 .076-.1q.006-.007.01-.016a.6.6 0 0 0 .052-.125l.007-.028a.6.6 0 0 0 .019-.14V7.868c0-.572.307-1.105.8-1.392a1.6 1.6 0 0 1 1.598 0l1.277.742a.5.5 0 0 0 .129.053l.028.01q.066.015.133.016h.006l.013-.002a.6.6 0 0 0 .27-.074l.011-.004 2.554-1.483a.6.6 0 0 0 .297-.516V2.253a.6.6 0 0 0-.297-.516L12.293.257a.59.59 0 0 0-.591 0l-2.554 1.48-.01.01a.6.6 0 0 0-.109.083l-.014.015a.6.6 0 0 0-.076.1q-.006.007-.01.016a.6.6 0 0 0-.052.124l-.007.028a.6.6 0 0 0-.018.14v1.483c0 .572-.307 1.105-.8 1.393a1.6 1.6 0 0 1-1.599 0l-1.276-.742a.6.6 0 0 0-.13-.053l-.028-.008a.7.7 0 0 0-.133-.018h-.02a.6.6 0 0 0-.269.074q-.005.002-.012.005L2.033 5.872a.6.6 0 0 0-.297.515v2.966c0 .213.113.41.297.515zM15.943 10.607a1.6 1.6 0 0 1 1.599 0l1.276.74c.041.025.085.04.13.055l.028.008q.065.015.133.018h.005q.008 0 .014-.003a.5.5 0 0 0 .122-.016l.021-.005a.6.6 0 0 0 .126-.052q.007-.002.013-.005l2.554-1.482a.6.6 0 0 0 .297-.516V6.383a.6.6 0 0 0-.297-.515l-2.552-1.483a.59.59 0 0 0-.592 0l-2.553 1.482-.011.008a.6.6 0 0 0-.108.084l-.014.016a.6.6 0 0 0-.076.1q-.006.007-.01.016a.6.6 0 0 0-.052.124l-.007.029a.6.6 0 0 0-.018.14v1.482c0 .572-.307 1.105-.8 1.393a1.6 1.6 0 0 1-1.599 0l-1.276-.742a.6.6 0 0 0-.13-.053l-.028-.008a.6.6 0 0 0-.133-.018h-.02a.6.6 0 0 0-.269.074l-.012.004L9.15 10a.6.6 0 0 0-.296.516v2.966c0 .212.112.409.296.515l2.554 1.483s.008.002.012.005q.06.034.126.052l.02.004a.6.6 0 0 0 .123.017l.014.002h.006a.6.6 0 0 0 .16-.025.6.6 0 0 0 .13-.054l1.277-.741a1.597 1.597 0 0 1 2.398 1.392v1.482q0 .073.019.14l.007.028a.6.6 0 0 0 .051.125q.006.008.01.016a.6.6 0 0 0 .076.1l.014.015q.05.048.108.084.005.004.011.008l2.554 1.483a.59.59 0 0 0 .593 0l2.554-1.483a.6.6 0 0 0 .296-.516v-2.965a.6.6 0 0 0-.296-.516l-2.554-1.483s-.008-.002-.012-.005a.5.5 0 0 0-.126-.051q-.01-.003-.02-.005a.6.6 0 0 0-.125-.017h-.018a.6.6 0 0 0-.16.026.6.6 0 0 0-.13.053l-1.276.742a1.6 1.6 0 0 1-1.598 0 1.615 1.615 0 0 1 0-2.785zM14.848 18.265l-2.554-1.482-.012-.005a.5.5 0 0 0-.126-.052q-.01-.002-.02-.005a.6.6 0 0 0-.124-.017h-.02a.6.6 0 0 0-.16.026.6.6 0 0 0-.13.053l-1.276.742a1.6 1.6 0 0 1-1.598 0c-.493-.286-.8-.82-.8-1.393V14.65a.6.6 0 0 0-.018-.14l-.008-.028a.6.6 0 0 0-.051-.124l-.01-.017a.6.6 0 0 0-.076-.1l-.014-.015a.6.6 0 0 0-.109-.084q-.003-.004-.01-.008L5.178 12.65a.59.59 0 0 0-.591 0l-2.554 1.483a.6.6 0 0 0-.297.516v2.965c0 .213.113.41.297.516l2.554 1.483.012.004a.6.6 0 0 0 .267.074l.016.002h.007a.6.6 0 0 0 .16-.026.6.6 0 0 0 .129-.053l1.277-.742a1.597 1.597 0 0 1 2.398 1.393v1.482q0 .074.019.14l.007.028q.02.066.051.125l.01.016q.033.055.076.1l.014.015q.049.048.109.084l.01.008 2.554 1.483a.59.59 0 0 0 .593 0l2.554-1.483a.6.6 0 0 0 .296-.515v-2.966a.6.6 0 0 0-.296-.516z" />
    </svg>
  );
}

export function V0Logo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M14.066 6.028v2.22h5.729q.075-.001.148.005l-5.853 5.752a2 2 0 0 1-.024-.309V8.247h-2.353v5.45c0 2.322 1.935 4.222 4.258 4.222h5.675v-2.22h-5.675q-.03 0-.059-.003l5.729-5.629q.006.082.006.166v5.465H24v-5.465a4.204 4.204 0 0 0-4.205-4.205zM0 8.245l8.28 9.266c.839.94 2.396.346 2.396-.914V8.245H8.19v5.44l-4.86-5.44Z" />
    </svg>
  );
}

export function ClineLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#18181B"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path d="m23.365 13.556-1.442-2.895V8.994c0-2.764-2.218-5.002-4.954-5.002h-2.464c.178-.367.276-.779.276-1.213A2.77 2.77 0 0 0 12.018 0a2.77 2.77 0 0 0-2.763 2.779c0 .434.098.846.276 1.213H7.067c-2.736 0-4.954 2.238-4.954 5.002v1.667L.64 13.549c-.149.29-.149.636 0 .927l1.472 2.855v1.667C2.113 21.762 4.33 24 7.067 24h9.902c2.736 0 4.954-2.238 4.954-5.002V17.33l1.44-2.865c.143-.286.143-.622.002-.91m-12.854 2.36a2.27 2.27 0 0 1-2.261 2.273 2.27 2.27 0 0 1-2.261-2.273v-4.042A2.27 2.27 0 0 1 8.249 9.6a2.267 2.267 0 0 1 2.262 2.274zm7.285 0a2.27 2.27 0 0 1-2.26 2.273 2.27 2.27 0 0 1-2.262-2.273v-4.042A2.267 2.267 0 0 1 15.535 9.6a2.267 2.267 0 0 1 2.261 2.274z" />
    </svg>
  );
}

export function AntigravityLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 15"
      className={className}
      aria-hidden
    >
      <mask
        id="antigravity_svg__a"
        width={16}
        height={15}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <path
          fill="#000"
          d="M14.078 13.984c.867.65 2.168.217.975-.976C11.476 9.54 12.235 0 7.79 0 3.346 0 4.105 9.54.527 13.008c-1.3 1.301.109 1.627.976.976 3.36-2.276 3.144-6.287 6.287-6.287 3.144 0 2.927 4.01 6.288 6.287"
        />
      </mask>
      <g mask="url(#antigravity_svg__a)">
        <g filter="url(#antigravity_svg__b)">
          <path
            fill="#FFE432"
            d="M-.659-3.23C-.923-.908 1.08 1.228 3.814 1.538S8.978.217 9.242-2.107s-1.739-4.459-4.473-4.77S-.395-5.553-.659-3.23"
          />
        </g>
        <g filter="url(#antigravity_svg__c)">
          <path
            fill="#FC413D"
            d="M9.882 4.366c.685 2.95 3.684 4.773 6.698 4.073s4.902-3.658 4.217-6.608S17.114-2.94 14.1-2.24 9.197 1.417 9.882 4.366"
          />
        </g>
        <g filter="url(#antigravity_svg__d)">
          <path
            fill="#00B95C"
            d="M-8.053 6.345c.866 3.044 4.764 4.602 8.707 3.481s6.438-4.498 5.572-7.541-4.764-4.603-8.707-3.481S-8.918 3.3-8.053 6.345"
          />
        </g>
        <g filter="url(#antigravity_svg__e)">
          <path
            fill="#00B95C"
            d="M-8.053 6.345c.866 3.044 4.764 4.602 8.707 3.481s6.438-4.498 5.572-7.541-4.764-4.603-8.707-3.481S-8.918 3.3-8.053 6.345"
          />
        </g>
        <g filter="url(#antigravity_svg__f)">
          <path
            fill="#00B95C"
            d="M-4.924 8.867c2.17 2.217 5.907 2.077 8.347-.312S6.08 2.433 3.912.217s-5.907-2.076-8.347.312c-2.44 2.39-2.659 6.122-.489 8.338"
          />
        </g>
        <g filter="url(#antigravity_svg__g)">
          <path
            fill="#3186FF"
            d="M6.428 17.226c.674 2.901 3.485 4.727 6.278 4.078 2.794-.649 4.512-3.526 3.838-6.427s-3.484-4.727-6.278-4.078-4.512 3.526-3.838 6.427"
          />
        </g>
        <g filter="url(#antigravity_svg__h)">
          <path
            fill="#FBBC04"
            d="M1.665-5.945C.255-2.803 1.798.952 5.113 2.44s7.146.146 8.557-2.996c1.41-3.143-.133-6.897-3.448-8.386s-7.146-.146-8.557 2.997"
          />
        </g>
        <g filter="url(#antigravity_svg__i)">
          <path
            fill="#3186FF"
            d="M-2.114 24.39C-5.53 23.05.307 12.018 1.759 8.32 3.21 4.623 7.156 2.713 10.57 4.054c3.416 1.34 7.464 8.726 6.013 12.423S1.3 25.731-2.114 24.39"
          />
        </g>
        <g filter="url(#antigravity_svg__j)">
          <path
            fill="#749BFF"
            d="M18.581 10.66c-.914 1.067-3.3.523-5.33-1.216-2.029-1.738-2.932-4.013-2.018-5.08s3.3-.523 5.33 1.215c2.029 1.739 2.933 4.013 2.018 5.08"
          />
        </g>
        <g filter="url(#antigravity_svg__k)">
          <path
            fill="#FC413D"
            d="M11.755 5.227c3.761 2.544 8.092 2.711 9.674.373s-.186-6.295-3.947-8.84c-3.76-2.543-8.092-2.71-9.673-.373-1.582 2.338.185 6.296 3.946 8.84"
          />
        </g>
        <g filter="url(#antigravity_svg__l)">
          <path
            fill="#FFEE48"
            d="M-.592 1.089c-.932 2.248-.628 4.509.68 5.05 1.307.543 3.122-.84 4.053-3.088.932-2.247.628-4.509-.68-5.05C2.156-2.543.34-1.16-.591 1.088"
          />
        </g>
      </g>
      <defs>
        <filter
          id="antigravity_svg__b"
          width={12.839}
          height={11.383}
          x={-2.128}
          y={-8.36}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={0.723}
          />
        </filter>
        <filter
          id="antigravity_svg__c"
          width={25.176}
          height={24.96}
          x={2.752}
          y={-9.381}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={3.495}
          />
        </filter>
        <filter
          id="antigravity_svg__d"
          width={26.507}
          height={23.634}
          x={-14.167}
          y={-7.502}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={2.971}
          />
        </filter>
        <filter
          id="antigravity_svg__e"
          width={26.507}
          height={23.634}
          x={-14.167}
          y={-7.502}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={2.971}
          />
        </filter>
        <filter
          id="antigravity_svg__f"
          width={23.709}
          height={23.685}
          x={-12.361}
          y={-7.3}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={2.971}
          />
        </filter>
        <filter
          id="antigravity_svg__g"
          width={21.703}
          height={22.062}
          x={0.635}
          y={5.021}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={2.824}
          />
        </filter>
        <filter
          id="antigravity_svg__h"
          width={23.286}
          height={22.831}
          x={-3.975}
          y={-14.667}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={2.559}
          />
        </filter>
        <filter
          id="antigravity_svg__i"
          width={29.198}
          height={30.11}
          x={-7.741}
          y={-0.945}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={2.285}
          />
        </filter>
        <filter
          id="antigravity_svg__j"
          width={16.241}
          height={15.568}
          x={6.786}
          y={-0.272}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={2.045}
          />
        </filter>
        <filter
          id="antigravity_svg__k"
          width={21.687}
          height={19.421}
          x={3.775}
          y={-8.717}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={1.727}
          />
        </filter>
        <filter
          id="antigravity_svg__l"
          width={14.364}
          height={16.925}
          x={-5.407}
          y={-6.392}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_111_52"
            stdDeviation={2.138}
          />
        </filter>
      </defs>
    </svg>
  );
}

export function LovableLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 121 122"
      className={className}
      aria-hidden
    >
      <mask
        id="lovable_svg__b"
        width={121}
        height={122}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <path
          fill="url(#lovable_svg__a)"
          fillRule="evenodd"
          d="M36.069 0c19.92 0 36.068 16.155 36.068 36.084v13.713h12.004c19.92 0 36.069 16.156 36.069 36.084s-16.149 36.083-36.069 36.083H0v-85.88C0 16.155 16.148 0 36.069 0"
          clipRule="evenodd"
        />
      </mask>
      <g mask="url(#lovable_svg__b)">
        <g filter="url(#lovable_svg__c)">
          <ellipse
            cx={52.738}
            cy={65.101}
            fill="#4B73FF"
            rx={81.373}
            ry={81.192}
          />
        </g>
        <g filter="url(#lovable_svg__d)">
          <ellipse
            cx={61.673}
            cy={20.547}
            fill="#FF66F4"
            rx={104.216}
            ry={81.192}
          />
        </g>
        <g filter="url(#lovable_svg__e)">
          <ellipse
            cx={78.666}
            cy={5.268}
            fill="#FF0105"
            rx={81.373}
            ry={71.304}
          />
        </g>
        <g filter="url(#lovable_svg__f)">
          <ellipse
            cx={63.121}
            cy={20.527}
            fill="#FE7B02"
            rx={48.937}
            ry={48.829}
          />
        </g>
      </g>
      <defs>
        <filter
          id="lovable_svg__c"
          width={235.52}
          height={235.159}
          x={-65.022}
          y={-52.478}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_572_319"
            stdDeviation={18.194}
          />
        </filter>
        <filter
          id="lovable_svg__d"
          width={281.208}
          height={235.159}
          x={-78.93}
          y={-97.032}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_572_319"
            stdDeviation={18.194}
          />
        </filter>
        <filter
          id="lovable_svg__e"
          width={235.52}
          height={215.383}
          x={-39.094}
          y={-102.423}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_572_319"
            stdDeviation={18.194}
          />
        </filter>
        <filter
          id="lovable_svg__f"
          width={170.649}
          height={170.432}
          x={-22.204}
          y={-64.688}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_572_319"
            stdDeviation={18.194}
          />
        </filter>
        <linearGradient
          id="lovable_svg__a"
          x1={40.453}
          x2={76.933}
          y1={21.433}
          y2={121.971}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.025} stopColor="#FF8E63" />
          <stop offset={0.56} stopColor="#FF7EB0" />
          <stop offset={0.95} stopColor="#4B73FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GeminiLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 296 298"
      className={className}
      aria-hidden
    >
      <mask
        id="gemini_svg__a"
        width={296}
        height={298}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <path
          fill="#3186FF"
          d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184 184 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184 184 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A184 184 0 0 0 133.291 26.28z"
        />
      </mask>
      <g mask="url(#gemini_svg__a)">
        <g filter="url(#gemini_svg__b)">
          <ellipse cx={163} cy={149} fill="#3689FF" rx={196} ry={159} />
        </g>
        <g filter="url(#gemini_svg__c)">
          <ellipse cx={33.5} cy={142.5} fill="#F6C013" rx={68.5} ry={72.5} />
        </g>
        <g filter="url(#gemini_svg__d)">
          <ellipse cx={19.5} cy={148.5} fill="#F6C013" rx={68.5} ry={72.5} />
        </g>
        <g filter="url(#gemini_svg__e)">
          <path
            fill="#FA4340"
            d="M194 10.5C172 82.5 65.5 134.333 22.5 135L144-66z"
          />
        </g>
        <g filter="url(#gemini_svg__f)">
          <path
            fill="#FA4340"
            d="M190.5-12.5C168.5 59.5 62 111.333 19 112L140.5-89z"
          />
        </g>
        <g filter="url(#gemini_svg__g)">
          <path
            fill="#14BB69"
            d="M194.5 279.5C172.5 207.5 66 155.667 23 155l121.5 201z"
          />
        </g>
        <g filter="url(#gemini_svg__h)">
          <path
            fill="#14BB69"
            d="M196.5 320.5C174.5 248.5 68 196.667 25 196l121.5 201z"
          />
        </g>
      </g>
      <defs>
        <filter
          id="gemini_svg__b"
          width={464}
          height={390}
          x={-69}
          y={-46}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_69_17998"
            stdDeviation={18}
          />
        </filter>
        <filter
          id="gemini_svg__c"
          width={265}
          height={273}
          x={-99}
          y={6}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_69_17998"
            stdDeviation={32}
          />
        </filter>
        <filter
          id="gemini_svg__d"
          width={265}
          height={273}
          x={-113}
          y={12}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_69_17998"
            stdDeviation={32}
          />
        </filter>
        <filter
          id="gemini_svg__e"
          width={299.5}
          height={329}
          x={-41.5}
          y={-130}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_69_17998"
            stdDeviation={32}
          />
        </filter>
        <filter
          id="gemini_svg__f"
          width={299.5}
          height={329}
          x={-45}
          y={-153}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_69_17998"
            stdDeviation={32}
          />
        </filter>
        <filter
          id="gemini_svg__g"
          width={299.5}
          height={329}
          x={-41}
          y={91}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_69_17998"
            stdDeviation={32}
          />
        </filter>
        <filter
          id="gemini_svg__h"
          width={299.5}
          height={329}
          x={-39}
          y={132}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_69_17998"
            stdDeviation={32}
          />
        </filter>
      </defs>
    </svg>
  );
}

export function GrokLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 1024 1024"
      className={className}
      aria-hidden
    >
      <path
        fill="#0A0A0A"
        d="M395.479 633.828 735.91 381.105c16.689-12.39 40.544-7.557 48.496 11.687 41.854 101.493 23.155 223.461-60.118 307.204s-199.137 102.108-305.041 60.281l-115.691 53.866c165.934 114.059 367.431 85.852 493.345-40.861 99.875-100.439 130.807-237.345 101.884-360.806l.262.263C857.105 231.37 909.358 158.874 1016.4 10.633c2.53-3.515 5.07-7.03 7.6-10.633L883.144 141.651v-.439L395.392 633.916M325.226 695.251c-119.098-114.411-98.564-291.475 3.059-393.583 75.146-75.571 198.264-106.414 305.741-61.072l115.428-53.602c-20.797-15.114-47.447-31.371-78.03-42.794-138.234-57.206-303.731-28.735-416.101 84.182-108.089 108.699-142.079 275.833-83.71 418.451 43.603 106.59-27.874 181.985-99.874 258.083C46.224 931.893 20.622 958.87 0 987.429l325.139-292.09"
      />
    </svg>
  );
}

export function CodexLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#111"
      fillRule="evenodd"
      style={{
        flex: "none",
        lineHeight: 1,
      }}
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path
        d="M8.086.457a6.1 6.1 0 0 1 3.046-.415q2 .23 3.564 1.7a.12.12 0 0 0 .107.029q2.112-.519 4.061.366l.063.03.154.076q2.036 1.055 2.918 3.198a5.6 5.6 0 0 1 .421 2.126 5.7 5.7 0 0 1-.18 1.631.17.17 0 0 0 .04.155 6 6 0 0 1 1.578 2.891q.577 2.852-1.183 5.14l-.182.22a6.06 6.06 0 0 1-2.934 1.851.16.16 0 0 0-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451q-2.374-.012-4.21-1.736a.14.14 0 0 0-.14-.032c-.518.167-1.04.191-1.604.185a5.9 5.9 0 0 1-2.595-.622 6.06 6.06 0 0 1-2.146-1.781c-.203-.269-.404-.522-.551-.821a8 8 0 0 1-.495-1.283 6.1 6.1 0 0 1-.017-3.064.2.2 0 0 0 .008-.074.1.1 0 0 0-.037-.064 5.96 5.96 0 0 1-1.38-2.202 5.2 5.2 0 0 1-.333-1.589 6.9 6.9 0 0 1 .188-2.132q.675-2.226 2.577-3.493.424-.282.802-.438.429-.179.861-.304a.13.13 0 0 0 .087-.087A6 6 0 0 1 5.635 2.31Q6.655 1.04 8.086.457m-.804 7.85a.848.848 0 0 0-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 0 0 1.46.864l1.94-3.272a.85.85 0 0 0 .007-.854zm5.446 6.24a.849.849 0 0 0 0 1.695h4.848a.849.849 0 0 0 0-1.696z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ConfluenceLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#172B4D"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M.87 18.257c-.248.382-.53.875-.763 1.245a.764.764 0 0 0 .255 1.04l4.965 3.054a.764.764 0 0 0 1.058-.26c.199-.332.454-.763.733-1.221 1.967-3.247 3.945-2.853 7.508-1.146l4.957 2.337a.764.764 0 0 0 1.028-.382l2.364-5.346a.764.764 0 0 0-.382-1 600 600 0 0 1-4.965-2.361C10.911 10.97 5.224 11.185.87 18.257M23.131 5.743c.249-.405.531-.875.764-1.25a.764.764 0 0 0-.256-1.034L18.675.404a.764.764 0 0 0-1.058.26 66 66 0 0 1-.734 1.225c-1.966 3.246-3.945 2.85-7.508 1.146L4.437.694a.764.764 0 0 0-1.027.382L1.046 6.422a.764.764 0 0 0 .382 1c1.039.49 3.105 1.467 4.965 2.361 6.698 3.246 12.392 3.029 16.738-4.04" />
    </svg>
  );
}

export function GoogleDriveLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 87.3 78"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path
        fill="#0066da"
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z"
      />
      <path
        fill="#00ac47"
        d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44A9.06 9.06 0 0 0 0 53h27.5z"
      />
      <path
        fill="#ea4335"
        d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 57.5c.8-1.4 1.2-2.95 1.2-4.5H59.798l5.852 11.5z"
      />
      <path
        fill="#00832d"
        d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z"
      />
      <path
        fill="#2684fc"
        d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
      />
      <path
        fill="#ffba00"
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25 59.8 53h27.45c0-1.55-.4-3.1-1.2-4.5z"
      />
    </svg>
  );
}

export function GranolaLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <g clipPath="url(#granola_svg__a)">
        <path
          fill="#1E1E1E"
          d="M15.826 31.914c3.3 0 6.76-.732 8.153-1.746.89-.634 1.332-.572 2.125-1.33.22-.222.317-.287.38-.35 3.013-2.476 4.759-5.68 4.759-9.836 0-6.76-4.79-11.36-11.644-11.36-6.029 0-10.63 3.838-10.63 8.756 0 4.474 3.49 7.678 8.47 7.678.287 0 .415-.159.732-.159 1.207 0 2.19-.348 2.825-1.014.317-.348.92-1.048.983-1.08.286-.255.348-.634.414-.793.062-.158.19-.255.255-.476.062-.255-.031-.572-.031-.855 0-.507.22-1.014.22-1.49 0-1.331-1.586-2.666-3.014-2.666-.159 0-.159-.128-.255-.128-.097 0-.19.097-.286.097-.097 0-.221-.159-.349-.159s-.19.128-.38.128c-.413 0-.444.062-.761.062a1 1 0 0 0-.318.062c-.127.062-.127.159-.255.159q-.255 0-.255.096c0 .349.031.287-.128.287q-.255 0-.317.03c-.128.063-.031.221-.159.318-.127.062-.158.159-.19.348-.03.19-.22.255-.22.445 0 .097.031.159.031.22 0 .19-.38.128-.38.318 0 .128.097.22.097.349 0 .096-.062.158-.062.255 0 .096.062.158.062.22 0 .16-.22.19-.22.318 0 .127.127.22.127.317 0 .062-.097.097-.097.19s-.03-.062.16.22c.127.19.127.287 0 .445-.128.16-.38.256-.697.256-1.332 0-1.49-1.366-2.222-1.587-.22-.062-.255-.096-.255-.19 0-.093 0-.062.128-.19.127-.127.158-.22.158-.317 0-.096 0-.127-.062-.19-.255-.413-.38-.92-.38-1.49 0-2.917 3.553-5.362 6.92-5.362 1.014 0 .855.255 1.459.255.158 0 .096 0 .317-.031.572-.097 1.617.127 2.442.538 2.283 1.142 3.776 3.839 3.776 6.98 0 5.364-4.76 9.265-11.105 9.265-3.46 0-5.84-1.08-8.188-3.712-.255-.286.127.063-.287-.665-.507-.89-.444-.318-.444-.318-.16-.19-.445-.73-.604-.92-.19-.221-.445-.19-.538-.318-.128-.158.062-.445 0-.603-.062-.255-.604-.635-.666-.825s-.286-1.396-.286-1.617c0-.255.19-.286.19-.445 0-.22-.287-.286-.445-.604-.159-.317-.255-1.048-.255-1.841 0-.414 0-.573.127-1.525.031-.317.507-.317.507-.665 0-.128-.062-.287-.062-.38 0-.127 0-.159.031-.255 1.331-5.584 7.298-9.74 13.93-9.74 2.284 0 4.029.414 6.726 1.556.89.379 2.19-.287 2.19-.983.062-.221-.062-.287-.096-.414-.032-.128-.16-.287-.287-.318-.062-.03-.096-.127-.158-.22-.097-.159-.19-.221-.445-.287a.47.47 0 0 1-.256-.127.74.74 0 0 0-.286-.255c-.127-.063-.22 0-.286-.031-.062-.032-.097-.097-.159-.128-.03-.031-.096-.031-.19-.031-3.2-1.714-5.294-1.97-8.084-1.97-6.029 0-11.423 2.604-14.754 7.14-.287.38-.128 1.014-.538 1.397C1.74 9.353.757 13.35.757 15.89c0 2.124.507 4.949 1.173 6.504 1.3 3.046.731 1.777.92 2.063.38.603.698.665.856.855 0 0 .097.19.097.38 0 .127 0 .158.03.22.097.19.539.507.666.635.287.286.507.89.983 1.366.732.73 1.777 1.3 5.108 2.855 1.173.538.507.256.635.287.286.096.666.096.89.255.127.097-.031.062.317.062.062 0 .062.031.128.062.062.031.127.128.22.128.063 0 .097-.062.19-.031.093.03.317.19.507.286.159.096.19.096.255.031.19-.128.318.031.507.031.062 0 .159-.031.349-.031.255 0 .255.062 1.238.062"
        />
      </g>
      <defs>
        <clipPath id="granola_svg__a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function SlackLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2447.6 2452.5"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <g fillRule="evenodd" clipRule="evenodd">
        <path
          fill="#36c5f0"
          d="M897.4 0C762.1.1 652.6 109.9 652.7 245.2c-.1 135.3 109.5 245.1 244.8 245.2h244.8V245.3C1142.4 110 1032.8.2 897.4 0q.15 0 0 0m0 654H244.8C109.5 654.1-.1 763.9 0 899.2c-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3"
        />
        <path
          fill="#2eb67d"
          d="M2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3m-652.7 0v-654C1795 110 1685.5.2 1550.2 0c-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3"
        />
        <path
          fill="#ecb22e"
          d="M1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2m0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3"
        />
        <path
          fill="#e01e5a"
          d="M0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2V1308H244.8C109.5 1308.1-.1 1417.9 0 1553.2m652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
        />
      </g>
    </svg>
  );
}

export function DiscordLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 199"
      className={className}
      aria-hidden
    >
      <path
        fill="#5865F2"
        d="M216.856 16.597A208.5 208.5 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046q-29.538-4.442-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.8 207.8 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161 161 0 0 0 79.735 175.3a136.4 136.4 0 0 1-21.846-10.632 109 109 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a132 132 0 0 0 5.355 4.237 136 136 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2 23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18m85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18"
      />
    </svg>
  );
}

export function GmailLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 49.4 512 399.42"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <path
            fill="#4285f4"
            d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
          />
          <path
            fill="#34a853"
            d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
          />
          <path
            fill="#fbbc04"
            d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
          />
        </g>
        <path
          fill="#ea4335"
          d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
        />
        <path
          fill="#c5221f"
          fillRule="nonzero"
          d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
        />
      </g>
    </svg>
  );
}

export function CalendarLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 512 512"
      className={className}
      aria-hidden
    >
      <g clipPath="url(#calendar_svg__a)">
        <path fill="#fff" d="M390.736 121.264H121.264v269.472h269.472z" />
        <path
          fill="#EA4335"
          d="M390.736 512 512 390.736l-60.632-10.344-60.632 10.344-11.066 55.46z"
        />
        <path
          fill="#188038"
          d="M0 390.736v80.842C0 493.912 18.088 512 40.42 512h80.844l12.45-60.632-12.45-60.632-66.066-10.344z"
        />
        <path
          fill="#1967D2"
          d="M512 121.264V40.42C512 18.088 493.912 0 471.58 0h-80.844q-11.064 45.108-11.066 66.392 0 21.282 11.066 54.872 40.23 11.52 60.632 11.52T512 121.264"
        />
        <path fill="#FBBC04" d="M512 121.264H390.736v269.472H512z" />
        <path fill="#34A853" d="M390.736 390.736H121.264V512h269.472z" />
        <path
          fill="#4285F4"
          d="M390.736 0H40.422C18.088 0 0 18.088 0 40.42v350.316h121.264V121.264h269.472z"
        />
        <path
          fill="#4285F4"
          d="M176.54 330.308c-10.072-6.804-17.046-16.74-20.852-29.88l23.378-9.632q3.18 12.126 11.116 18.796c5.254 4.446 11.654 6.636 19.132 6.636q11.467 0 19.704-6.974c5.492-4.648 8.254-10.576 8.254-17.75q0-11.016-8.69-17.988c-5.794-4.648-13.07-6.972-21.76-6.972h-13.508v-23.14h12.126q11.216 0 18.896-6.066c5.12-4.04 7.68-9.566 7.68-16.606 0-6.264-2.29-11.25-6.87-14.988-4.58-3.74-10.376-5.626-17.416-5.626-6.872 0-12.328 1.82-16.37 5.49a32.2 32.2 0 0 0-8.826 13.508l-23.14-9.634c3.064-8.69 8.69-16.37 16.942-23.006s18.796-9.97 31.596-9.97c9.466 0 17.988 1.82 25.534 5.49 7.544 3.672 13.472 8.758 17.75 15.226 4.28 6.5 6.4 13.776 6.4 21.86 0 8.252-1.986 15.226-5.96 20.952s-8.86 10.104-14.654 13.17v1.38a44.5 44.5 0 0 1 18.796 14.654c4.884 6.568 7.344 14.416 7.344 23.58 0 9.16-2.326 17.346-6.974 24.52-4.648 7.176-11.08 12.834-19.234 16.944-8.184 4.11-17.38 6.2-27.586 6.2-11.824.032-22.736-3.37-32.808-10.174m143.592-116.01-25.666 18.56-12.834-19.468 46.046-33.214h17.65v156.666h-25.196z"
        />
      </g>
      <defs>
        <clipPath id="calendar_svg__a">
          <path fill="#fff" d="M0 0h512v512H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function JiraLogo({ size = 22, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#0052CC"
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M11.571 11.513H0a5.22 5.22 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.22 5.22 0 0 0 5.215 5.214V6.758a1 1 0 0 0-1.001-1.001M23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1 1 0 0 0 23.013 0" />
    </svg>
  );
}

export type LogoComponent = (props: LogoProps) => React.ReactElement;

export const LOGO_BY_KEY: Record<ToolKey, LogoComponent> = {
  "claude-code": ClaudeCodeLogo,
  cursor: CursorLogo,
  figma: FigmaLogo,
  "figma-make": FigmaLogo,
  chatgpt: ChatGPTLogo,
  claude: ClaudeLogo,
  linear: LinearLogo,
  github: GitHubLogo,
  notion: NotionLogo,
  devin: DevinLogo,
  v0: V0Logo,
  cline: ClineLogo,
  antigravity: AntigravityLogo,
  lovable: LovableLogo,
  gemini: GeminiLogo,
  grok: GrokLogo,
  codex: CodexLogo,
  confluence: ConfluenceLogo,
  "google-drive": GoogleDriveLogo,
  granola: GranolaLogo,
  slack: SlackLogo,
  discord: DiscordLogo,
  gmail: GmailLogo,
  calendar: CalendarLogo,
  jira: JiraLogo,
};

export const LOGO_NAME: Record<ToolKey, string> = {
  "claude-code": "Claude Code",
  cursor: "Cursor",
  figma: "Figma",
  "figma-make": "Figma Make",
  chatgpt: "ChatGPT",
  claude: "Claude",
  linear: "Linear",
  github: "GitHub",
  notion: "Notion",
  devin: "Devin Desktop",
  v0: "v0",
  cline: "Cline",
  antigravity: "Antigravity",
  lovable: "Lovable",
  gemini: "Gemini",
  grok: "Grok",
  codex: "Codex",
  confluence: "Confluence",
  "google-drive": "Google Drive",
  granola: "Granola",
  slack: "Slack",
  discord: "Discord",
  gmail: "Gmail",
  calendar: "Calendar",
  jira: "Jira",
};

/** Per-brand wordmark typography (sans/display mix, not mono). */
export const TOOL_WORDMARK: Record<ToolKey, string> = {
  "claude-code": "font-display text-[15px] font-normal tracking-[-0.02em]",
  cursor: "font-sans text-[14px] font-medium tracking-[-0.04em]",
  figma: "font-sans text-[15px] font-bold tracking-[-0.03em]",
  "figma-make": "font-sans text-[15px] font-bold tracking-[-0.03em]",
  chatgpt: "font-sans text-[14px] font-semibold tracking-[-0.01em]",
  claude: "font-display text-[15px] font-normal tracking-[-0.015em]",
  linear: "font-sans text-[14px] font-medium tracking-[-0.03em]",
  github: "font-sans text-[14px] font-semibold tracking-[-0.02em]",
  notion: "font-display text-[15px] font-normal tracking-[-0.01em]",
  devin: "font-sans text-[14px] font-semibold tracking-[-0.025em]",
  v0: "font-sans text-[15px] font-bold tracking-[-0.06em]",
  cline: "font-sans text-[14px] font-medium tracking-[-0.02em]",
  antigravity: "font-sans text-[14px] font-medium tracking-[-0.02em]",
  lovable: "font-sans text-[14px] font-semibold tracking-[-0.01em]",
  gemini: "font-sans text-[14px] font-medium tracking-[-0.01em]",
  grok: "font-sans text-[14px] font-semibold tracking-[-0.02em]",
  codex: "font-sans text-[14px] font-medium tracking-[-0.01em]",
  confluence: "font-sans text-[14px] font-semibold tracking-[-0.02em]",
  "google-drive": "font-sans text-[14px] font-medium tracking-[-0.01em]",
  granola: "font-sans text-[14px] font-medium tracking-[-0.02em]",
  slack: "font-sans text-[14px] font-semibold tracking-[-0.01em]",
  discord: "font-sans text-[14px] font-medium tracking-[-0.01em]",
  gmail: "font-sans text-[14px] font-medium tracking-[-0.01em]",
  calendar: "font-sans text-[14px] font-medium tracking-[-0.01em]",
  jira: "font-sans text-[14px] font-semibold tracking-[-0.02em]",
};
