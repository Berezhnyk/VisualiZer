// tslint:disable-next-line:no-implicit-dependencies
import { expect } from 'chai';
import { ArrayUtil } from '../src/utils/array-util';

describe('ArrayUtil', () => {

    describe('last', () => {
        it('should return last element from array', () => {
            const result = ArrayUtil.last(['a', 'b', 'c']);
            expect(result).to.equal('c');
        });
    });

    describe('max', () => {
        it('should return max element from array', () => {
            const result = ArrayUtil.max([5, 3, 7, 2, -9, 6, 2]);
            expect(result).to.equal(7);
        });
    
        it('should return max element from array with negative numbers', () => {
            const result = ArrayUtil.max([-5, -3, -7, -2, -9, -6, -2]);
            expect(result).to.equal(-2);
        });
    });

    describe('min', () => {
        it('should return min element from array', () => {
            const result = ArrayUtil.min([15, 3, 7, 2, -9, 6, 2]);
            expect(result).to.equal(-9);
        });
    
        it('should return min element from array with negative numbers', () => {
            const result = ArrayUtil.min([-5, -3, -7, -2, -9, -6, -2]);
            expect(result).to.equal(-9);
        });
    });

    describe('round', () => {
        it('should should round 5.006 to 5', () => {
            const result = ArrayUtil.round(5.006);
            expect(result).to.equal(5);
        });

        it('should should round 5.006 to 5.01 with precision 2', () => {
            const result = ArrayUtil.round(5.006, 2);
            expect(result).to.equal(5.01);
        });

        it('should should round 5060 to 5100 with precision -2', () => {
            const result = ArrayUtil.round(5060, -2);
            expect(result).to.equal(5100);
        });
    });

    describe('maxBy', () => {
        it('should be found max by property', () => {
            const values = [{ 'n': 1 }, { 'n': 2 }, { 'n': 1 }];
            const result = ArrayUtil.maxBy(values, x => x.n);
            expect(result).to.equal(values[1]);
        });
    });

    describe('minBy', () => {
        it('should be found min by property', () => {
            const values = [{ 'n': 1 }, { 'n': 2 }];
            const result = ArrayUtil.minBy(values, x => x.n);
            expect(result).to.equal(values[0]);
        });
    });

    describe('extend', () => {
        it('should be extend object', () => {
            const result = ArrayUtil.extend({}, { x: 1 }, { y: 2 });
            expect(result).to.deep.equal({ x: 1, y: 2 });
        });
    });
});