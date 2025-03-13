export type ToastSeverity = "success" | "error" | "warning" | "info";

export interface IToast {
  id: number;
  message: string;
  severity: ToastSeverity;
  duration: number;
}
