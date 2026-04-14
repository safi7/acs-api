import { Injectable } from '@nestjs/common';
import axios from 'axios';
import mainConfig from 'src/configs/main.config';

@Injectable()
export class StorageService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly bucket: string;

  constructor() {
    this.baseUrl = (mainConfig.supabase_url ?? '') as string;
    this.apiKey = (mainConfig.supabase_service_key ?? '') as string;
    this.bucket = (mainConfig.supabase_storage_bucket ?? 'media') as string;
  }

  async upload(folder: string, filename: string, buffer: Buffer, mimetype: string): Promise<string> {
    const path = `${folder}/${filename}`;
    const url = `${this.baseUrl}/storage/v1/object/${this.bucket}/${path}`;

    await axios.post(url, buffer, {
      headers: {
        apikey: this.apiKey,
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': mimetype,
        'x-upsert': 'true',
      },
    });

    return `${this.baseUrl}/storage/v1/object/public/${this.bucket}/${path}`;
  }

  async delete(folder: string, filename: string): Promise<void> {
    const url = `${this.baseUrl}/storage/v1/object/${this.bucket}`;

    try {
      await axios.delete(url, {
        headers: {
          apikey: this.apiKey,
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        data: { prefixes: [`${folder}/${filename}`] },
      });
    } catch (error) {
      console.warn(`Failed to delete file ${folder}/${filename} from storage:`, error?.message);
    }
  }

  getPublicUrl(folder: string, filename: string): string {
    return `${this.baseUrl}/storage/v1/object/public/${this.bucket}/${folder}/${filename}`;
  }
}
