import { sendEmailInterface } from 'src/common/interfaces/email.interface';
import * as sgMail from '@sendgrid/mail';
export declare class SendgridProvider {
    constructor();
    sendEmail(input: sendEmailInterface): Promise<[sgMail.ClientResponse, {}]>;
}
