/**
 * This class represents one line of input which must be in the form of
 * "firstname","lastname","address""city","state""id"
 */
export default class InputLine {
    public firstName: string;
    public lastName: string;
    public address: string;
    public city: string;
    // Let the state be a two letter abbreviation
    public state: string;
    // numerical field is assumed to be an id
    public id: number;
    private line: string;

    /**
     * Build the object from the contructor argument
     * @param {InputLineConstructorArg} inputLine
     */
    constructor (inputLine: InputLineConstructorArg) {
        this.firstName = inputLine.firstName;
        this.lastName = inputLine.lastName;
        this.address = inputLine.address;
        this.city = inputLine.city;
        this.state = inputLine.state;
        this.id = inputLine.id;
    }

    /**
     * Provide this InputLine as a single concatenated line excluding the ID field.
     * @returns {string}
     */
    public getConcatenatedLine (): string {
        if (typeof this.line === "undefined") {
            this.line = `${this.firstName} ${this.lastName} ${this.address} ${this.city} ${this.state}`;
        }

        return this.line;
    }

    /**
     * Test whether the input regex matches this line
     * @param {RegExp} input
     * @returns {boolean} True if it matches
     */
    public matches (input: RegExp): boolean {
        return input.test(this.getConcatenatedLine());
    }

    /**
     * Test whether the input regex matches the specified field
     * @param {RegExp} input The input to test with
     * @param {string} fieldName The field to test against
     * @returns {boolean} True if it matches
     */
    public matchesField (input: RegExp, fieldName: string): boolean {
        return input.test(this[fieldName]);
    }
}

/**
 * The argument used to build an InputLine
 */
export interface InputLineConstructorArg {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    id: number;
}
