export interface IConfirmDialogData {
  title: string;
  message: string;

  // Confirm
  okText?: string | undefined;
  okCallback?: () => void | undefined;

  cancelText: string | undefined;
}
