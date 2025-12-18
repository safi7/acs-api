import { sendEmailInterface } from 'src/common/interfaces/email.interface';
import { SendgridProvider } from 'src/providers/sendgrid/sendgrid.provider';
import { TelegramProvider } from 'src/providers/telegram/telegram.provider';
export declare class ContactService {
    private contactP;
    private telegramP;
    constructor(contactP: SendgridProvider, telegramP: TelegramProvider);
    sendFeedback(input: sendEmailInterface): Promise<[import("@sendgrid/mail").ClientResponse, {}]>;
    sendTelegramMessage(input: sendEmailInterface): Promise<void>;
}
