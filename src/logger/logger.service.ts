// src/common/logger/json-logger.service.ts
import { ConsoleLogger, Logger, LogLevel } from '@nestjs/common';

export class JsonLogger extends ConsoleLogger {
  private formatLog(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message: message instanceof Error ? message.message : message,
      context: context || '',
      trace: trace || undefined,
    });
  }

  log(message: any, context?: string) {
    super.log(this.formatLog('log', message, context), context);
  }

  error(message: any, trace?: string, context?: string) {
    super.error(this.formatLog('error', message, context, trace), trace, context);
  }

  warn(message: any, context?: string) {
    super.warn(this.formatLog('warn', message, context), context);
  }

  debug(message: any, context?: string) {
    super.debug(this.formatLog('debug', message, context), context);
  }

  verbose(message: any, context?: string) {
    super.verbose(this.formatLog('verbose', message, context), context);
  }
}
