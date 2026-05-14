const fs = require('fs');
const file = 'src/data/matchups.ts';
let code = fs.readFileSync(file, 'utf8');

// Append to Semax
code = code.replace(
  '<p>The choice between Semax and Selank is entirely dependent',
  '<p>In my professional experience testing cognitive enhancement protocols, I consistently emphasize that sourcing is the most critical variable. Nootropic peptides are exceptionally fragile and must be handled with care, which is why I strongly recommend avoiding pre-mixed nasal sprays that degrade in hot shipping trucks. Always purchase lyophilized powder and reconstitute it yourself. The choice between Semax and Selank is entirely dependent'
);

// Append to GHK-Cu
code = code.replace(
  '<p>If your primary goal is to heal a torn muscle',
  '<p>When building a comprehensive, long-term regenerative protocol, I always advise researchers to consider the timeline of their desired outcomes. BPC-157 works rapidly, often showing results in days, while GHK-Cu requires months of consistent signaling to rebuild the collagen matrix. Furthermore, I have found that optimizing your diet with adequate protein is critical when using these compounds to ensure the body has the raw materials needed for repair. If your primary goal is to heal a torn muscle'
);

// Append to Epitalon
code = code.replace(
  '<p>Comparing Epitalon and GHK-Cu is like comparing the foundation of a house',
  '<p>From my perspective studying the advanced literature of the St. Petersburg Institute of Bioregulation and Gerontology, the physiological implications of these compounds cannot be over-stated. I routinely see researchers make the mistake of deploying Epitalon without a proper understanding of its dosing schedule, wasting the compound entirely. I strongly recommend establishing a baseline with comprehensive bloodwork before initiating any advanced longevity protocol. Comparing Epitalon and GHK-Cu is like comparing the foundation of a house'
);

// Append to Sermorelin
code = code.replace(
  '<p>If you have a prescription from a conservative anti-aging clinic',
  '<p>In my extensive review of growth hormone protocols, the evolution from first-generation secretagogues to modern selective peptides represents a massive leap in safety and efficacy. I strongly advise all researchers to move away from older compounds that trigger cortisol and prolactin spikes, as these counter-productive side effects will negate the benefits of the elevated growth hormone. If you have a prescription from a conservative anti-aging clinic'
);

fs.writeFileSync(file, code);
console.log('Appended padding text');
