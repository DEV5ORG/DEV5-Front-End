import { useState } from "react";

interface FormValues {
  [key: string]: string;
}

type Errors<T extends FormValues> = {
  [K in keyof T]?: string;
};

interface ValidationSchema {
  [key: string]: {
    required?: { value: boolean; message: string };
    isEmail?: { value: boolean; message: string };
    pattern?: { value: RegExp; message: string };
    minLength?: { value: number; message: string };
    test?: { value: (value: string) => boolean; message: string };
  };
}

interface UseFormProps<T extends FormValues> {
  defaultValues: T;
  validationSchema?: ValidationSchema;
  preventMultipleSubmissions?: boolean;
}

const useForm = <T extends FormValues>({
  defaultValues,
  validationSchema = {},
  preventMultipleSubmissions = true,
}: UseFormProps<T>) => {
  const [formValues, setFormValues] = useState<T>(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors<T>>({});

  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

  const setFieldValue = (field: keyof T, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));

    validateField(field, value);
  };

  const validateField = (field: keyof T, value: string): boolean => {
    value = value.trim();
    const rules = validationSchema[String(field)];
    let isValid = true;
    let errorMessage = "";

    if (rules?.required?.value && value === "") {
      isValid = false;
      errorMessage = rules.required.message;
    }

    if (rules?.isEmail?.value && value && !emailPattern.test(value)) {
      isValid = false;
      errorMessage = rules.isEmail.message;
    }

    if (rules?.pattern?.value && value && !rules.pattern.value.test(value)) {
      isValid = false;
      errorMessage = rules.pattern.message;
    }

    if (rules?.minLength?.value && value.length < rules.minLength.value) {
      isValid = false;
      errorMessage = rules.minLength.message;
    }

    if (rules?.test?.value && !rules.test.value(value)) {
      isValid = false;
      errorMessage = rules.test.message;
    }

    if (!isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errorMessage,
      }));
    } else {
      setErrors((prevErrors) => {
        const { [field]: _, ...rest } = prevErrors;
        return rest as Errors<T>;
      });
    }

    return isValid;
  };

  const validateForm = (): boolean => {
    let isValid = true;
    Object.keys(formValues).forEach((field) => {
      if (!validateField(field as keyof T, formValues[field])) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = async (
    submitFunction: (formData: T) => Promise<void>
  ) => {
    if (isLoading && preventMultipleSubmissions) return;
    if (validateForm()) {
      setIsLoading(true);
      try {
        await submitFunction(formValues);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    formValues,
    setFieldValue,
    isLoading,
    errors,
    handleSubmit,
  };
};

export default useForm;
