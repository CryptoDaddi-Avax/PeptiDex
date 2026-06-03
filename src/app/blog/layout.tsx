import '@/components/redesign/redesign.css';
import './blog-redesign.css';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="redesign-content">
            {children}
        </div>
    );
}
