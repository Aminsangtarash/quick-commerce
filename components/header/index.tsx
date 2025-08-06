'use client'
import MenuIcon from "@/icons/menu";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";


function Header() {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(prev => !prev)
    }

    return (
        <>
            <div className="hidden md:flex items-center h-14 bg-linear-to-bl from-[var(--secondary)] to-[var(--primary)] text-white p-2 rounded-lg mb-4">
                <Link className="mx-3 p-3" href="/">خانه</Link>
                <Link className="mx-3 p-3" href="/products">محصولات</Link>
                <Link className="mx-3 p-3" href="/vendors">غرفه ها</Link>
                <Link className="mx-3 p-3" href="/tags">تگ ها</Link>
                <Link className="mx-3 p-3" href="/logistic">لجستیک</Link>
            </div>
            <div className={twMerge((open ? "right-0" : "right-[-100vw]"), "w-[100vw] h-[100vh] fixed top-0 bg-linear-to-bl from-[var(--secondary)] to-[var(--primary)] flex md:hidden flex-col items-center z-1020 text-white")}>
                <div className="w-100 flex justify-end px-13 py-3 relative mb-10">
                    <div className={twMerge((open ? "left-0" : "left-[-60px]"), "absolute rounded-sm bg-linear-to-bl from-[var(--secondary)] to-[var(--primary)]")} onClick={handleToggle}>
                        <MenuIcon className="w-10" />
                    </div>
                </div>
                <div onClick={handleToggle} className="flex flex-col items-center">
                    <Link className="mx-3 p-3" href="/">خانه</Link>
                    <Link className="mx-3 p-3" href="/products">محصولات</Link>
                    <Link className="mx-3 p-3" href="/vendors">غرفه ها</Link>
                    <Link className="mx-3 p-3" href="/tags">تگ ها</Link>
                    <Link className="mx-3 p-3" href="/logistic" >لجستیک</Link>
                </div>
            </div>
        </>
    );
}

export default Header;