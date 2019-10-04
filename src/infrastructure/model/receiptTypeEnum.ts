/*
 * Copyright 2019 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Catapult REST Endpoints
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.7.18
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
* Type of receipt: * 0x124D (4685 decimal) - Mosaic_Rental_Fee. * 0x134E (4942 decimal) - Namespace_Rental_Fee. * 0x2143 (8515 decimal) - Harvest_Fee. * 0x2248 (8776 decimal) - LockHash_Completed. * 0x2348 (9032 decimal) - LockHash_Expired. * 0x2252 (8786 decimal) - LockSecret_Completed. * 0x2352 (9042 decimal) - LockSecret_Expired. * 0x3148 (12616 decimal) - LockHash_Created. * 0x3152 (12626 decimal) - LockSecret_Created. * 0x414D (16717 decimal) - Mosaic_Expired. * 0x414E (16718 decimal) - Namespace_Expired. * 0x424E (16974 decimal) - Namespace_Deleted. * 0x5143 (20803 decimal) - Inflation. * 0xE143 (57667 decimal) - Transaction_Group. * 0xF143 (61763 decimal) - Address_Alias_Resolution. * 0xF243 (62019 decimal) - Mosaic_Alias_Resolution. 
*/
export enum ReceiptTypeEnum {
    NUMBER_4685 = <any> 4685,
    NUMBER_4942 = <any> 4942,
    NUMBER_8515 = <any> 8515,
    NUMBER_8776 = <any> 8776,
    NUMBER_9032 = <any> 9032,
    NUMBER_8786 = <any> 8786,
    NUMBER_9042 = <any> 9042,
    NUMBER_12616 = <any> 12616,
    NUMBER_12626 = <any> 12626,
    NUMBER_16717 = <any> 16717,
    NUMBER_16718 = <any> 16718,
    NUMBER_16974 = <any> 16974,
    NUMBER_20803 = <any> 20803,
    NUMBER_57667 = <any> 57667,
    NUMBER_61763 = <any> 61763,
    NUMBER_62019 = <any> 62019
}
