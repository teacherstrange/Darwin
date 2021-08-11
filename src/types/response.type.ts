
export interface IResponse {
    /**
     * This is the code of response you consult the code list for known what this code meaning
     */
    code: number;

    /**
     * This is the data (Optionnal)
     */
    data: any;

    /**
     * This is the message of the request (Optionnal)
     */
    message?: string;

    /**
     * This is the token givin on login (Optionnal)
     */
    token?: string;
}
