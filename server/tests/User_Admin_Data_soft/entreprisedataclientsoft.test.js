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


describe('## Entreprise APIs', () => {
    let entreprise = {
        NomEnt: 'NOM Entreprise',
        RaisonSocialeEnt:'SARL',
        SiretEnt:'00342',
        MailContactEnt:'contact@entreprise.fr',
        TelEnt:'0383000000',
        UrlLogoEnt:'/photo_entreprise/test.jpg',
        NumClient:'232DEZ',
        CompltAddrsEnt:'Bâtiment A',
        NumLibEnt:'25 avenue de la libération',
        VilleEnt:'Nancy',
        CpEnt:'54000',
        LatAddrsEnt:'34535345',
        LongAddrsEnt:'5345345345',
        CorpsEtat_CorpsEtatID:'1'
    };

    // let entreprise_error = {
    //     NomEnt: 'NOM Entreprsie',
    //     RaisonSocialeEnt:'SARL',
    //     SiretEnt:'000000000',
    //     MailContactEnt:'contact@entreprise.fr',
    //     TelEnt:'0383000000',
    //     UrlLogoEnt:'/photo_entreprise/test.jpg',
    //     NumClient:'232DEZ',
    //     CompltAddrsEnt:'Bâtiment A',
    //     NumLibEnt:'25 avenue de la libération',
    //     VilleEnt:'Nancy',
    //     CpEnt:'54000',
    //     LatAddrsEnt:'34535345',
    //     LongAddrsEnt:'5345345345',
    //     CorpsEtat_CorpsEtatID:'111111111111'
    // };

    describe(`# POST ${apiVersionPath}/entreprises`, () => {
        test('should create a new entreprise', (done) => {
            request(app)
                .post(`${apiVersionPath}/entreprises`)
                .send(entreprise)
                .expect(httpStatus.CREATED)
                .then((res) => {
                    expect(res.body.name).toEqual(entreprise.NomEnt);
                    entreprise = res.body;
                    done();
                })
                .catch(done);
        });
        // test('should report error with message - Not found, when corpsetat does not exist', (done) => {
        //     request(app)
        //         .post(`${apiVersionPath}/entreprises`)
        //         .send(entreprise_error)
        //         .expect(httpStatus.NOT_FOUND)
        //         .then((res) => {
        //             expect(res.body.message).toEqual('Not Found');
        //             done();
        //         })
        //         .catch(done);
        // });
        // test('should create a new user', (done) => {
        //     request(app)
        //         .post(`${apiVersionPath}/users`)
        //         .send(entreprise)
        //         .expect(httpStatus.CREATED)
        //         .then((res) => {
        //             expect(res.body.name).toEqual(entreprise.NomEnt);
        //             entreprise = res.body;
        //             done();
        //         })
        //         .catch(done);
        // });
        // test('should create a new user', (done) => {
        //     request(app)
        //         .post(`${apiVersionPath}/users`)
        //         .send(entreprise)
        //         .expect(httpStatus.CREATED)
        //         .then((res) => {
        //             expect(res.body.name).toEqual(entreprise.NomEnt);
        //             entreprise = res.body;
        //             done();
        //         })
        //         .catch(done);
        // });
    });

    // describe(`# GET ${apiVersionPath}/users/:userId`, () => {
    //     test('should get user details', (done) => {
    //         request(app)
    //             .get(`${apiVersionPath}/users/${user.id}`)
    //             .expect(httpStatus.OK)
    //             .then((res) => {
    //                 expect(res.body.name).toEqual(user.name);
    //                 done();
    //             })
    //             .catch(done);
    //     });

    //     test('should report error with message - Not found, when user does not exist', (done) => {
    //         request(app)
    //             .get(`${apiVersionPath}/users/12345`)
    //             .expect(httpStatus.NOT_FOUND)
    //             .then((res) => {
    //                 expect(res.body.message).toEqual('Not Found');
    //                 done();
    //             })
    //             .catch(done);
    //     });
    // });

    // describe(`# PUT ${apiVersionPath}/users/:userId`, () => {
    //     test('should update user details', (done) => {
    //         user.name = 'KK';
    //         request(app)
    //             .put(`${apiVersionPath}/users/${user.id}`)
    //             .send(user)
    //             .expect(httpStatus.OK)
    //             .then((res) => {
    //                 expect(res.body.name).toEqual('KK');
    //                 done();
    //             })
    //             .catch(done);
    //     });
    // });

    // describe(`# GET ${apiVersionPath}/users/`, () => {
    //     test('should get all users', (done) => {
    //         request(app)
    //             .get(`${apiVersionPath}/users`)
    //             .expect(httpStatus.OK)
    //             .then((res) => {
    //                 expect(Array.isArray(res.body));
    //                 done();
    //             })
    //             .catch(done);
    //     });

    //     test('should get all users (with limit and skip)', (done) => {
    //         request(app)
    //             .get(`${apiVersionPath}/users`)
    //             .query({ limit: 10, skip: 1 })
    //             .expect(httpStatus.OK)
    //             .then((res) => {
    //                 expect(Array.isArray(res.body));
    //                 done();
    //             })
    //             .catch(done);
    //     });
    // });

    // describe(`# DELETE ${apiVersionPath}/users/`, () => {
    //     test('should delete user', (done) => {
    //         request(app)
    //             .delete(`${apiVersionPath}/users/${user.id}`)
    //             .expect(httpStatus.OK)
    //             .then((res) => {
    //                 expect(res.body).toEqual('KK');
    //                 done();
    //             })
    //             .catch(done);
    //     });
    // });
});
