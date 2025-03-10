import { faker } from '@faker-js/faker';
import * as dotenv from "dotenv";

dotenv.config();

export const generateUserData = () => {
    const firstName = (faker.person.firstName()).toLowerCase();
    const lastName = (faker.person.lastName()).toLowerCase();
    return {
        email: `${firstName}_${lastName}@${process.env.MAIL_DOMAIN}`
    }
};
