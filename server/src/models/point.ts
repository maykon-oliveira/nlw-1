export interface Point {
    id: number;
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
    lat: number;
    lng: number;
    items?: number[];
}
