export interface IPersonalInfo {
  name: string;
  fullName: string;
  birthday: Date;
  birthplace: string;
  homeplace: string;
  college: string;
  collegeUrl: string;
  decree: string;
  fullDecree: string;
}

export interface IExperience {
  name: string;
  colorVariable: string;
  logo: string;
  url: string;
  beginDate: Date | undefined;
  endDate: Date | undefined;
  address: string | undefined;
  roleDescriptionCode: string;
  presencial: boolean;
  remoto: boolean;
  references: IExperienceReference[] | undefined;
  tecnology: IExperienceTecnology[] | undefined;
  projects: IExperience[] | undefined;
}

export interface IExperienceReference {
  name: string;
  role: string;
}

export interface IExperienceTecnology {
  level: 1 | 2 | 3 | undefined;
  name: string;
}

export interface IExperienceLanguage {
  level: string;
  language: string;
  flag: string;
  date: Date | undefined;
  certificate: string | undefined;
  urlCertificate: string | undefined;
}

export interface IExperienceTecnologyList {
  issues: IExperienceTecnology[];
  version: IExperienceTecnology[];
  cloud: IExperienceTecnology[];
  quality: IExperienceTecnology[];
  frameworks: IExperienceTecnology[];
  servers: IExperienceTecnology[];
  coding: IExperienceTecnology[];
  os: IExperienceTecnology[];
  office: IExperienceTecnology[];
  ides: IExperienceTecnology[];
  enterprise: IExperienceTecnology[];
}

export interface ICertfication {
  name: string;
  url: string;
  badge: string;
  date: Date;
}

export interface IPersonalProject {
  name: string;
  url: string;
  image: string | undefined;
  descriptionCode: string;
  android: string | undefined;
  microsoft: string | undefined;
}

export interface IPersonalStrength {
  titleCode: string;
  descriptionCode: string;
}
