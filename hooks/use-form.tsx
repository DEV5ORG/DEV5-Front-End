import { useState } from "react";

type FormValues<T = any> = {
  [K in keyof T]: T[K];
};

type Errors<T extends FormValues> = {
  [K in keyof T]?: string;
};

interface ValidationSchema {
  [key: string]: {
    required?: {
      value: boolean;
      message: string | ((formValues: FormValues) => string);
    };
    isEmail?: { value: boolean; message: string };
    pattern?: { value: RegExp; message: string };
    minLength?: { value: number; message: string };
    isSecurePassword?: boolean;
    test?: {
      value: (value: string | any, formValues: FormValues) => boolean;
      message: string;
    };
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

  const evaluateMessage = (
    message: string | ((formValues: FormValues) => string),
    formValues: FormValues
  ): string => {
    return typeof message === "function" ? message(formValues) : message;
  };

  const validateField = (field: keyof T, rawValue: string): boolean => {
    let value = rawValue;
    const rules = validationSchema[String(field)];

    // Si no hay reglas, retornar true
    if (!rules) {
      return true;
    }

    let isValid = true;
    let errorMessage = "";
    if (typeof value === "string") {
      value = value.trim() as any;
    }

    if (rules?.required?.value && value === "") {
      isValid = false;
      errorMessage = evaluateMessage(rules.required.message, formValues);
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

    if (rules?.isSecurePassword) {
      const password = value;
      const errors: string[] = [];

      if (password.length < 12) {
        errors.push("La contraseña debe tener al menos 12 caracteres.");
      }

      if (!/[A-Z]/.test(password)) {
        errors.push(
          "La contraseña debe contener al menos una letra mayúscula."
        );
      }
      if (!/[a-z]/.test(password)) {
        errors.push(
          "La contraseña debe contener al menos una letra minúscula."
        );
      }

      if (!/\d/.test(password)) {
        errors.push("La contraseña debe contener al menos un número.");
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push(
          "La contraseña debe contener al menos un símbolo especial."
        );
      }

      if (errors.length > 0) {
        isValid = false;
        errorMessage = errors[0];
      }
    }

    if (rules?.test?.value && !rules.test.value(value, formValues)) {
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
    const isValid = validateForm();
    if (isValid) {
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
