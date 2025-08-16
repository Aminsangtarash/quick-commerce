'use client'
import { Suspense } from "react";
import VendorsTable from "../components/vendors-table";
import Loading from "@/components/loading";
import logo from "/public/logo.svg"
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center py-10 sm:py-20 sm:px-20">
      <main className="flex flex-col max-w-full items-center sm:items-start">
        <div className="flex items-center justify-center mb-10 w-full">
          <h1
            className="text-[70px] font-black"
          >
            Quick Commerce
          </h1>
          <Image height={80} width={80} src={logo} alt="لوگو" className="mr-3"/>
        </div>
        <div className="flex gap-4 items-center max-w-full flex-col sm:flex-row">
          <Suspense fallback={<Loading />}>
            <VendorsTable />
          </Suspense>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
