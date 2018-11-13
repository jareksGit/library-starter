/* global describe, it, before */

import chai from 'chai';
import pkg from '../package.json';
import { First, Second } from '../lib/library-starter.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('class First', () => {
    before(() => {
        lib = new First();
    });
    describe('get name()', () => {
        it('should return the name', () => {
            expect(lib.name).to.be.equal('Library');
        });
    });
});

describe('class Second', () => {
    before(() => {
        lib = new Second();
    });
    describe('get name()', () => {
        it('should return the name', () => {
            expect(lib.name).to.be.equal('Starter');
        });
    });
});
