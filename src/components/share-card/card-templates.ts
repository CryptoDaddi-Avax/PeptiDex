/* ═══════════════════════════════════════════════════════════════════════
   Share Card Templates — Canvas-based rendering for branded share images
   Each template paints a 1080×1080 (square) or 1080×1920 (story) card.
   ═══════════════════════════════════════════════════════════════════════ */

// ── Shared Types ───────────────────────────────────────────────────────
export type CardFormat = "square" | "story";

export interface QuizCardData {
    type: "quiz";
    stackName: string;
    peptides: string[];
    matchPercent: number;
    goalEmoji: string;
    goalLabel: string;
}

export interface CompareCardData {
    type: "compare";
    peptides: { name: string; category: string; evidence: string; benefits: string }[];
    synergies: string[];
}

export interface CalculatorCardData {
    type: "calculator";
    peptideName: string;
    vialMg: number;
    bacWaterMl: number;
    doseMcg: number;
    syringeUnits: number;
    concentration: number;
    dosesPerVial: number;
}

export interface CycleCardData {
    type: "cycle";
    stackName: string;
    goalName: string;
    peptides: { name: string; doseMcg: number; cycleWeeks: number; vialsNeeded: number }[];
    totalVials: number;
    totalCost: number;
    maxWeeks: number;
}

export interface EvidenceCardData {
    type: "evidence";
    tiers: { label: string; color: string; peptides: string[] }[];
    totalPeptides: number;
}

export type ShareCardData = QuizCardData | CompareCardData | CalculatorCardData | CycleCardData | EvidenceCardData;

// ── Color Palette ──────────────────────────────────────────────────────
const COLORS = {
    bg1: "#09090b",
    bg2: "#18181b",
    bg3: "#1c1025",
    white: "#fafafa",
    zinc100: "#f4f4f5",
    zinc300: "#d4d4d8",
    zinc400: "#a1a1aa",
    zinc500: "#71717a",
    zinc600: "#52525b",
    zinc700: "#3f3f46",
    zinc800: "#27272a",
    violet400: "#a78bfa",
    violet500: "#8b5cf6",
    violet600: "#7c3aed",
    emerald400: "#34d399",
    emerald500: "#10b981",
    blue400: "#60a5fa",
    amber400: "#fbbf24",
    orange400: "#fb923c",
    cyan400: "#22d3ee",
};

// ── Shared Utilities ───────────────────────────────────────────────────
function getDimensions(format: CardFormat): [number, number] {
    return format === "story" ? [1080, 1920] : [1080, 1080];
}

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, COLORS.bg1);
    grad.addColorStop(0.5, COLORS.bg2);
    grad.addColorStop(1, COLORS.bg3);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle radial glow top-right
    const glow = ctx.createRadialGradient(w * 0.8, h * 0.15, 0, w * 0.8, h * 0.15, w * 0.5);
    glow.addColorStop(0, "rgba(139, 92, 246, 0.08)");
    glow.addColorStop(1, "rgba(139, 92, 246, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Bottom-left glow
    const glow2 = ctx.createRadialGradient(w * 0.15, h * 0.85, 0, w * 0.15, h * 0.85, w * 0.4);
    glow2.addColorStop(0, "rgba(6, 182, 212, 0.05)");
    glow2.addColorStop(1, "rgba(6, 182, 212, 0)");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, w, h);
}

function drawFooter(ctx: CanvasRenderingContext2D, w: number, h: number) {
    // Footer bar
    const footerH = 80;
    ctx.fillStyle = "rgba(9, 9, 11, 0.9)";
    ctx.fillRect(0, h - footerH, w, footerH);

    // Top border line
    ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h - footerH);
    ctx.lineTo(w, h - footerH);
    ctx.stroke();

    // URL
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.violet400;
    ctx.textAlign = "left";
    ctx.fillText("peptidex.app", 60, h - footerH + 35);

    // Tagline
    ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.zinc500;
    ctx.textAlign = "right";
    ctx.fillText("Research-backed peptide education", w - 60, h - footerH + 35);

    // DNA emoji
    ctx.font = "22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("\u{1F9EC}", 60, h - footerH + 62);

    ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.zinc600;
    ctx.fillText("Built with PeptiDex", 90, h - footerH + 62);
}

