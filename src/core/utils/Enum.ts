export class Enum {
    public static getKeys(enumObject: { [key: string]: any }): number[] {
        return Object.keys(enumObject).filter((key) => typeof enumObject[key] === 'number').map((key) => enumObject[key]);
    }

    public static getStringKeys(enumObject: { [key: string]: any }): string[] {
        return Object.keys(enumObject).filter((key) => typeof enumObject[key] === 'string').map((key) => enumObject[key]);
    }
}