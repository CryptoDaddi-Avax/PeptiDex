export interface ReconstitutionContent {
  title: string;
  subtitle: string;
  slug: string;
  introduction: string;
  bacWaterGuidance: string;
  handlingInstructions: string;
  workedExample: string;
  concentrationNote: string;
}

export const reconstitutionContent: Record<string, ReconstitutionContent> = {
  'bpc-157': {
    title: 'BPC-157 Reconstitution Calculator',
    subtitle: 'COA-Verified Body Protection Compound Dilution Tool',
    slug: 'bpc-157',
    introduction: 'BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide investigated in preclinical research for accelerating tissue repair. Human clinical dosing data for BPC-157 remains extremely thin, and established human protocols vary widely or do not exist in standard medical practice. The default values pre-filled in the calculator below represent commonly cited literature baselines and pilot starting points for laboratory research, rather than established clinical or medical guidance.',
    bacWaterGuidance: 'Reconstituting BPC-157 requires highly sterile conditions. The standard laboratory protocol utilizes a 5mg freeze-dried (lyophilized) powder vial. Adding 2.5 mL of Bacteriostatic (BAC) water is widely recommended for BPC-157 research. BAC water contains 0.9% benzyl alcohol, which serves as a preservative, preventing microbial growth and maintaining solution sterility for up to 28 days under refrigeration. Avoid using plain sterile water or sterile saline if the vial will be accessed multiple times, as these solutions lack preservatives and will compromise sterility immediately upon the first needle puncture.',
    handlingInstructions: 'Lyophilized BPC-157 powder is highly stable when stored in a cool, dark environment (under 2-8°C for medium-term storage or below -20°C for long-term storage). Once reconstituted, the peptide becomes significantly more fragile. Always store the reconstituted vial in a refrigerator at 2°C to 8°C and keep it shielded from direct sunlight or UV exposure. When injecting Bacteriostatic water into the vial, always aim the needle at the glass wall of the vial, letting the diluent run down slowly rather than spraying directly onto the freeze-dried powder. Gently swirl the vial in a slow, circular motion—never shake or agitate it—until the cake dissolves into a completely clear, transparent liquid.',
    workedExample: `To illustrate the math behind the default BPC-157 reconstitution calculation:
1. **Identify the Peptide Mass**: A standard vial of BPC-157 contains 5 mg of active peptide (equivalent to 5,000 micrograms or mcg).
2. **Determine the Diluent Volume**: Reconstitute using 2.5 mL of Bacteriostatic water.
3. **Calculate the Solution Concentration**: Divide the total peptide mass by the volume of diluent added:
   $$5,000 \\text{ mcg} \\div 2.5 \\text{ mL} = 2,000 \\text{ mcg/mL}$$
4. **Determine the Syringe Dispensation Volume**: To draw a commonly cited literature starting point of 250 mcg (note that human clinical research is highly limited and protocols vary widely), divide this experimental target dose by the calculated concentration:
   $$250 \\text{ mcg} \\div 2,000 \\text{ mcg/mL} = 0.125 \\text{ mL}$$
5. **Convert to Syringe Units**: On a standard U-100 1mL insulin syringe (where 1 mL = 100 units, meaning 1 unit = 0.01 mL):
   $$0.125 \\text{ mL} \\times 100 \\text{ units/mL} = 12.5 \\text{ units}$$
   This translates to drawing the solution exactly to the 12.5 tick mark on the U-100 syringe barrel.`,
    concentrationNote: 'A concentration of 2,000 mcg/mL (2 mg/mL) is considered a standard reference point for laboratory settings. It balances volumetric precision with ease of drawing, ensuring experimental target doses like 250 mcg or 500 mcg require small fluid volumes (0.125 mL and 0.25 mL, respectively). These volumes are frequently cited as pilot baseline ranges in literature rather than established clinical guidelines, and small volumes help minimize localized tissue pressure at the target research site.'
  }
};
