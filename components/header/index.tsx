import Link from "next/link";


function Header() {
    return (
        <div className="flex items-center">
            <Link href="/" >خانه</Link>
            <Link href="/products" >محصولات</Link>
            <Link href="/vendors" >غرفه ها</Link>
            <Link href="/tags" >تگ ها</Link>
            <Link href="/logistic" >لجستیک</Link>
        </div>
    );
}

export default Header;