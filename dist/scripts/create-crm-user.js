"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const typeorm_config_1 = require("../configs/typeorm.config");
const entities_1 = require("../database/entities");
async function createCrmUser() {
    const username = process.argv[2];
    const password = process.argv[3];
    if (!username || !password) {
        console.error('Usage: npm run create-crm-user <username> <password>');
        process.exit(1);
    }
    const dataSource = new typeorm_1.DataSource(typeorm_config_1.config);
    try {
        await dataSource.initialize();
        console.log('✅ Database connected');
        const userRepository = dataSource.getRepository(entities_1.CrmUserEntity);
        const existingUser = await userRepository.findOne({ where: { username } });
        if (existingUser) {
            console.log(`❌ User "${username}" already exists`);
            process.exit(1);
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = userRepository.create({
            username,
            password: hashedPassword
        });
        await userRepository.save(newUser);
        console.log(`✅ CRM user "${username}" created successfully`);
    }
    catch (error) {
        console.error('❌ Error creating user:', error);
        process.exit(1);
    }
    finally {
        await dataSource.destroy();
    }
}
createCrmUser();
//# sourceMappingURL=create-crm-user.js.map