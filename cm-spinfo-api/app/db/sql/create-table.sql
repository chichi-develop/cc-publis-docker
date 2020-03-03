-- cm_mdmm

create table cm_mdmm (
  md_idmdmm int(11)auto_increment not null comment 'ID'
  , md_cdcstm varchar(8) not null comment '顧客コード'
  , md_nommrb int(3) not null comment '窓口メモ連番'
  , md_nmmmbr varchar(100) comment '窓口メモ分類名'
  , md_txmdmm varchar(400) not null comment '顧客メモ'
  , md_fganch int(1) comment 'アンカーフラグ'
  , md_clmdmm varchar(10) comment '窓口メモカラー'
  , md_ccadip varchar(15) comment '更新IPアドレス'
  , md_ccmodu varchar(20) comment '更新モジュール'
  , createdAt date not null comment '作成日'
  , updatedAt date not null comment '更新日'
  , constraint cm_mdmm_pkc primary key (md_idmdmm)
) comment 'お客様窓口メモ' ;

create unique index cm_mdmm_i01u
  on cm_mdmm(md_cdcstm,md_idmdmm);

create index cm_mdmm_i02
  on cm_mdmm(md_cdcstm,md_nommrb);

-- cm_aclg

create table cm_aclg (
  al_idactv int(11) auto_increment not null comment 'ID'
  , al_nmactv varchar(40) not null comment 'アクティビティ区分名'
  , al_noactv int(11) not null comment 'アクティビティ番号'
  , al_dtactv date not null comment 'アクティビティ日付'
  , al_cdsqsk varchar(8) comment '請求先読者番号'
  , al_nmsqsk varchar(200) not null comment '請求先顧客名'
  , al_nmsqbu varchar(200) comment '請求先部署名'
  , al_nmsqtn varchar(200) comment '請求先担当名'
  , al_txactv varchar(200) not null comment 'アクティビティ内容'
  , al_susury int(11) comment '数量'
  , al_kgtnka int(11) comment '単価'
  , al_kggoke int(11) comment '合計金額'
  , al_txbiko varchar(500) comment '備考'
  , al_cdcstm varchar(8) comment '読者番号'
  , al_nmcstm varchar(200) comment '顧客名'
  , al_nmtnbu varchar(200) comment '部署名'
  , al_nmtnto varchar(200) comment '担当者名'
  , constraint cm_aclg_pkc primary key (al_idactv)
) comment 'アクティビティログ' ;

create index cm_aclg_i01
  on cm_aclg(al_nmactv,al_cdsqsk);

create index cm_aclg_i02
  on cm_aclg(al_dtactv,al_nmactv,al_cdsqsk);