import { SetMetadata } from '@nestjs/common';

export const AUTH_GUARD_KEY = 'isProtected';

export const Public = () => SetMetadata(AUTH_GUARD_KEY, false);

export const Protected = () => SetMetadata(AUTH_GUARD_KEY, true);
