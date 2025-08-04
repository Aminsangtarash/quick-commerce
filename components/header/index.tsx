import Link from "next/link";


function Header() {
    return (
        <div className="flex items-center h-14 bg-linear-to-bl from-[var(--secondary)] to-[var(--primary)] text-white p-2 rounded-lg mb-4">
            <Link className="mx-3 p-3" href="/" >خانه</Link>
            <Link className="mx-3 p-3" href="/products" >محصولات</Link>
            <Link className="mx-3 p-3" href="/vendors" >غرفه ها</Link>
            <Link className="mx-3 p-3" href="/tags" >تگ ها</Link>
            <Link className="mx-3 p-3" href="/logistic" >لجستیک</Link>
        </div>
    );
}

export default Header;