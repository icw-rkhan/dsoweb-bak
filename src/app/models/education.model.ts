import { Serializable } from './serializable.model';

export class Education implements Serializable<Education> {
    id?: number;
    name: string;
    year: number;
    types: number;//0 for US school, 1 for non US school

    deserialize(data: any): Education {
        if (data.id) {
            return <Education>Object.assign({}, {
                id: data.id,
                name: data.name,
                year: data.year || null,
                types: data.types || 0
            });
        }
        return <Education>Object.assign({}, {
            name: data.name,
            year: data.year || null,
            types: data.types || 0
        });
    }
}