/*
 * Copyright 2018 NEM
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

import { deepEqual } from 'assert';
import { expect } from 'chai';
import { Listener } from '../../src/infrastructure/Listener';
import { Address } from '../../src/model/account/Address';
import { TransactionStatusError } from '../../src/model/transaction/TransactionStatusError';
import { UInt64 } from '../../src/model/UInt64';

describe('Listener', () => {
    it('should createComplete a WebSocket instance given url parameter', () => {
        const listener = new Listener('ws://localhost:3000');
        expect('ws://localhost:3000/ws').to.be.equal(listener.url);
        listener.close();
    });

    describe('isOpen', () => {
        it('should return false when listener is created and not opened', () => {
            const listener = new Listener('ws://localhost:3000');
            expect(listener.isOpen()).to.be.false;
            listener.close();
        });
    });

    describe('onStatusWhenAddressIsTheSame', () => {
        it('Should forward status', () => {
            const errorEncodedAddress = '906415867F121D037AF447E711B0F5E4D52EBBF066D96860EB';

            const errorAddress = Address.createFromEncoded(errorEncodedAddress);

            class WebSocketMock {
                constructor(public readonly url: string) {}

                send(payload: string): void {
                    expect(payload).to.be.eq(`{"subscribe":"status/${errorAddress.plain()}"}`);
                }
            }

            const statusInfoErrorDTO = {
                address: errorEncodedAddress,
                deadline: '1010',
                hash: 'transaction-hash',
                code: 'error-message',
            };

            const listener = new Listener('ws://localhost:3000', WebSocketMock);

            listener.open();

            const reportedStatus = new Array<TransactionStatusError>();

            listener.status(errorAddress).subscribe((error) => {
                reportedStatus.push(error);
            });

            listener.handleMessage(statusInfoErrorDTO, null);

            expect(reportedStatus.length).to.be.equal(1);
            const transactionStatusError = reportedStatus[0];
            expect(transactionStatusError.address).to.deep.equal(errorAddress);
            expect(transactionStatusError.hash).to.be.equal(statusInfoErrorDTO.hash);
            expect(transactionStatusError.code).to.be.equal(statusInfoErrorDTO.code);
            deepEqual(transactionStatusError.deadline.toDTO(), UInt64.fromNumericString(statusInfoErrorDTO.deadline).toDTO());
        });
    });

    describe('onStatusWhenAddressIsDifferentAddress', () => {
        it('Should not forward status', () => {
            const errorEncodedAddress = '906415867F121D037AF447E711B0F5E4D52EBBF066D96860EB';

            const subscribedEncodedAddress = '906415867F121D037AF447E711B0F5E4D52EBBF066D96AAAAA';
            const subscribedAddress = Address.createFromEncoded(subscribedEncodedAddress);

            class WebSocketMock {
                constructor(public readonly url: string) {}
                send(payload: string): void {
                    expect(payload).to.be.eq(`{"subscribe":"status/${subscribedAddress.plain()}"}`);
                }
            }

            const statusInfoErrorDTO = {
                address: errorEncodedAddress,
                deadline: '1010',
                hash: 'transaction-hash',
                status: 'error-message',
            };

            const listener = new Listener('ws://localhost:3000', WebSocketMock);

            listener.open();

            const reportedStatus = new Array<TransactionStatusError>();

            listener.status(subscribedAddress).subscribe((transactionStatusError) => {
                reportedStatus.push(transactionStatusError);
            });

            listener.handleMessage(statusInfoErrorDTO, null);

            expect(reportedStatus.length).to.be.equal(0);
        });
    });

    describe('onerror', () => {
        it('should reject because of wrong server url', async () => {
            const listener = new Listener('https://notcorrecturl:0000');
            await listener
                .open()
                .then(() => {
                    throw new Error('This should not be called when expecting error');
                })
                .catch((error) => {
                    expect(error.message.toString()).not.to.be.equal('');
                });
        });
    });
});