function drawLogo(ctx: CanvasRenderingContext2D, logoImg: HTMLImageElement | null) {
    if (logoImg) {
        ctx.drawImage(logoImg, 50, 40, 52, 52);
        ctx.font = "bold 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.white;
        ctx.textAlign = "left";
        ctx.fillText("PeptiDex", 112, 74);
    } else {
        ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.white;
        ctx.textAlign = "left";
        ctx.fillText("PeptiDex", 50, 76);
    }
}

function drawPill(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number, y: number,
    bgColor: string,
    borderColor: string,
    textColor: string,
    fontSize = 20,
) {
    ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
    const metrics = ctx.measureText(text);
    const pw = metrics.width + 32;
    const ph = fontSize + 20;
    const r = ph / 2;

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(x, y, pw, ph, r);
    ctx.fill();

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(x, y, pw, ph, r);
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.textAlign = "left";
    ctx.fillText(text, x + 16, y + ph / 2 + fontSize * 0.35);

    return pw;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
}

function drawCard(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, borderColor: string) {
    ctx.fillStyle = "rgba(24, 24, 27, 0.6)";
    roundRect(ctx, x, y, w, h, 16);
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, w, h, 16);
    ctx.stroke();
}

// ── Template: Quiz Result ──────────────────────────────────────────────
export function renderQuizCard(ctx: CanvasRenderingContext2D, data: QuizCardData, format: CardFormat, logo: HTMLImageElement | null) {
    const [w, h] = getDimensions(format);
    drawBackground(ctx, w, h);
    drawLogo(ctx, logo);
    drawFooter(ctx, w, h);

    const centerX = w / 2;
    const startY = format === "story" ? 300 : 170;

    // Goal emoji large
    ctx.font = "80px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.goalEmoji, centerX, startY);

    // Title
    ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.violet400;
    ctx.textAlign = "center";
    ctx.fillText("MY PEPTIDEX STACK", centerX, startY + 60);

    // Stack name
    ctx.font = "bold 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.white;
    const stackName = data.stackName.length > 28 ? data.stackName.substring(0, 26) + "..." : data.stackName;
    ctx.fillText(stackName, centerX, startY + 120);

    // Goal label
    ctx.font = "20px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.zinc400;
    ctx.fillText(data.goalLabel, centerX, startY + 155);

    // Match percentage badge
    const badgeY = startY + 185;
    const badgeText = `${data.matchPercent}% Match`;
    ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    const bw = ctx.measureText(badgeText).width + 40;
    ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
    roundRect(ctx, centerX - bw / 2, badgeY, bw, 44, 22);
    ctx.fill();
    ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, centerX - bw / 2, badgeY, bw, 44, 22);
    ctx.stroke();
    ctx.fillStyle = COLORS.emerald400;
    ctx.textAlign = "center";
    ctx.fillText(badgeText, centerX, badgeY + 31);

    // Peptide pills - centered
    const pillY = badgeY + 80;
    const pillSpacing = 12;
    const fontSize = 22;

    // Measure total width first
    ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
    let totalWidth = 0;
    const pillWidths = data.peptides.map(p => {
        const m = ctx.measureText(p).width + 32;
        totalWidth += m;
        return m;
    });
    totalWidth += pillSpacing * (data.peptides.length - 1);

    let px = centerX - totalWidth / 2;
    data.peptides.forEach((pep, i) => {
        drawPill(ctx, pep, px, pillY, "rgba(139, 92, 246, 0.12)", "rgba(139, 92, 246, 0.3)", COLORS.violet400, fontSize);
        px += pillWidths[i] + pillSpacing;
    });
}

