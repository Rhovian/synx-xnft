export type RootStackParamList = {
  Vaults: object;
  Files: { id: string; navigation: any };
  FileViewer: {
    fileType: any;
    body: any;
  };
};

export type File = {
  name: string;
  icon: any;
  size: string;
};

export type FileInfo = {
  fileType: string;
  name: string;
  size: string;
  body: string;
  vault: string;
};
