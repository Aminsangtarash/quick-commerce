'use client';
import Loading from "@/components/loading";
import VendorsTable from "@/components/vendors-table";
import { Suspense } from "react";

function Vendors() {
    return (
        <div className="mt-7">
            <Suspense fallback={<Loading />}>
                <VendorsTable />
            </Suspense>
        </div>
    );
}

export default Vendors;