#!/usr/bin/env node
/* tslint:disable:no-console */
import * as yargs from "yargs";
import Database from "./data/db";
import InputLine from "./data/input-line";
const argv = yargs.argv;

/**
 * Parse out key value pair objects from the input string
 * @param {string[]} kvPairs The pairs joined by a colon
 * @returns {Array<{field; value}>} The pairs as field value objects
 */
function parseKeyValues (kvPairs: string[]): Array<{ field, value }> {
    const pairs = [];

    for (const kvp of kvPairs) {
        // Split on the colon
        const kvpList = kvp.split(":");
        pairs.push({ field: kvpList[0], value: kvpList[1] });
    }

    return pairs;
}

/**
 * Print out the InputLines which were returned as results
 * @param {InputLine[]} lines The matching input lines
 */
function printResults (lines: InputLine[]) {
    if (lines.length === 0) {
        console.log("no results found");
    }

    for (const line of lines) {
        console.log(line.getConcatenatedLine());
    }

    const plural = lines.length > 1;
    console.log(`${lines.length} ${plural ? "results" : "result"} found`);
}

/**
 * Print out the help information
 */
function printHelp () {
    // Funky formatting here to work with the template string. All lefthand whitespace is included in output string
    console.log(`Usage   node index.js John Jones -- matches John Jones against all fields
        node index.js -i Jones -f firstName lastName -- Matches John against firstname and lastname fields
        node index.js -e firstName:John lastName:Jones state:WA -- Matches the values against the fields, 
            all fields must match
                      
    -f Specify which fields should be searched. Valid fields are 'firstName', 
          'lastName', 'address', 'city', 'id'
    -e Matches list of field:value pairs
    -i Specify input
    -h Display this message`);
}

// Instantiate the database
const db = new Database(() => {
    if (argv.e) {
        // Do a multisearch type look up matching all fields
        const inputList = [argv.e].concat(argv._);
        printResults(db.multiSearch.apply(db, parseKeyValues(inputList)));
    } else if (argv.f) {
        // Do an -i -f type lookup matching the input only in specified fields
        if (!argv.i) {
            return console.error("please specify input with -i");
        }

        printResults(
            db.search
                .apply(
                    db,
                    [argv.i] // Put input first
                        .concat(argv.f) // then the first argument incident to -f
                        .concat(argv._) // The remainder args are gathered under the _ property which is an array
                )
        );
    } else if (argv.h) {
        printHelp();
    } else if (typeof argv._[0] === "string") {
        // do a regular lookup based on the input string against all fields
        printResults(db.search(argv._.join(" ")));
    } else {
        console.error("no arguments provided");
        printHelp();
    }
});
