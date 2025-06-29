import VendorsTable from "./components/vendors-table";

export default function Home() {
  return (
    <div className="flex justify-items-center py-10 sm:py-20 sm:px-20">
      <main className="flex flex-col max-w-full items-center sm:items-start">
        <h1
          className="text-[70px] font-black text-center w-full mb-10"
        >
          Quick Commerce
        </h1>
        <div className="flex gap-4 items-center max-w-full flex-col sm:flex-row">
          <VendorsTable/>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
