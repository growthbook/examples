import { Props } from "../../main.tsx";

export const Footer = ({ companyName }: Props) => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500">
        © 2024 {companyName}. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <a className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </a>
        <a className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </a>
      </nav>
    </footer>
  );
};
