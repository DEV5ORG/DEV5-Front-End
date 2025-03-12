export type ToastSeverity = "success" | "error" | "warning" | "info";

export interface Toast {
  id: number;
  message: string;
  severity: ToastSeverity;
  duration: number;
}
