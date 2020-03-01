export type Mdmm = {
  md_idmdmm: number; // 'ID'
  md_cdcstm: string; // '顧客コード'
  md_nommrb: number; // '窓口メモ連番'
  md_nmmmbr: string; // '窓口メモ分類名'
  md_txmdmm: string; // '顧客メモ'
  md_fganch: number | null; // 'アンカーフラグ'
  md_clmdmm: string | null; // '窓口メモカラー'
  md_ccadip: string; // '更新IPアドレス'
  md_ccmodu: string; // '更新モジュール'
  createdAt: string; // '作成日'
  updatedAt: string; // '更新日'
};

export type Mdmms = Mdmm[];

export type Aclg = {
  al_idactv: string; // 'ID'
  al_nmactv: string; // 'アクティビティ区分名'
  al_noactv: number; // 'アクティビティ番号'
  al_dtactv: string; // 'アクティビティ日付'
  al_cdsqsk: string; // '請求先読者番号'
  al_nmsqsk: string; // '請求先顧客名'
  al_nmsqbu: string; // '請求先部署名'
  al_nmsqtn: string; // '請求先担当名'
  al_txactv: string; // 'アクティビティ内容'
  al_susury: number; // '数量'
  al_kgtnka: number; // '単価'
  al_kggoke: number; // '合計金額'
  al_txbiko: string; // '備考'
  al_cdcstm: string; // '読者番号'
  al_nmcstm: string; // '顧客名'
  al_nmtnbu: string; // '部署名'
  al_nmtnto: string; // '担当者名'
  // createdAt: string; // '作成日'
  // updatedAt: string; // '更新日'
};

export type Aclgs = Aclg[];

export type Auth = {
  sessionID: string
  isAuthenticated: boolean
  id: string
  email: string
  privilege: string[]
};

export type Cstm = {
  CT_CDCSTM: string;
  CT_KBCSTM: string;
  CT_NMCSTM: string;
  CT_NKCSTM: string;
  CT_NMTNBU: string;
  CT_NMTNTO: string;
  CT_NMSIME: string;
  CT_NKSIME: string;
  CT_KBKSYO: string;
  CT_NOYUBN: string;
  CT_ADCST1: string;
  CT_ADCST2: string;
  CT_ADCST3: string;
  CT_NMKUNI: string;
  CT_KBKGTI: string;
  CT_CDSQSF: string;
  CT_CDSQSM: string;
  CT_NOTEL1: string;
  CT_NOTEL2: string;
  CT_ADMAIL: string;
  CT_KBDMPR: string;
  CT_NMFRKM: string;
  CT_TXBIKO: string;
  CT_TXSSHR: string;
  CT_KBSEBT: string;
  CT_DTSNGP: string;
  CT_CDSYOK: string;
  CT_CDBAIT: string;
  CT_CDSYKS: string;
  CT_CDSYTN: string;
  CT_CDDOKI: string;
  CT_CTSOUK: string;
  CT_KBSEKY: string;
  CT_KBCLAM: string;
  CT_KBJYCT: string;
  CT_KBTKSK: string;
  CT_KBJIK1: string;
  CT_KBJIK2: string;
  CT_KBSAKJ: string;
  CT_KBMSCH: string;
  CT_CCDATEC: string;
  CT_CCTIMEC: string;
  CT_CCTERMC: string;
  CT_CCOUSRC: string;
  CT_CCUSERC: string;
  CT_CCFUNCC: string;
  CT_CCDATEX: string;
  CT_CCTIMEX: string;
  CT_CCTERMX: string;
  CT_CCOUSRX: string;
  CT_CCUSERX: string;
  CT_CCFUNCX: string;
}

export type Cstms = Cstm[]

export type Csmm = {
  CM_CDCSTM: string;
  CM_RBCSMM: string;
  CM_NMCMBR: string;
  CM_TXCSMM: string;
  CM_DTTUTI: string;
  CM_CCDATEC: string;
  CM_CCTIMEC: string;
  CM_CCTERMC: string;
  CM_CCOUSRC: string;
  CM_CCUSERC: string;
  CM_CCFUNCC: string;
  CM_CCDATEX: string;
  CM_CCTIMEX: string;
  CM_CCTERMX: string;
  CM_CCOUSRX: string;
  CM_CCUSERX: string;
  CM_CCFUNCX: string;
}

export type Csmms = Csmm[]

export type Ctzh = {
  VUN_CDSQSK: string;
  VUN_NOSQSY: string;
  VUN_DTSYRI: string;
  VUN_TMSYRI: string;
  VUN_NMSYRI: string;
  VUN_KBSYRI: string;
  VUN_NOSYRI: string;
  VUN_KGKIYK: string;
  VUN_KGKIKJ: string;
  VUN_KGNYKN: string;
  VUN_KGZNDK: string;
}

export type Ctzhs = Ctzh[]

