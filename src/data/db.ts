/**
 * This class represents the database backing the address book application
 */
import * as fs from "fs";
import * as readline from "readline";
import InputLine from "./input-line";

/**
 * The number of parts in an input line. Used for a sanity check in the parsing.
 * @type {number}
 */
const INPUT_LINE_PARTS_COUNT = 6;

export default class Database {
    /**
     * The name of the datafile hardcoded here
     * @type {string}
     */
    private static dataFileName: string = process.cwd() + "/sample-book.csv";

    /**
     * Create a case insensitive regular expression
     * @param {string} input
     * @returns {RegExp}
     */
    private static getInputMatcher(input: string): RegExp {
        return (new RegExp(`.*${input.toLowerCase()}.*`, "i"));
    }

    /**
     * The list of lines in this database
     */
    public lines: InputLine[];

    /**
     * The readstream to read the csv file
     */
    private dataFile: fs.ReadStream;

    /**
     * Build the database. Let this API match future implementations attached to a RDBMS
     */
    constructor (cb: (err) => void) {
        this.dataFile = fs.createReadStream(Database.dataFileName);
        this.lines = [];
        this.buildIndexes((err) => {
            cb(err);
        });
    }

    /**
     * Search a given field for the input string
     * @param {string} input
     * @param fields
     */
    public search (input: string, ...fields: string[]): InputLine[] {
        const matchingLines: InputLine[] = [];
        const inRegex = Database.getInputMatcher(input);
        for (const il of this.lines) {
            let match = false;
            if (fields.length > 0) {
                for (const f of fields) {
                    match = match || il.matchesField(inRegex, f);
                }
            } else {
                match = il.matches(inRegex);
            }

            if (match) {
                matchingLines.push(il);
            }
        }

        return matchingLines;
    }

    /**
     * Let this behavior follow the semantics of a strict AND operation. All fields must match
     * @returns {InputLine[]}
     * @param fieldValuePairs
     */
    public multiSearch (...fieldValuePairs: Array<{ field, value }>): InputLine[] {
        const matchingLines: InputLine[] = [];
        for (const il of this.lines) {
            let match = false;
            for (let i = 0; i < fieldValuePairs.length; i++) {
                const fvp = fieldValuePairs[i];
                const localMatch = il.matchesField(Database.getInputMatcher(fvp.value), fvp.field);
                match = i === 0 ? localMatch : match && localMatch;

                if (!match) {
                    break;
                }
            }

            if (match) {
                matchingLines.push(il);
            }
        }

        return matchingLines;
    }

    /**
     * Build the internal datastructures powering this in memory database
     * @param {(err) => void} cb
     */
    private buildIndexes (cb: (err) => void) {
        readline.createInterface({
                input: this.dataFile
            })
            .on("line", (line) => {
                this.lines.push(this.parseLine(line));
            })
            .on("close", () => {
                cb(null);
            });
    }

    /**
     * Parse a line of input into and InputLine
     * @param {string} line An input line, probably from the file stream
     * @returns {InputLine} A full fledged input line
     */
    private parseLine (line: string): InputLine {
        const stringParts: string[] = [];
        let stringOn: boolean = false;
        let idx = 0;
        for (const char of line) {
            // There are weird angly doublequotes in the input
            if (char === '"' || char === "“") {
                // If we were adding a string, now we're not, so increment the index to capture the next string
                idx += stringOn ? 1 : 0;
                // turn string capture off
                stringOn = !stringOn;
                continue;
            }

            if (stringOn) {
                if (stringParts[idx]) {
                    stringParts[idx] += char;
                } else {
                    stringParts[idx] = char;
                }
            }
        }

        if (stringParts.length !== INPUT_LINE_PARTS_COUNT) {
            throw new Error("Invalid input line: " + line);
        }

        return new InputLine({
            firstName: stringParts[0],
            lastName: stringParts[1],
            address: stringParts[2],
            city: stringParts[3],
            state: stringParts[4],
            id: parseInt(stringParts[5], 10)
        });
    }
}
