import { FieldError } from './../generated/graphql'

export const toErrorMap = (errorsList: FieldError[]) => {
  const errorMap: Record<string, string> = {}
  errorsList.forEach(({ field, message }) => {
    errorMap[field] = message
  })
  return errorMap
}
