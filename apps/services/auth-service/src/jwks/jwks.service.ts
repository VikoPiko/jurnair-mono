import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import path from 'path';
import { exportJWK, importSPKI } from 'jose';

@Injectable()
export class JwksService {
  private jwk: any;
  private kid = 'auth-key-v1';

  constructor() {
    this.loadKey();
  }

  private async loadKey() {
    const publicPem = fs.readFileSync(
      path.join(__dirname, '..', 'public.key'),
      'utf-8'
    );
    const key = await importSPKI(publicPem, 'RS256');
    const jwk = await exportJWK(key);
    jwk.kid = this.kid;
    jwk.use = 'sig';
    jwk.alg = 'RS256';
    this.jwk = jwk;
  }

  getJwks() {
    return { keys: [this.jwk] };
  }
}
