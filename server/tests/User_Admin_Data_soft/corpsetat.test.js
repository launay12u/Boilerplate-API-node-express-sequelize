/* eslint-env jest */

import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import db from '../../../config/sequelize';
import app from '../../../index';
import config from '../../../config/config';
import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
iconv.encodings = encodings;

const apiVersionPath = `/api/v${config.apiVersion}`;


describe('## Corps Etat APIs', () => {

    let corpsetat = {
        corpsetat: 'toto'
    };

    describe(`# POST ${apiVersionPath}/corpsetats`, () => {
        test('should create a new corps etat', (done) => {
            request(app)
                .post(`${apiVersionPath}/corpsetats`)
                .send(corpsetat)
                .expect(httpStatus.CREATED)
                .then((res) => {
                    expect(res.body.DetailCorpsEtat).toEqual(corpsetat.corpsetat);
                    corpsetat = res.body;
                    done();
                })
                .catch(done);
        });
    });

    // describe(`# GET ${apiVersionPath}/corpsetats/:corpsetatId`, () => {
    //     test('should get corps etat details', (done) => {
    //         request(app)
    //             .get(`${apiVersionPath}/corpsetats/${corpsetat.id}`)
    //             .expect(httpStatus.OK)
    //             .then((res) => {
    //                 expect(res.body.DetailCorpsEtat).toEqual(corpsetat.DetailCorpsEtat);
    //                 done();
    //             })
    //             .catch(done);
    //     });

    //     test('should report error with message - Not found, when user does not exist', (done) => {
    //         request(app)
    //             .get(`${apiVersionPath}/corpsetats/1234345`)
    //             .expect(httpStatus.NOT_FOUND)
    //             .then((res) => {
    //                 expect(res.body.message).toEqual('Not Found');
    //                 done();
    //             })
    //             .catch(done);
    //     });
    // });

    // describe(`# PUT ${apiVersionPath}/corpsetats/:corpsetatId`, () => {
    //     test('should update corps etat details', (done) => {
    //         corpsetat.corpsetat = 'KK';
    //         request(app)
    //             .put(`${apiVersionPath}/corpsetats/${corpsetat.id}`)
    //             .send(corpsetat)
    //             .expect(httpStatus.OK)
    //             .then((res) => {
    //                 expect(res.body.DetailCorpsEtat).toEqual('KK');
    //                 done();
    //             })
    //             .catch(done);
    //     });
    // });

    // describe(`# GET ${apiVersionPath}/corpsetats/`, () => {
    //     test('should get all corps etat', (done) => {
    //         request(app)
    //             .get(`${apiVersionPath}/corpsetats`)
    //             .expect(httpStatus.OK)
    //             .then((res) => {
    //                 expect(Array.isArray(res.body));
    //                 done();
    //             })
    //             .catch(done);
    //     });

    //     test('should get all corps etat (with limit and skip)', (done) => {
    //         request(app)
    //             .get(`${apiVersionPath}/corpsetats`)
    //             .query({ limit: 10, skip: 1 })
    //             .expect(httpStatus.OK)
    //             .then((res) => {
    //                 expect(Array.isArray(res.body));
    //                 done();
    //             })
    //             .catch(done);
    //     });
    // });

    // describe(`# DELETE ${apiVersionPath}/corpsetats/`, () => {
    //     test('should delete user', (done) => {
    //         request(app)
    //             .delete(`${apiVersionPath}/corpsetats/${corpsetats.id}`)
    //             .expect(httpStatus.OK)
    //             .then((res) => {
    //                 expect(res.body).toEqual('KK');
    //                 done();
    //             })
    //             .catch(done);
    //     });
    // });
});