export type Kiyk = {
  KY_NOKIYK: number;
  KY_NOSQSY: number;
  KY_CDZASS: string;
  KY_KBCSTM: string;
  KY_KBMSKM: string;
  KY_KBKODK: string;
  KY_KBJYOT: string;
  KY_KBKANK: string;
  KY_CDKYPT: string;
  KY_KBKSYB: string;
  KY_KBATBR: string;
  KY_CDSHSK: string;
  KY_CDSQSK: string;
  KY_TXSHSK: string;
  KY_NOJSQS: string;
  KY_CDCANP: string;
  KY_CDBAIT: string;
  KY_CDSYTN: string;
  KY_CDTKSY: string;
  KY_SUKIYK: number;
  KY_YMKIYK: string;
  KY_YMKIYE: string;
  KY_DTKIYK: string;
  KY_DTSQBI: string;
  KY_KBKIYK: string;
  KY_KBKIZK: string;
  KY_KBTKBT: string;
  KY_TXTKBT: string;
  KY_CDTKBT: string;
  KY_DTSTOP: string;
  KY_KBCYUS: string;
  KY_KBZOUT: string;
  KY_NMZOUT: string;
  KY_CTKIYK: number;
  KY_CTHSOY: number;
  KY_CTHSSM: number;
  KY_KGKYSZ: number;
  KY_KGKYSR: number;
  KY_TNSIDZ: number;
  KY_TNENDZ: number;
  KY_TNSORY: number;
  KY_TNSORE: number;
  KY_TXBIKO: string;
  KY_KBSAKJ: string;
  KY_YMNGDO: string;
  KY_NOKYIN: number;
  KY_NOSQSR: number;
  KY_NOKIZK: number;
  KY_NOWBTY: string;
  KY_CDIDWB: string;
  KY_CDIDVT: string;
  KY_CDIDTH: string;
  KY_DTLOAD: string;
  KY_CCDATEC: string;
  KY_CCTIMEC: string;
  KY_CCTERMC: string;
  KY_CCOUSRC: string;
  KY_CCUSERC: string;
  KY_CCFUNCC: string;
  KY_CCDATEX: string;
  KY_CCTIMEX: string;
  KY_CCTERMX: string;
  KY_CCOUSRX: string;
  KY_CCUSERX: string;
  KY_CCFUNCX: string;
}

export type Kiyks = Kiyk[]

export type KiykList = {
  KYLIST_NOKIYK: number;
  KYLIST_NOSQSY: number;
  KYLIST_CDSQSK: string;
  KYLIST_SQ_NMCSTM: string;
  KYLIST_CDSHSK: string;
  KYLIST_SH_NMCSTM: string;
  KYLIST_CDKYPT: string;
  KYLIST_SUKIYK: number;
  KYLIST_YMKIYK: string;
  KYLIST_YMKIYE: string;
  KYLIST_KBJYOT: string;
  KYLIST_KBMSKM: string;
  KYLIST_KBKIZK: string;
  KYLIST_KBKSYB: string;
  KYLIST_KBTKBT: string;
  KSLIST_ZNURKK: string;
}

export type KiykLists = KiykList[]

export type Kyzd = {
  KS_NOKIYK: number;
  KS_NOSQSY: number;
  KS_CDSQSK: string;
  KS_CDSHSK: string;
  KS_DTKYKJ: string;
  KS_KGKJSZ: number;
  KS_KGKJSR: number;
  KS_KGKIYK: number;
  KS_KGKYKJ: number;
  KS_DTNYKN: string;
  KS_KGNYKN: number;
  KS_DTURAG: string;
  KS_KGURAG: number;
  KS_ZNKIYK: number;
  KS_ZNURKK: number;
  KS_ZKMUKE: number;
  KS_KGHSZZ: number;
  KS_KGHSZS: number;
  KS_CTHSZM: number;
  KS_SUHSZM: number;
  KS_CTHSZN: number;
  KS_SUHSZN: number;
  KS_ZNHASO: number;
  KS_SIKYZN: number;
  KS_CCDATEC: string;
  KS_CCTIMEC: string;
  KS_CCTERMC: string;
  KS_CCOUSRC: string;
  KS_CCUSERC: string;
  KS_CCFUNCC: string;
  KS_CCDATEX: string;
  KS_CCTIMEX: string;
  KS_CCTERMX: string;
  KS_CCOUSRX: string;
  KS_CCUSERX: string;
  KS_CCFUNCX: string;
}

export type Kyzds = Kyzd[]

export type Kyzh = {
  VKM_NOKIYK: number;
  VKM_DTSYRI: string;
  VKM_NOSYRI: string;
  VKM_NMSYRI: string;
  VKM_NMSRSY: string;
  VKM_KGSYRI: number;
  VKM_SUSURY: number;
  VKM_KGSRSZ: number;
  VKM_KGSRSR: number;
  VKM_KBURKT: string;
}

export type Kyzhs = Kyzh[]


export type Gycm = {
  GY_CDBNRI: string;
  GY_CDBNSY: string;
  GY_NMBNSY: string;
  GY_CCDATEC: string;
  GY_CCTIMEC: string;
  GY_CCTERMC: string;
  GY_CCOUSRC: string;
  GY_CCUSERC: string;
  GY_CCFUNCC: string;
  GY_CCDATEX: string;
  GY_CCTIMEX: string;
  GY_CCTERMX: string;
  GY_CCOUSRX: string;
  GY_CCUSERX: string;
}

export type Gycms = Gycm[]

export type Privilege = {
  viewPublis?: string;
  editPublisCstm?: string;
  editMdmm?: string;
}
