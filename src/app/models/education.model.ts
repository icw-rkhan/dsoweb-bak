import { Serializable } from './serializable.model';

export class Education implements Serializable<Education> {
    id?: number;
    name: string;
    year: number;
    alias: string;
    types: number; // 1 for US school, 0 for non US school

    deserialize(data: any): Education {
        if (data.id) {
            return <Education>Object.assign({}, {
                id: data.id,
                name: data.name,
                year: data.year || null,
                alias: data.alias || null,
                types: data.types
            });
        }
        return <Education>Object.assign({}, {
            name: data.name,
            year: data.year || null,
            alias: data.alias || null,
            types: data.types
        });
    }
}