// ── Template: Compare ──────────────────────────────────────────────────
export function renderCompareCard(ctx: CanvasRenderingContext2D, data: CompareCardData, format: CardFormat, logo: HTMLImageElement | null) {
    const [w, h] = getDimensions(format);
    drawBackground(ctx, w, h);
    drawLogo(ctx, logo);
    drawFooter(ctx, w, h);

    const startY = format === "story" ? 250 : 140;

    // Title
    ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.violet400;
    ctx.textAlign = "center";
    ctx.fillText("PEPTIDE COMPARISON", w / 2, startY);

    // VS badge
    const names = data.peptides.map(p => p.name);
    ctx.font = "bold 42px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.white;
    const vsText = names.length === 2 ? `${names[0]} vs ${names[1]}` : names.join(" · ");
    ctx.fillText(vsText, w / 2, startY + 60);

    // Comparison cards
    const cardW = data.peptides.length === 2 ? (w - 140) / 2 : (w - 160) / 3;
    const cardH = format === "story" ? 500 : 380;
    const cardY = startY + 100;

    data.peptides.forEach((pep, i) => {
        const isLast = i === data.peptides.length - 1;
        const cx = 50 + i * (cardW + 20);
        const borderCol = i === 0 ? "rgba(139, 92, 246, 0.4)" : isLast ? "rgba(34, 211, 238, 0.4)" : "rgba(96, 165, 250, 0.4)";
        const accentCol = i === 0 ? COLORS.violet400 : isLast ? COLORS.cyan400 : COLORS.blue400;

        drawCard(ctx, cx, cardY, cardW, cardH, borderCol);

        // Peptide name
        ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.white;
        ctx.textAlign = "center";
        ctx.fillText(pep.name, cx + cardW / 2, cardY + 45);

        // Category
        ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = accentCol;
        ctx.fillText(pep.category.toUpperCase(), cx + cardW / 2, cardY + 75);

        // Evidence
        ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.zinc500;
        ctx.textAlign = "left";
        ctx.fillText("Evidence", cx + 20, cardY + 120);
        ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.zinc300;
        ctx.fillText(pep.evidence, cx + 20, cardY + 145);

        // Benefits
        ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.zinc500;
        ctx.fillText("Primary Benefits", cx + 20, cardY + 185);
        ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.zinc300;

        // Word-wrap benefits
        const maxTW = cardW - 40;
        const words = pep.benefits.split(" ");
        let line = "";
        let ly = cardY + 210;
        for (const word of words) {
            const test = line ? `${line} ${word}` : word;
            if (ctx.measureText(test).width > maxTW && line) {
                ctx.fillText(line, cx + 20, ly);
                line = word;
                ly += 22;
                if (ly > cardY + cardH - 30) break;
            } else {
                line = test;
            }
        }
        if (line && ly <= cardY + cardH - 30) ctx.fillText(line, cx + 20, ly);
    });

    // Synergy indicator
    if (data.synergies.length > 0) {
        const sy = cardY + cardH + 30;
        ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.emerald400;
        ctx.textAlign = "center";
        ctx.fillText(`\u2728 Synergy: ${data.synergies.join(", ")}`, w / 2, sy);
    }
}

