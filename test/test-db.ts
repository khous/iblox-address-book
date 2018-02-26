/* tslint: no-unused-expression */
import { expect } from "chai";
import "mocha";
import Database from "../src/data/db";

describe("Database", () => {
    let db: Database;
    before((done) => {
        db = new Database((err) => {
            expect(!!err).to.equal(false);
            done();
        });
    });

    it("should parse the input file correctly", () => {
        expect(db.lines.length).to.equal(16);
    });

    it("should correctly match inputs", () => {
        const results = db.search("Brown");
        expect(results.length).to.equal(2);

        for (const result of results) {
            expect(result.lastName).to.equal("Brown");
        }
    });

    it("should not match input when no results are found", () => {
        const results = db.search("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        expect(results.length).to.equal(0);
    });

    it("should only match on the specified fields", () => {
        let results = db.search("Malone", "firstName");
        expect(results.length).to.equal(0);

        results = db.search("Jones", "firstName");
        expect(results.length).to.equal(1);
    });

    it("should exactly match fields", () => {
        const fname = "Jimbo";
        const lname = "Jones";
        const results = db.multiSearch(
            { field: "firstName", value: fname },
            { field: "lastName", value: lname }
            );

        expect(results.length).to.equal(1);
        expect(results[0].firstName).to.equal(fname);
        expect(results[0].lastName).to.equal(lname);
    });
});
