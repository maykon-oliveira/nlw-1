import { Item } from './items';

export interface Point {
    id: number;
    name: string;
    city: string;
    uf: string;
    lat: number;
    lng: number;
    image: string;
    whatsapp: string;
    email: string;
    items: Item[];
}
