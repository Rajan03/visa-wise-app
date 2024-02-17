import { Navbar } from "./_components";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="relative top-20 min-h-[calc(100vh-5rem)] flex flex-col px-2">
        {children}
      </main>
    </>
  );
};

export default SiteLayout;
