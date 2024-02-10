import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

let cooldownActive = false;

export function showErrorToast(toastStore: ToastStore, errorMessage: string) {
    if (!cooldownActive) {
        const toastSettings: ToastSettings = {
            message: errorMessage,
            background: 'variant-filled-error',
        };

        toastStore.trigger(toastSettings);

        // Start cooldown to not spam the user with toasts
        cooldownActive = true;
        setTimeout(() => {
            cooldownActive = false;
        }, 5000); // 5-second cooldown
    }
}
