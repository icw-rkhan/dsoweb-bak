export interface Serializable<T> {
  deserialize(data: any): T;
}
