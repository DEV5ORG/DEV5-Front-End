import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";
import { Toast, ToastSeverity } from "@/interfaces/toast.interface";

export class ToastStore {
  toasts: Toast[] = [];
  nextId = 1;
  toastTimers = new Map<number, NodeJS.Timeout>();
  root: RootStore;

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  addToast(
    message: string,
    severity: ToastSeverity = "info",
    duration: number = 3000
  ) {
    const id = this.nextId++;
    const toast: Toast = { id, message, severity, duration };

    if (this.toasts.length >= 3) {
      const oldestToast = this.toasts.shift();
      if (oldestToast) this.clearToastTimeout(oldestToast.id);
    }

    this.toasts.push(toast);

    const timer = setTimeout(() => this.removeToast(id), duration);
    this.toastTimers.set(id, timer);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.clearToastTimeout(id);
  }

  clearToastTimeout(id: number) {
    const timer = this.toastTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.toastTimers.delete(id);
    }
  }

  clearToasts() {
    this.toasts = [];
  }
}
