import { TypesOfPills } from "./TypesOfPill";

export class Product {
    name?: string;
    composition?: string;
    category?: string;
    tag?: string;
    imageSrc?: string;
    featureProduct?: boolean;
    prescription?: string;
    typesOfPill?: TypesOfPills[]
}
