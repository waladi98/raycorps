// -----------------------------------------------------------------------------------------------------
// @ AUTH UTILITIES
//
// Methods are derivations of the Auth0 Angular-JWT helper service methods
// https://github.com/auth0/angular2-jwt
// -----------------------------------------------------------------------------------------------------
import { environment } from '../../../environments/environment';

export class AuthUtils {
    /**
     * Constructor
     */
    constructor() {}

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Base64 decoder
     * Credits: https://github.com/atk
     *
     * @param str
     * @private
     */
    private static _b64decode(str: string): string {
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';

        str = String(str).replace(/=+$/, '');

        if (str.length % 4 === 1) {
            throw new Error(
                "'atob' failed: The string to be decoded is not correctly encoded."
            );
        }

        /* tslint:disable */
        for (
            // initialize result and counters
            let bc = 0, bs: any, buffer: any, idx = 0;
            // get next character
            (buffer = str.charAt(idx++));
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4)
                ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                : 0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        /* tslint:enable */

        return output;
    }

    /**
     * Base64 unicode decoder
     *
     * @param str
     * @private
     */
    private static _b64DecodeUnicode(str: any): string {
        return decodeURIComponent(
            Array.prototype.map
                .call(this._b64decode(str), (c: any) => {
                    return (
                        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join('')
        );
    }

    /**
     * URL Base 64 decoder
     *
     * @param str
     * @private
     */
    private static _urlBase64Decode(str: string): string {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw Error('Illegal base64url string!');
            }
        }
        return this._b64DecodeUnicode(output);
    }

    /**
     * Decode token
     *
     * @param token
     * @private
     */
    private static _decodeToken(token: string): any {
        // Return if there is no token
        if (!token) {
            return null;
        }

        // Split the token
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error(
                "The inspected token doesn't appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more."
            );
        }

        // Decode the token using the Base64 decoder
        const decoded = this._urlBase64Decode(parts[1]);

        if (!decoded) {
            throw new Error('Cannot decode the token.');
        }

        return JSON.parse(decoded);
    }

    /**
     * Get token expiration date
     *
     * @param token
     * @private
     */
    private static _getTokenExpirationDate(token: string): Date | null {
        // Get the decoded token
        const decodedToken = this._decodeToken(token);

        // Return if the decodedToken doesn't have an 'exp' field
        if (!decodedToken.hasOwnProperty('exp')) {
            return null;
        }

        // Convert the expiration date
        const date = new Date(0);
        date.setUTCSeconds(decodedToken.exp);

        return date;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Is token expired?
     *
     * @param token
     * @param offsetSeconds
     */
    static isTokenExpired(token: string, offsetSeconds?: number): boolean {
        // Return if there is no token
        if (!token || token === '' || token === 'undefined') {
            return true;
        }

        // unwrap token from wrapper
        const unwrapToken = this._unwrapToken(token);

        // Get the expiration date
        const date = this._getTokenExpirationDate(unwrapToken);

        offsetSeconds = offsetSeconds || 0;

        if (date === null) {
            return true;
        }

        // Check if the token is expired
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }

    /**
     * decodeToken
     * @param token string
     */
    static decodeChiperToken(token: string): any {
        const response = {
            data: null,
            tokenID: null,
            appID: null,
        };

        if (token) {
            const newtoken = this._unwrapToken(token);
            const decoded = this._decodeToken(newtoken);
            response.data = decoded.data;
            response.tokenID = decoded.jti;
            response.appID = decoded.iss;
        }
        return response;
    }

    /**
     * unwrap token
     *
     * @param token string
     * @returns string
     */
    private static _unwrapToken(token: string): string {
        const tokenPart = token.split('.');
        const header = this._removePS(
            tokenPart[0],
            environment.AP,
            environment.AS
        );
        const payload = this._removePS(
            tokenPart[1],
            environment.BP,
            environment.BS
        );
        const sign = this._removePS(
            tokenPart[2],
            environment.CP,
            environment.CS
        );
        return header + '.' + payload + '.' + sign;
    }

    private static _removePS(str: string, pre: number, suf: number): string {
        const totWrapper = pre + suf;
        const total = str.length - totWrapper;
        return str.substr(pre, total);
    }
}
