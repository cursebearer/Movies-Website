import Link from 'next/link';
import './index.scss';

export default function Navbar() {
    return (
        <div className="navbar">
            <Link href="/movies" className="page-title">
                <h1>Filmes</h1>
            </Link>
            <Link href="/series" className="page-title">
                <h1>Series</h1>
            </Link>
        </div>
    );
}
