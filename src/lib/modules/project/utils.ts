/**
 * Ensure all emails are lower cased
 */
import {User} from "./auth.model";

export const sanitizeEmail = (email = ''): string => email.toLowerCase();

export const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export class ApiError extends Error {
    private statusCode: number;
    constructor(name: string, statusCode: number, message?: string) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

export const emailExist  = async (email: string): Promise<boolean> => (await User.findFirst({where: {email: email}})) !== null;
export const usernameExist  = async (username: string): Promise<boolean> => (await User.findFirst({where:{username: username}})) !== null;

/**
 * @params string String the string to capitalize
 */

export const generateToken = function(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let ss = today.getSeconds();
    let m = String(today.getMinutes()).padStart(2, '0');
    let h = String(today.getHours()).padStart(2, '0');
    let code = ss+m+h+dd+generateString(12)+Date.now();
    return shuffle(code);
};


export const generatePassword = function(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let ss = today.getSeconds();
    let m = String(today.getMinutes()).padStart(2, '0');
    let h = String(today.getHours()).padStart(2, '0');
    let code = ss+m+h+dd+generateString(12)+Date.now();
    return shuffle(code);
};

export const shuffle = function (sentence: string): string {
    let a = sentence.split(""),
        n = a.length;

    for(let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

const generateString = function(length: Number): string {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
