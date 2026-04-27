import RedesignLayout from '@/components/redesign/RedesignLayout';
import './blog-redesign.css';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <RedesignLayout>
            {children}
        </RedesignLayout>
    );
}