// ── Template: Calculator ───────────────────────────────────────────────
export function renderCalculatorCard(ctx: CanvasRenderingContext2D, data: CalculatorCardData, format: CardFormat, logo: HTMLImageElement | null) {
    const [w, h] = getDimensions(format);
    drawBackground(ctx, w, h);
    drawLogo(ctx, logo);
    drawFooter(ctx, w, h);

    const centerX = w / 2;
    const startY = format === "story" ? 280 : 160;

    // Title
    ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.emerald400;
    ctx.textAlign = "center";
    ctx.fillText("MY PROTOCOL", centerX, startY);

    // Peptide Name
    ctx.font = "bold 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.white;
    ctx.fillText(data.peptideName, centerX, startY + 65);

    // Main stats grid
    const gridY = startY + 110;
    const statW = (w - 140) / 2;
    const statH = 120;
    const stats = [
        { label: "VIAL SIZE", value: `${data.vialMg} mg`, color: COLORS.violet400 },
        { label: "BAC WATER", value: `${data.bacWaterMl} ml`, color: COLORS.blue400 },
        { label: "DOSE", value: `${data.doseMcg} mcg`, color: COLORS.emerald400 },
        { label: "SYRINGE", value: `${data.syringeUnits} units`, color: COLORS.orange400 },
    ];

    stats.forEach((stat, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const sx = 50 + col * (statW + 20);
        const sy = gridY + row * (statH + 16);

        drawCard(ctx, sx, sy, statW, statH, "rgba(63, 63, 70, 0.5)");

        ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.zinc500;
        ctx.textAlign = "center";
        ctx.fillText(stat.label, sx + statW / 2, sy + 35);

        ctx.font = "bold 36px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = stat.color;
        ctx.fillText(stat.value, sx + statW / 2, sy + 82);
    });

    // Concentration & doses
    const bottomY = gridY + 2 * (statH + 16) + 30;
    const fullW = w - 100;
    drawCard(ctx, 50, bottomY, fullW, 110, "rgba(16, 185, 129, 0.2)");

    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.zinc500;
    ctx.textAlign = "left";
    ctx.fillText("CONCENTRATION", 80, bottomY + 35);
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.emerald400;
    ctx.fillText(`${Math.round(data.concentration).toLocaleString()} mcg/ml`, 80, bottomY + 72);

    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.zinc500;
    ctx.textAlign = "right";
    ctx.fillText("DOSES PER VIAL", w - 80, bottomY + 35);
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.emerald400;
    ctx.fillText(`${data.dosesPerVial}`, w - 80, bottomY + 72);
}

// ── Template: Cycle Planner ────────────────────────────────────────────
export function renderCycleCard(ctx: CanvasRenderingContext2D, data: CycleCardData, format: CardFormat, logo: HTMLImageElement | null) {
    const [w, h] = getDimensions(format);
    drawBackground(ctx, w, h);
    drawLogo(ctx, logo);
    drawFooter(ctx, w, h);

    const centerX = w / 2;
    const startY = format === "story" ? 280 : 160;

    // Title
    ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.orange400;
    ctx.textAlign = "center";
    ctx.fillText(`MY ${data.maxWeeks}-WEEK ${data.goalName.toUpperCase()} CYCLE — $${data.totalCost.toFixed(2)} TOTAL`, centerX, startY);

    // Stack name
    ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.white;
    const sn = data.stackName.length > 28 ? data.stackName.substring(0, 26) + "..." : data.stackName;
    ctx.fillText(sn, centerX, startY + 60);

    // The goal name was moved to the title, so we can skip printing it here to save vertical space.

    // Peptide timeline bars
    const barY = startY + 130;
    const maxWeeks = Math.max(...data.peptides.map(p => p.cycleWeeks), 16);
    const barW = w - 140;
    const barColors = [COLORS.violet400, COLORS.emerald400, COLORS.blue400, COLORS.orange400, COLORS.cyan400];

    data.peptides.forEach((pep, i) => {
        const y = barY + i * 90;

        // Peptide name + info
        ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.white;
        ctx.textAlign = "left";
        ctx.fillText(pep.name, 70, y);

        ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.zinc500;
        ctx.fillText(`${pep.doseMcg}mcg · ${pep.cycleWeeks}wk · ${pep.vialsNeeded} vial${pep.vialsNeeded !== 1 ? "s" : ""}`, 70, y + 24);

        // Timeline bar background
        ctx.fillStyle = COLORS.zinc800;
        roundRect(ctx, 70, y + 36, barW, 24, 12);
        ctx.fill();

        // Timeline bar fill
        const fillW = (pep.cycleWeeks / maxWeeks) * barW;
        const barGrad = ctx.createLinearGradient(70, 0, 70 + fillW, 0);
        barGrad.addColorStop(0, barColors[i % barColors.length]);
        barGrad.addColorStop(1, barColors[(i + 1) % barColors.length]);
        ctx.fillStyle = barGrad;
        roundRect(ctx, 70, y + 36, fillW, 24, 12);
        ctx.fill();

        // Week label inside bar
        ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.white;
        ctx.textAlign = "center";
        if (fillW > 60) {
            ctx.fillText(`${pep.cycleWeeks} weeks`, 70 + fillW / 2, y + 52);
        }
    });

    // Total vials badge
    const vialY = barY + data.peptides.length * 90 + 20;
    const vialText = `${data.totalVials} Total Vials`;
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    const vbw = ctx.measureText(vialText).width + 50;
    ctx.fillStyle = "rgba(251, 146, 60, 0.12)";
    roundRect(ctx, centerX - vbw / 2, vialY, vbw, 50, 25);
    ctx.fill();
    ctx.strokeStyle = "rgba(251, 146, 60, 0.4)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, centerX - vbw / 2, vialY, vbw, 50, 25);
    ctx.stroke();
    ctx.fillStyle = COLORS.orange400;
    ctx.textAlign = "center";
    ctx.fillText(vialText, centerX, vialY + 35);
}

