import { expect } from 'chai';
import api        from '~/api';

describe("getData example test", function () {

    it('should respond with an array of vehicles', async(done) => {

        try {

            const data = await api.vehicles();
            expect(data).to.be.instanceof(Array);
            expect(data).to.have.length.above(0);

            done();

        } catch (err) {
            done(err);
        }
    });

});
