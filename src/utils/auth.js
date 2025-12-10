export const emitAuthChange = () => {
    window.dispatchEvent(new Event("auth-changed"));
};
