export interface  IAuthService {
    /**
     * Submitting master login
     * @param namespance name of company
     * @param password password
     */
    loginMaster(namespance: string, password: string): Promise<string>;

    /**
     * Check the device is logged for master or not
     */
    isMasterLogged(): Promise<boolean>;
}