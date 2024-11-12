import { Props } from "../../main.tsx";

export function Navbar({ companyName }: Omit<Props, "gb">) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <a className="flex items-center justify-center gap-1" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="-0.5 -0.5 16 16"
          id="Chart-4--Streamline-Solar"
          height={16}
          width={16}
        >
          <desc>{"Chart 4 Streamline Icon: https://streamlinehq.com"}</desc>
          <g id="Bold Duotone/Business Statistic/Chart 4">
            <path
              id="Vector"
              fill="#737373"
              d="M10.8080625 1.43305625C10.625 1.6161187499999998 10.625 1.91074375 10.625 2.5v8.125c0 0.5892499999999999 0 0.883875 0.1830625 1.0669375C10.991125 11.875 11.28575 11.875 11.875 11.875c0.5892499999999999 0 0.883875 0 1.0669375 -0.1830625C13.125 11.508875 13.125 11.21425 13.125 10.625V2.5c0 -0.58925625 0 -0.88388125 -0.1830625 -1.0669437499999999C12.758875 1.25 12.46425 1.25 11.875 1.25c-0.5892499999999999 0 -0.883875 0 -1.0669375 0.18305624999999998Z"
              strokeWidth={1}
            />
            <path
              id="Vector_2"
              fill="#737373"
              d="M6.25 4.375c0 -0.58925625 0 -0.88388125 0.1830625 -1.0669437499999999C6.616125 3.125 6.91075 3.125 7.5 3.125c0.5892499999999999 0 0.883875 0 1.0669375 0.18305624999999998C8.75 3.49111875 8.75 3.78574375 8.75 4.375v6.25c0 0.5892499999999999 0 0.883875 -0.1830625 1.0669375C8.383875 11.875 8.08925 11.875 7.5 11.875c-0.5892499999999999 0 -0.883875 0 -1.0669375 -0.1830625C6.25 11.508875 6.25 11.21425 6.25 10.625V4.375Z"
              strokeWidth={1}
            />
            <path
              id="Vector_3"
              fill="#000000"
              d="M2.05805625 5.80805625C1.875 5.99111875 1.875 6.28575 1.875 6.875v3.75c0 0.5892499999999999 0 0.883875 0.18305624999999998 1.0669375C2.24111875 11.875 2.53574375 11.875 3.125 11.875c0.58925625 0 0.88388125 0 1.0669437499999999 -0.1830625C4.375 11.508875 4.375 11.21425 4.375 10.625v-3.75c0 -0.5892499999999999 0 -0.88388125 -0.18305624999999998 -1.0669437499999999C4.00888125 5.625 3.71425625 5.625 3.125 5.625c-0.58925625 0 -0.88388125 0 -1.0669437499999999 0.18305624999999998Z"
              strokeWidth={1}
            />
            <path
              id="Vector_4"
              fill="#000000"
              d="M1.875 13.28125c-0.25888125 0 -0.46875 0.20987499999999998 -0.46875 0.46875s0.20986875 0.46875 0.46875 0.46875h11.25c0.258875 0 0.46875 -0.20987499999999998 0.46875 -0.46875s-0.20987499999999998 -0.46875 -0.46875 -0.46875H1.875Z"
              strokeWidth={1}
            />
          </g>
        </svg>
        <span className="font-semibold">{companyName}</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Features
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Pricing
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          About
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
