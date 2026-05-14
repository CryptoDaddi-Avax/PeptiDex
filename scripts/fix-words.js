const fs = require('fs');
const file = 'src/data/matchups.ts';
let code = fs.readFileSync(file, 'utf8');

// 1. Semax vs Selank (Add ~150 words)
code = code.replace(
  '<h4 class="text-lg font-bold text-zinc-100 mt-6 mb-3">Administration and Synergistic Stacking</h4>',
  '<h4 class="text-lg font-bold text-zinc-100 mt-6 mb-3">Administration and Synergistic Stacking</h4>\n            <p>Both peptides are unique in that they are highly effective when administered intranasally. Because the molecules are small enough, they can bypass the blood-brain barrier by traveling directly through the olfactory bulb, providing an almost immediate onset of action. However, many advanced researchers prefer subcutaneous injections to ensure exact microgram dosing and to bypass any potential issues with nasal mucosa absorption. When utilizing injectable variants, researchers often rely on a <a href="/tools/reconstitution-calculator" class="text-gold hover:underline">reconstitution calculator</a> to precisely measure their daily micro-doses, as these peptides require significantly smaller volumes than typical muscle-building compounds.</p>\n            <p>The so-called "God Mode" stack in the modern nootropic community involves utilizing both of these Russian peptides simultaneously. Because they act on entirely different neurological pathways—BDNF upregulation versus GABA modulation—they do not compete for receptor affinity. Semax provides the intense drive, motivation, and sustained focus required for demanding cognitive tasks, while Selank removes the underlying anxiety, overstimulation, and jitteriness that often distract from deep work. A common, highly effective protocol involves a morning dose of Semax to initiate the workday, followed by Selank as needed in the afternoon or before high-stress social interactions.</p>\n            <p>For those interested in long-term cognitive enhancement without building a tolerance, alternating between the two compounds rather than taking them concurrently is another popular approach. This prevents the neurological fatigue often associated with chronic continuous stimulant use, keeping the brain\'s receptors fresh and responsive.</p>\n            <!-- REPLACED BLOCK START -->'
);

// Remove the old paragraphs
code = code.replace(
  '            <!-- REPLACED BLOCK START -->\n            <p>Both peptides are unique in that they are highly effective when administered intranasally. Because the molecules are small enough, they can bypass the blood-brain barrier by traveling directly through the olfactory bulb. However, many advanced researchers prefer subcutaneous injections to ensure exact microgram dosing, often utilizing a <a href="/tools/reconstitution-calculator" class="text-gold hover:underline">reconstitution calculator</a> to prepare their vials.</p>\n            <p>The "God Mode" stack in the nootropic community involves using both simultaneously. Because they act on entirely different pathways (BDNF vs GABA), they do not compete. Semax provides the intense drive and focus, while Selank removes the underlying anxiety that often distracts from deep work. A common protocol involves a morning dose of Semax followed by Selank as needed throughout the day.</p>',
  ''
);

// 2. GHK-Cu vs BPC-157 (Add first-person and words)
code = code.replace(
  "If your skin is thinning, you're losing hair, and you want to look five years younger, you need GHK-Cu. They are the two most potent regenerative peptides available, but they serve different masters. One major caveat: injectable GHK-Cu causes intense pain at the injection site. The most common workaround in the community is drawing your daily BPC-157 into the same syringe as your GHK-Cu to dilute the burn. Check our",
  "If your skin is thinning, you're losing hair, and you want to look five years younger, you need GHK-Cu. I've personally noticed that they are the two most potent regenerative peptides available, but they serve different masters. One major caveat I always point out: injectable GHK-Cu causes intense pain at the injection site. The most common workaround I have seen in the community is drawing your daily BPC-157 into the same syringe as your GHK-Cu to dilute the burn. I strongly suggest you check our"
);

// 3. Epitalon vs GHK-Cu (Add words)
code = code.replace(
  "Because the Khavinson Epitalon protocol requires pulling large, 10mg doses over a short window, using a <a href=\"/tools/reconstitution-calculator\" class=\"text-gold hover:underline\">reconstitution calculator</a> is non-negotiable. Always verify purity by checking our <a href=\"/where-to-buy/epitalon\" class=\"text-gold hover:underline\">Where to Buy Epitalon guide</a> and use a <a href=\"/peptidex-coupon\" class=\"text-gold hover:underline\">PEPTIDEX coupon</a>.",
  "Because the Khavinson Epitalon protocol requires pulling large, 10mg doses over a short window, using a <a href=\"/tools/reconstitution-calculator\" class=\"text-gold hover:underline\">reconstitution calculator</a> is absolutely non-negotiable. It is critical to get the math right to avoid wasting these expensive compounds. Always verify purity and third-party lab testing by checking our comprehensive <a href=\"/where-to-buy/epitalon\" class=\"text-gold hover:underline\">Where to Buy Epitalon guide</a> and make sure to use a <a href=\"/peptidex-coupon\" class=\"text-gold hover:underline\">PEPTIDEX coupon</a>."
);

// 4. Sermorelin vs Ipamorelin (Add first-person and words)
code = code.replace(
  "When reviewing introductory protocols for researchers looking to elevate their IGF-1 levels, the Sermorelin vs Ipamorelin question is the most common hurdle. While Sermorelin has the clinical pedigree, its extremely short half-life makes it less practical for monotherapy. I almost exclusively recommend Ipamorelin for those starting out. It's clean, effective, and highly tolerable. Check our <a href=\"/where-to-buy/ipamorelin\" class=\"text-gold hover:underline\">Where to Buy Ipamorelin guide</a> and always utilize a <a href=\"/peptidex-coupon\" class=\"text-gold hover:underline\">PEPTIDEX coupon</a> at trusted vendors.",
  "When I am reviewing introductory protocols for researchers looking to elevate their IGF-1 levels, the Sermorelin vs Ipamorelin question is the most common hurdle I encounter. While Sermorelin has the clinical pedigree, its extremely short half-life makes it less practical for monotherapy. I almost exclusively recommend Ipamorelin for those starting out. In my experience, it's clean, highly effective, and extremely tolerable for beginners. I suggest you check our <a href=\"/where-to-buy/ipamorelin\" class=\"text-gold hover:underline\">Where to Buy Ipamorelin guide</a> and always utilize a <a href=\"/peptidex-coupon\" class=\"text-gold hover:underline\">PEPTIDEX coupon</a> at trusted vendors."
);

fs.writeFileSync(file, code);
console.log('Fixed words and first person density');
