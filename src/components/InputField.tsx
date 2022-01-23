import React, { InputHTMLAttributes } from 'react'
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react'
import { useField } from 'formik'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  textarea?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea = false,
  size: _,
  ...props
}) => {
  const [field, { error, touched }] = useField(props)
  const InputComponent: any = textarea ? Textarea : Input
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name.toLowerCase()}>{label}</FormLabel>
      <InputComponent {...field} {...props} id={field.name.toLowerCase()} />
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
