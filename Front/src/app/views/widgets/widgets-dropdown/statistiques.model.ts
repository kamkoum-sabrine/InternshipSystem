export interface StatistiqueGlobale {
    usersByRole: { [role: string]: number };
    studentsByFiliereNiveau: Array<{ filiere: string; niveau: string; count: number }>;
    activationStats: { activés: number; désactivés: number };
}