// ── Template: Evidence Tier List ───────────────────────────────────────
export function renderEvidenceCard(ctx: CanvasRenderingContext2D, data: EvidenceCardData, format: CardFormat, logo: HTMLImageElement | null) {
    const [w, h] = getDimensions(format);
    drawBackground(ctx, w, h);
    drawLogo(ctx, logo);
    drawFooter(ctx, w, h);

    const centerX = w / 2;
    const startY = format === "story" ? 260 : 140;

    // Title
    ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.violet400;
    ctx.textAlign = "center";
    ctx.fillText("PEPTIDE EVIDENCE TIER LIST", centerX, startY);

    ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillStyle = COLORS.white;
    ctx.fillText(`${data.totalPeptides} Compounds Ranked`, centerX, startY + 55);

    // Tier rows
    const tierColors: Record<string, string> = {
        "FDA Approved": COLORS.emerald400,
        "Strong Clinical": COLORS.blue400,
        "Moderate / Preclinical": COLORS.amber400,
        "Emerging / Limited": COLORS.zinc500,
    };

    const tierBorders: Record<string, string> = {
        "FDA Approved": "rgba(52, 211, 153, 0.3)",
        "Strong Clinical": "rgba(96, 165, 250, 0.3)",
        "Moderate / Preclinical": "rgba(251, 191, 36, 0.3)",
        "Emerging / Limited": "rgba(113, 113, 122, 0.3)",
    };

    let ty = startY + 90;
    const rowW = w - 100;
    const availableH = (h - 80) - ty - 20; // footer is 80px
    const rowH = Math.min(Math.floor((availableH - (data.tiers.length - 1) * 12) / data.tiers.length), 180);

    data.tiers.forEach((tier) => {
        if (tier.peptides.length === 0) return;
        const color = tierColors[tier.label] || COLORS.zinc400;
        const border = tierBorders[tier.label] || "rgba(63, 63, 70, 0.5)";

        drawCard(ctx, 50, ty, rowW, rowH, border);

        // Tier label
        ctx.font = "bold 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = color;
        ctx.textAlign = "left";
        ctx.fillText(`${tier.label} (${tier.peptides.length})`, 75, ty + 30);

        // Peptide names - wrap within card
        ctx.font = "15px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = COLORS.zinc300;
        const pepText = tier.peptides.join(" · ");
        const maxPepW = rowW - 50;
        const pepWords = pepText.split(" ");
        let pepLine = "";
        let pepLy = ty + 56;
        for (const word of pepWords) {
            const test = pepLine ? `${pepLine} ${word}` : word;
            if (ctx.measureText(test).width > maxPepW && pepLine) {
                ctx.fillText(pepLine, 75, pepLy);
                pepLine = word;
                pepLy += 22;
                if (pepLy > ty + rowH - 10) break;
            } else {
                pepLine = test;
            }
        }
        if (pepLine && pepLy <= ty + rowH - 10) ctx.fillText(pepLine, 75, pepLy);

        ty += rowH + 12;
    });
}
