export interface IProviderData {
  img: string;
  class: string;
  title: string;
}

export const providersConfigList: IProviderData[] = [
  {
    img: 'assets/images/providers/azure-white.png',
    class: 'bg-blue-400',
    title: 'Microsoft Azure',
  },
  {
    img: 'assets/images/providers/Primary_Horizontal_Lockup_Full_Color.svg',
    class: 'bg-white-100',
    title: 'Google Firebase',
  },
];
