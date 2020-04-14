var {isStr, isNum, invalidBuildCommand} = require('./../../server/server_utils');
var chai = require('chai');
var expect = chai.expect;

describe('Серверные утилиты', () => {
    describe('Функция isStr', () => {
        it('возвращает true на строке', () => {
            const input = "some string";
            const result = isStr(input);
            expect(result).to.be.true;
        })
        it('возвращает false на числе', () => {
            const input = 0;
            const result = isStr(input);
            expect(result).to.be.false;
        })
        it('возвращает false на boolean', () => {
            const input = false;
            const result = isStr(input);
            expect(result).to.be.false;
        })
    }) /* describe: isStr */
        
    describe('Функция isNum', () => {
        it('возвращает true на числе', () => {
            const input = 123;
            const result = isNum(input);
            expect(result).to.be.true;
        })
        it('возвращает false на строке', () => {
            const input = '123';
            const result = isNum(input);
            expect(result).to.be.false;
        })
        it('возвращает false на boolean', () => {
            const input = false;
            const result = isNum(input);
            expect(result).to.be.false;
        })
    }) /* describe: isNum */

    describe('Функция invalidBuildCommand', () => {
        it('возвращает false на npm run', () => {
            const input = "npm run";
            const result = invalidBuildCommand(input);
            expect(result).to.be.false;
        })
        it('возвращает true на rm -rf', () => {
            const input = "rm -rf";
            const result = invalidBuildCommand(input);
            expect(result).to.be.true;
        })
        it('возвращает true на cp', () => {
            const input = "  cp .";
            const result = invalidBuildCommand(input);
            expect(result).to.be.true;
        })
    }) /* describe: invalidBuildCommand */
}) 