import { Serializable } from './serializable.model';

export class Education implements Serializable<Education> {
    id?: number;
    name: string;
    year: number;
    isAttended: boolean;

    deserialize(data: any): Education {
        if (data.id) {
            return <Education>Object.assign({}, {
                id: data.id,
                name: data.school,
                year: data.year || null,
                isAttended: data.isAttended || true
            });
        }
        return <Education>Object.assign({}, {
            name: data.school,
            year: data.year || null,
            isAttended: data.isAttended || true
        });
    }
}