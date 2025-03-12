import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";
import { IToast, ToastSeverity } from "@/interfaces/toast.interface";

export class ToastStore {
  toasts: IToast[] = [];
  nextId = 1;
  toastTimers = new Map<number, NodeJS.Timeout>();
  root: RootStore;

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  setToasts(toasts: IToast[]) {
    this.toasts = toasts;
  }

  setNextId(id: number) {
    this.nextId = id;
  }

  setToastTimers(id: number, timer: NodeJS.Timeout) {
    this.toastTimers.set(id, timer);
  }

  deleteToastTimer(id: number) {
    this.toastTimers.delete(id);
  }

  addToast(
    message: string,
    severity: ToastSeverity = "info",
    duration: number = 3000
  ) {
    const id = this.nextId;
    this.setNextId(this.nextId + 1);

    const toast: IToast = { id, message, severity, duration };
    const newToasts = [...this.toasts];

    if (newToasts.length >= 3) {
      const oldestToast = newToasts.shift();
      if (oldestToast) this.clearToastTimeout(oldestToast.id);
    }

    newToasts.push(toast);
    this.setToasts(newToasts);

    const timer = setTimeout(() => this.removeToast(id), duration);
    this.setToastTimers(id, timer);
  }

  removeToast(id: number) {
    this.setToasts(this.toasts.filter((toast) => toast.id !== id));
    this.clearToastTimeout(id);
  }

  clearToastTimeout(id: number) {
    const timer = this.toastTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.deleteToastTimer(id);
    }
  }

  clearToasts() {
    this.setToasts([]);
  }
}
