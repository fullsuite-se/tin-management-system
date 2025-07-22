export {}

declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (input: google.accounts.id.IdConfiguration) => void;
                    prompt: (
                        callback?: (notification: google.accounts.id.PromptMomentNotification) => void
                    ) => void;
                    renderButton?: (
                        parent: HTMLElement,
                        options: {
                            type?: string;
                            theme?: string;
                            size?: string;
                            text?: string;
                            shape?: string;
                            logo_alignment?: string;
                            width?: number;
                        }
                    ) => void;
                };
            };
        };
    }
}