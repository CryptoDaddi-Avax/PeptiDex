import type { Metadata } from 'next';
import { buildHowToSchema, buildBreadcrumbSchema } from '@/lib/seo/schema';
import { SchemaInjector } from '@/components/schema-injector';

const CANONICAL = 'https://peptidex.app/guides/reconstitution';

export const metadata: Metadata = {
    title: 'How to Reconstitute Peptides — Step-by-Step Guide | PeptiDex',
    description: 'Learn how to properly reconstitute peptides with bacteriostatic water. Step-by-step instructions for safe preparation and mixing.',
    alternates: { canonical: CANONICAL },
    openGraph: {
        title: 'How to Reconstitute Peptides — Step-by-Step Guide',
        description: 'Learn how to properly reconstitute peptides with bacteriostatic water. Step-by-step instructions for safe preparation and mixing.',
        url: CANONICAL,
        type: 'article',
    }
};

export default function ReconstitutionLayout({ children }: { children: React.ReactNode }) {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: 'https://peptidex.app' },
        { name: 'Guides', url: 'https://peptidex.app/guides' },
        { name: 'How to Reconstitute Peptides', url: CANONICAL }
    ]);

    const howToSchema = buildHowToSchema({
        name: "How to Reconstitute Peptides",
        description: "Step-by-step guide to calculating and measuring peptide reconstitution.",
        totalTime: "PT5M",
        supply: ["Lyophilized Peptide", "Bacteriostatic Water", "Alcohol Swabs"],
        tool: ["Insulin Syringes", "Mixing Syringe"],
        steps: [
            { name: "Step 1: Gather Supplies", text: "Gather lyophilized peptide, BAC water, alcohol swabs, and syringes." },
            { name: "Step 2: Clean Everything", text: "Wash hands, wipe vials with alcohol swabs, and let dry." },
            { name: "Step 3: Draw Water", text: "Draw BAC water into the mixing syringe equal to desired volume." },
            { name: "Step 4: Add Water to Vial", text: "Inject BAC water slowly against the glass wall of the peptide vial." },
            { name: "Step 5: Wait for Dissolution", text: "Wait 5-10 minutes for powder to dissolve completely." },
            { name: "Step 6: Store Properly", text: "Store reconstituted peptide in refrigerator." }
        ]
    });

    return (
        <>
            <SchemaInjector schema={[breadcrumbSchema, howToSchema]} />
            {children}
        </>
    );
}
