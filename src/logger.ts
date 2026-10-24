/**
 * Minimal structured logger.
 *
 * A production app would use pino/winston; here we only need enough structured
 * output to make the checkout and discount flow observable in the console.
 */
type Level = 'info' | 'warn' | 'error';

function log(level: Level, message: string, context?: Record<string, unknown>): void {
  const entry = {
    ts: new Date().toISOString(),
    level,
    message,
    ...(context ?? {}),
  };
  const line = JSON.stringify(entry);
  if (level === 'error') console.error(line);
  else console.log(line);
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => log('info', message, context),
  warn: (message: string, context?: Record<string, unknown>) => log('warn', message, context),
  error: (message: string, context?: Record<string, unknown>) => log('error', message, context),
};
