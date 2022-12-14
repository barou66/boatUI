/**
 * BOAT API
 * BOAT api mangement.
 *
 * The version of the OpenAPI document: 0.0.1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface JwtResponse {
    username: string;
    role: JwtResponse.RoleEnum;
    token: string;
}
export namespace JwtResponse {
    export type RoleEnum = 'ADMIN' | 'CLIENT';
    export const RoleEnum = {
        Admin: 'ADMIN' as RoleEnum,
        Client: 'CLIENT' as RoleEnum
    };
}


