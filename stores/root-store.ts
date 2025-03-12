import { AuthStore } from "./auth-store";
import { EventStore } from "./event-store";
import { ToastStore } from "./toast-store";

export class RootStore {
  eventStore: EventStore;
  authStore: AuthStore;
  toastStore: ToastStore;

  constructor() {
    this.eventStore = new EventStore(this);
    this.authStore = new AuthStore(this);
    this.toastStore = new ToastStore(this);
  }
}
