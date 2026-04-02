import { Goal, GoalId } from "./types";

export const goals: Goal[] = [
    { id: "body-recomposition", label: "Body Recomposition", icon: "🏋️", description: "Optimize fat loss while building lean muscle", stackNames: ["Body Recomposition Stack"] },
    { id: "injury-recovery", label: "Injury Recovery", icon: "🩹", description: "Accelerate healing of injuries and surgeries", stackNames: ["Injury Recovery Stack"] },
    { id: "mental-clarity", label: "Mental Clarity / Focus", icon: "🧠", description: "Enhance cognitive function and neuroprotection", stackNames: ["Mental Clarity & Cognitive Stack"] },
    { id: "fat-loss", label: "Fat Loss", icon: "🔥", description: "Targeted fat reduction and metabolic boost", stackNames: ["Fat Loss Focus Stack", "Body Recomposition Stack"] },
    { id: "muscle-growth", label: "Muscle Growth", icon: "💪", description: "Maximize lean mass and strength gains", stackNames: ["Muscle Growth Stack", "Body Recomposition Stack"] },
    { id: "immune-support", label: "Immune Support", icon: "🛡️", description: "Strengthen and balance immune function", stackNames: ["Immune Support Stack"] },
    { id: "sleep-recovery", label: "Sleep / Recovery", icon: "🌙", description: "Optimize sleep quality and overnight recovery", stackNames: ["Deep Sleep & Recovery Stack"] },
    { id: "longevity", label: "Longevity / Anti-Aging", icon: "⏳", description: "Target fundamental aging mechanisms", stackNames: ["Longevity & Anti-Aging Stack"] },
    { id: "skin-aesthetic", label: "Skin & Aesthetics", icon: "✨", description: "Rejuvenate skin, hair, and appearance", stackNames: ["Skin & Aesthetic Rejuvenation Stack"] },
    { id: "gut-health", label: "Gut Health", icon: "🫁", description: "Repair and protect the GI tract", stackNames: ["Gut Health & Recovery Stack"] },
    { id: "hormonal-optimization", label: "Hormonal Optimization", icon: "⚡", description: "Support healthy hormone levels naturally", stackNames: ["Hormonal Optimization Stack (Male)"] },
    { id: "metabolic-health", label: "Metabolic Health", icon: "🔬", description: "Improve insulin sensitivity and energy", stackNames: ["Metabolic & Insulin Sensitivity Stack"] },
];

export function getGoalById(id: GoalId): Goal | undefined {
    return goals.find((g) => g.id === id);
}

export function getStackNamesForGoals(goalIds: GoalId[]): string[] {
    const stackSet = new Set<string>();
    goalIds.forEach((id) => {
        const goal = getGoalById(id);
        if (goal) goal.stackNames.forEach((s) => stackSet.add(s));
    });
    return Array.from(stackSet);
}
