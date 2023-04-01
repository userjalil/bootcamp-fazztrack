const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe("Data user testing", () => {
    describe("Testing tampilkan data", () => {
        it("Mendapatkan semua data user", (done) => {
            chai.request(app)
                .get('/api/v1/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Mendapatkan data user by ID", (done) => {
            const id = 1;
            chai.request(app)
                .get(`/api/v1/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("Tidak mendapatkan data user by ID", (done) => {
            const id = 2;
            chai.request(app)
                .get(`/api/v1/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe("Testing Menghapus data user", () => {
        it("Hapus user berdasarkan ID", (done) => {
            const id = 9;
            chai.request(app)
                .delete(`/api/v1/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});