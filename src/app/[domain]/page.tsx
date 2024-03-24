import { BasicNavbar } from "./_components";

const links = [
  { name: "Contact", to: "/contact" },
  { name: "About", to: "/about" },
  { name: "Blog", to: "/blog" },
];
export default function DomainHome() {
  return (
    <>
      {/* Background */}
      <div className="bg-primary/5 absolute h-2/3 w-2/3 z-[-1]" />

      {/* Navbar */}
      <nav className="h-[4rem] flex justify-center">
        <BasicNavbar links={links}  />
      </nav>

      {/* Hero */}
      <div className="container flex items-center justify-between h-[calc(100vh-4rem)]">
        {/* Content */}
        <div className="flex-[1.5] flex flex-col gap-y-6">
          <h1 className="text-5xl font-bold">Welcome to VisaWise</h1>
          <p className="text-lg">
            Your one-stop shop for all your visa needs. We provide you with the
            tools and resources to make your visa application process as smooth
            as possible.
          </p>
        </div>

        {/* four squuares Image */}
        <div className="flex-1 flex gap-x-6 overflow-auto">
          <div className="bg-gray-400 w-[200px] h-[200px] rounded-lg"></div>
          <div className="bg-gray-400 w-[200px] h-[200px] rounded-lg"></div>
          <div className="bg-gray-400 w-[200px] h-[200px] rounded-lg"></div>
        </div>
      </div>
    </>
  );
}
