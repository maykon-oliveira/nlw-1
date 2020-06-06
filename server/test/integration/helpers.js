const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app.js');

global.app = app;
global.servidor = supertest(app);
global.expect = expect;
