import { transformDate, convertToShortFormat, getPrefix, isEmpty } from "../src/utils/apiUtils";

describe('apiUtils', () => {

    it('Should correctly transform date', () => {
        const myDate = new Date('January 4, 2023 11:00:00');
        expect(transformDate(myDate)).toEqual('2023-01-04');
    });

    it('Should not convert date in short format', () => {
        expect(convertToShortFormat('2023-01-04')).toEqual('2023-01-04');
    });

    it('Should convert date to short format', () => {
        const myDate = new Date('2023-04-01');
        expect(convertToShortFormat(myDate)).toEqual('2023-04-01');
    });

    it('Should correctly get endpoint prefix', () => {
        const endpoint = 'prefix_endpointa/endpoint/raz/dwa/trzy';
        expect(getPrefix(endpoint)).toEqual('prefix_endpointa');
    });

    it('Should correctly check if field is empty', () => {
        expect(isEmpty('')).toEqual(true);
        expect(isEmpty(null)).toEqual(true);
        expect(isEmpty('not empty at all')).toEqual(false);
        expect(isEmpty(' ')).toEqual(true);
    });
});