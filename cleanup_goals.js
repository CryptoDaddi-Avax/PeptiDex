const { Project, SyntaxKind } = require('ts-morph');

const project = new Project();
project.addSourceFilesAtPaths("src/data/goal-pages.ts");
const sourceFile = project.getSourceFile("src/data/goal-pages.ts");

const goalPagesArray = sourceFile.getVariableDeclaration("goalPages").getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

goalPagesArray.getElements().forEach(element => {
    if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
        const deepDiveProp = element.getProperty("deepDive");
        if (deepDiveProp) deepDiveProp.remove();

        const clinicalEvidenceProp = element.getProperty("clinicalEvidence");
        if (clinicalEvidenceProp) clinicalEvidenceProp.remove();

        const protocolGuidelinesProp = element.getProperty("protocolGuidelines");
        if (protocolGuidelinesProp) protocolGuidelinesProp.remove();
    }
});

sourceFile.saveSync();
console.log("Cleanup complete!");
