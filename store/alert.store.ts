import create from 'zustand';

type AlertType = 'error' | 'warning' | 'info' | 'success';

interface AlertState {
    type: AlertType;
    message: string;
    isShow: boolean;
    setShowAlert: (isShow: boolean) => void;
    setAlertMessage: (type: AlertType, message: string) => void;
}

const alertStore = create<AlertState>((set) => ({
    type: 'success',
    message: '',
    isShow: false,
    setShowAlert: (isShow: boolean) => {
        set({ isShow });
    },
    setAlertMessage: (type: AlertType, message: string) => {
        set({ type, message });
    },
}));

export default alertStore;
