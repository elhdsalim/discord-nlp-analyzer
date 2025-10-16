export interface Company {
  "@id": string;
  "@type": string;
  id: number;
  logo?: MediaObject;
  commercialName: string;
  companyName: string;
  description?: string;
  descriptionFr?: string;
  website?: string;
  phone?: string;
  email?: string;
  campuses?: Campus[];
  activitySectors?: ActivitySector[];
  address?: Address;
  companyPromotions?: CompanyPromotion[];
  technos?: string[];
  shortDescription?: string;
  shortDescriptionFr?: string;
  jobOffers?: JobOffer[];
  socialNetworks?: SocialNetworks;
  organisationType?: string;
  isTenant?: boolean;
  businessRelationships?: BusinessRelationship[];
  targets?: string[];
}

// --- Sous-objets ---

export interface MediaObject {
  "@id": string;
  "@type": string;
  contentUrl: string;
}

export interface Campus {
  "@id": string;
  "@type": string;
  id: number;
  name: string;
  city?: string;
}

export interface ActivitySector {
  "@id": string;
  "@type": string;
  id: number;
  label: string;
}

export interface Address {
  "@id": string;
  "@type": string;
  address1?: string;
  address2?: string;
  city?: string;
  postcode?: string;
  country?: string;
}

export interface CompanyPromotion {
  "@id": string;
  "@type": string;
  id: number;
  year?: number;
  label?: string;
}

export interface JobOffer {
  "@id": string;
  "@type": string;
  id: number;
  title?: string;
  url?: string;
}

export interface SocialNetworks {
  "@id": string;
  "@type": string;
  id: number;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface BusinessRelationship {
  "@id": string;
  "@type": string;
  id: number;
  type?: string;
  partner?: Company;
}
