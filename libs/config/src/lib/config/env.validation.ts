import { Environment } from '@spotlyt-backend/data/enums';
import { plainToInstance } from 'class-transformer';
import { IsEnum, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
