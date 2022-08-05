import { Injectable } from '@angular/core';
import {
    DialogLayoutDisplay,
    ToastNotificationInitializer
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({
    providedIn: 'root',
})
export class NotifToastService {

    constructor() {}


    toastNotification(tittle, message, type) {
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(tittle);
        newToastNotification.setMessage(message);

        var layout = DialogLayoutDisplay.WARNING // SUCCESS | INFO | NONE | DANGER | WARNING;

        if (type == 'SUCCESS') {
            layout = DialogLayoutDisplay.SUCCESS;
        }

        if (type == 'INFO') {
            layout = DialogLayoutDisplay.INFO;
        }

        if (type == 'NONE') {
            layout = DialogLayoutDisplay.NONE;
        }

        if (type == 'DANGER') {
            layout = DialogLayoutDisplay.DANGER;
        }

        if (type == 'WARNING') {
            layout = DialogLayoutDisplay.WARNING;
        }

        // Choose layout color type
        newToastNotification.setConfig({
            LayoutType: layout
        });

        // Simply open the toast
        newToastNotification.openToastNotification$();
    }
}
