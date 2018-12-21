/* eslint-env jest */

import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import app from '../../index';
import config from '../../config/config';

const apiVersionPath = `/api/v${config.apiVersion}`;


describe('## Misc', () => {
    describe(`# GET ${apiVersionPath}/health-check`, () => {
        test('should return OK', (done) => {
            request(app)
                .get(`${apiVersionPath}/health-check`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.text).toEqual('OK');
                    done();
                })
                .catch(done);
        });
    });

    describe(`# GET ${apiVersionPath}/404`, () => {
        test('should return 404 status', (done) => {
            request(app)
                .get(`${apiVersionPath}/404`)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.message).toEqual('Not Found');
                    done();
                })
                .catch(done);
        });
    });

    describe('# Error Handling', () => {
        test('should handle express validation error - name is required', (done) => {
            request(app)
                .post(`${apiVersionPath}/entreprises`)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((res) => {
                    expect(res.body.message).toEqual('"name" is required and "rs" is required and "siret" is required and "mail" is required and "tel" is required and "libelle" is required and "ville" is required and "cp" is required and "lat" is required and "long" is required and "CorpsEtatId" is required');
                    done();
                })
                .catch(done);
        });
    });
});
