export interface Livrable {
    id: number;
    titre: string;
    type: TypeLivrable;
    dateDepot: Date;
    fichierPDFNom: string;
    fichierPDFChemin: string;
    etat: EtatLivrable;
    etudiant: {
        id: number;
        fullName: string;
    };
}

export enum TypeLivrable {
    Rapport = 'Rapport',
    Poster = 'Poster',
    Attestation = 'Attestation'
}

export enum EtatLivrable {
    Déposé = 'Déposé',
    Retard = 'Retard',
    Validé = 'Validé',
    Refusé = 'Refusé'
}

export interface LivrableFormData {
    titre: string;
    type: TypeLivrable;
    fichier: File;
}