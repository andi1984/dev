import { URL } from "url";


// Cf. https://www.typescriptlang.org/docs/handbook/interfaces.html

export interface File {
  name: String;
  abs: String;
  rel: String;
}

export interface Meta {
  title: String;
  template: String;
  [propName: string]: any;
}

export interface Site {
  title: String;
  template: String;
  html: String;
  file: File;
  url: URL;
  meta: Meta;
}