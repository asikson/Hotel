import { addWeekDays, checkIfDateBetween, checkReservation, getDatesFromCurrentWeek, shiftDates } from "../src/Calendar/utils/calendarUtils";

const mockReservation = {
    from_date: '2023-01-03',
    to_date: '2023-01-14'
};

const mockDate = new Date('2023-01-20');
jest.spyOn(Date, 'now').mockImplementation(() => mockDate);

const mockDateArray = [
    '2023-01-16',
    '2023-01-17',
    '2023-01-18',
    '2023-01-19',
    '2023-01-20',
    '2023-01-21',
    '2023-01-22',
];

describe('calendarUtils', () => {
    it('Should return true if date between two other', () => {
        expect(checkIfDateBetween('2023-01-06', '2023-01-02', '2023-01-08')).toEqual(true);
        expect(checkIfDateBetween('2023-01-08', '2023-01-02', '2023-01-08')).toEqual(true);
    });

    it('Should return false if date not between two other', () => {
        expect(checkIfDateBetween('2023-01-11', '2023-01-02', '2023-01-08')).toEqual(false);
        expect(checkIfDateBetween('2023-01-01', '2023-01-02', '2023-01-08')).toEqual(false);
    });

    it('Should return true if reservation contains given date', () => {
        expect(checkReservation(mockReservation, '2023-01-08')).toEqual(true);
        expect(checkReservation(mockReservation, '2023-01-03')).toEqual(true);
    });

    it('Should return false if reservation does not contain given date', () => {
        expect(checkReservation(mockReservation, '2023-01-01')).toEqual(false);
        expect(checkReservation(mockReservation, '2023-01-15')).toEqual(false);
    });

    it('Should correctly take dates from current week', () => {
        expect(getDatesFromCurrentWeek()).toEqual(mockDateArray);
    });

    it('Should correctly add week days', () => {
        expect(addWeekDays(mockDateArray)).toEqual(
            [
                'Pon, 2023-01-16',
                'Wt, 2023-01-17',
                'Śr, 2023-01-18',
                'Czw, 2023-01-19',
                'Pt, 2023-01-20',
                'Sob, 2023-01-21',
                'Nd, 2023-01-22'
            ]
        );
    });

    it('Should correctly shift dates by 5 days ahead', () => {
        expect(shiftDates(mockDateArray, 5)).toEqual(
            [
                '2023-01-21',
                '2023-01-22',
                '2023-01-23',
                '2023-01-24',
                '2023-01-25',
                '2023-01-26',
                '2023-01-27',
            ]
        );
    });

    it('Should correctly shift dates by 3 days back', () => {
        expect(shiftDates(mockDateArray, -3)).toEqual(
            [
                '2023-01-13',
                '2023-01-14',
                '2023-01-15',
                '2023-01-16',
                '2023-01-17',
                '2023-01-18',
                '2023-01-19'
            ]
        );
    });
})