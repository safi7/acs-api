import { FeedbackDto } from 'src/common/dto/contact.dto';
import { ContactService } from 'src/services/contact/contact.service';
export declare class ContactController {
    private contactS;
    constructor(contactS: ContactService);
    sendFeedback(params: FeedbackDto): Promise<{
        status: string;
    }>;
}
