import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { config as dbConfig } from '../configs/typeorm.config';
import { CrmUserEntity } from '../database/entities';

async function createCrmUser() {
  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.error('Usage: npm run create-crm-user <username> <password>');
    process.exit(1);
  }

  const dataSource = new DataSource(dbConfig as any);
  
  try {
    await dataSource.initialize();
    console.log('✅ Database connected');

    const userRepository = dataSource.getRepository(CrmUserEntity);

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
      console.log(`❌ User "${username}" already exists`);
      process.exit(1);
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = userRepository.create({
      username,
      password: hashedPassword
      // token is nullable, so we don't need to set it
    });

    await userRepository.save(newUser);
    console.log(`✅ CRM user "${username}" created successfully`);
    
  } catch (error) {
    console.error('❌ Error creating user:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

createCrmUser();

