import { User } from "./User";



export type ImageData = {
    url: string;

}

export type SavedImageData = ImageData & {
    id: string;
    userId: string;
    imageid: string;
    createdAt: Date;
}

