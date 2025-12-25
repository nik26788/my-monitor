import { BadRequestException, Logger, PipeTransform } from '@nestjs/common'
import { ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    async transform(value: unknown /* , metadata: ArgumentMetadata */) {
        try {
            const parsedValue = await this.schema.parse(value)
            Logger.log(parsedValue, 'ZodValidationPipe')
            return parsedValue
        } catch (error) {
            Logger.log(error, 'ZodValidationPipe')
            throw new BadRequestException('Validation failed')
        }
    }
}
