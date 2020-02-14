import oracledb from 'oracledb'
import { Request, Response, NextFunction } from "express"
import { ORACLE_HOST, ORACLE_PORT, ORACLE_SID, ORACLE_USER, ORACLE_PASSWORD } from '../config/constants'

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

// oracledb.autoCommit = true; // autoCommit = trueにすると、connection.commit()を使わずにデータが commitされます。

// let connectionProperties = {
//   user: process.env.DBAAS_USER_NAME || 'ccuser',
//   password: process.env.DBAAS_USER_PASSWORD || 'ccuser11',
//   connectString:
//     process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR ||
//     'oracle-11g_oracle11g_1:1521/orcl',
//   // '192.168.0.241:1521/ccdb',
//   stmtCacheSize: process.env.DBAAS_STATEMENT_CACHE_SIZE || 4,
//   poolMin: 1,
//   poolMax: 5
// }

let connectionProperties = {
  user: `${ORACLE_USER}`,
  password: `${ORACLE_PASSWORD}`,
  connectString: `${ORACLE_HOST}:${ORACLE_PORT}/${ORACLE_SID}`,
  stmtCacheSize: (process.env.DBAAS_STATEMENT_CACHE_SIZE || 4) as number,
  poolMin: 1 as const,
  poolMax: 5 as const
}

export async function cstmSearch(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null
  let columnName: string = req.params.columnName
  let sqlText: string
  // if (columnName.slice(0, 8).toUpperCase() === 'CT_NOTEL') {
  //   sqlText = `SELECT * FROM cc_cstm WHERE ct_notel1 like '${req.params.key}' or ct_notel2 LIKE :key`
  // } else {
  //   sqlText = `SELECT * FROM cc_cstm WHERE TRIM(${columnName}) LIKE :key`
  // }

  switch (columnName.toUpperCase()) {
    case 'CT_NOTEL1' || 'CT_NOTEL2':
      sqlText = `SELECT * FROM cc_cstm WHERE ct_notel1 like '${req.params.key}' or ct_notel2 LIKE :key ORDER BY ${columnName}`
      break;
    case 'CT_ADMAIL':
      sqlText = `SELECT * FROM cc_cstm WHERE ${columnName} LIKE UPPER(:key) ORDER BY ${columnName}`
      break;
    default:
      sqlText = `SELECT * FROM cc_cstm WHERE ${columnName} LIKE :key ORDER BY ${columnName}`
  }

  console.log(sqlText)
  console.log(`oracle.ts:cstmSearch: columnName:${columnName}、key:${req.params.key}`)

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText, [req.params.key])
    if (result.rows && result.rows.length >= 1) {
      // return res.send(result.rows)
      return res.status(200).json({ cstms: result.rows });

    } else if (result.rows && result.rows.length === 0) {
      return res.status(500).json({ error: 'no data found' });
    }
    return res.status(500).json({ error: 'unknown error' })
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

export async function cstmInsert(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null
  const queryString1 = Object.keys(req.body).map(function (data) {
    return `:${data}`
  })
  let sqlText = `INSERT INTO CC_CSTM VALUES (${queryString1})`

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText, req.body)
    console.log(result.rows)
    await connection.commit()
    return res.send(200)
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

export async function cstmUpsert(req: Request, res: Response, next: NextFunction) {
  const cdcstm = req.body.cdcstm;
  const cstm = req.body.cstm;
  let connection: oracledb.Connection | undefined | null
  // Object.entries(obj).map(([key, value]) => ({key, value}))
  const updateQuery = Object.entries(cstm).map(([key, value], index, array) => {
    return `${key}='${value || ' '}',`
  })
  const insertKeyQuery = Object.entries(cstm).map(([key, value]) => {
    return `${key},`
  })
  const insertValueQuery = Object.entries(cstm).map(([key, value]) => {
    return `'${value || ' '}',`
  })
  let sqlText =
    `BEGIN\n` +
    `UPDATE CC_CSTM\n` +
    `SET ` +
    updateQuery.join('\n').slice(0, -1) +
    `\n` +
    `WHERE CT_CDCSTM = ${cdcstm};\n` +
    `IF (SQL%NOTFOUND) THEN\n` +
    `INSERT INTO CC_CSTM (` +
    insertKeyQuery.join('\n').slice(0, -1) +
    `) VALUES (` +
    insertValueQuery.join('\n').slice(0, -1) +
    `);\n` +
    `END IF;\n` +
    `END;`

  // console.log(req.body)
  console.log(sqlText)

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText)
    console.log(result.rows)
    await connection.commit()
    // return res.send(200)
    return res.send()
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

export async function csmmSearch(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null
  let sqlText = `SELECT * FROM cc_csmm WHERE cm_cdcstm = :key ORDER BY CM_RBCSMM`

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText, [req.params.key])
    if (result.rows && result.rows.length >= 1) {
      return res.send(result.rows)
    } else if (result.rows && result.rows.length === 0) {
      return res.status(500).json({ error: 'no data found' });
    }
    return res.status(500).json({ error: 'unknown error' })
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

export async function csmmUpsert(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null
  const queryString1 = Object.keys(req.body).map(function (data) {
    return `${data} =:${data}`
  })
  const queryString2 = Object.keys(req.body).map(function (data) {
    return `:${data}`
  })
  let sqlText =
    `BEGIN\n` +
    `UPDATE CC_CSMM\n` +
    `SET ` +
    queryString1.join() +
    `\n` +
    `WHERE CM_CDCSTM = :CM_CDCSTM AND CM_RBCSMM = :CM_RBCSMM;\n` +
    `IF (SQL%NOTFOUND) THEN\n` +
    `INSERT INTO CC_CSMM VALUES (` +
    queryString2.join() +
    `);\n` +
    `END IF;\n` +
    `END;`

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText, req.body)
    console.log(result.rows)
    await connection.commit()
    return res.send(200)
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

export async function csmmDelete(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null
  let sqlText = `DELETE CC_CSMM WHERE CM_CDCSTM = :key1 AND CM_RBCSMM= :key2`

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText, [req.params.key1, req.params.key2])
    console.log(result.rows)
    await connection.commit()
    return res.send(200)
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

export async function kiykSearch2(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null

  let sqlText = `SELECT * FROM cc_kiyk WHERE TRIM(${req.body.columnName}) = :key`

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText, [req.body.key])
    if (result.rows && result.rows.length >= 1) {
      return res.send(result.rows)
    } else if (result.rows && result.rows.length === 0) {
      return res.status(500).json({ error: 'no data found' });
    }
    return res.status(500).json({ error: 'unknown error' })
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

// export async function kiykSearch(req: Request, res: Response, next: NextFunction) {
//   let connection: oracledb.Connection | undefined | null


//   switch (req.params.columnName.toUpperCase()) {
//     case 'KY_CDSQSK_CDSHSK':
//       var sqlText = `SELECT * FROM cc_kiyk WHERE :key in (KY_CDSQSK, KY_CDSHSK) ORDER BY KY_NOKIYK DESC`
//       break;
//     default:
//       var sqlText = `SELECT * FROM cc_kiyk WHERE ${req.params.columnName} = :key ORDER BY KY_NOKIYK DESC`
//   }


//   console.log(sqlText)
//   console.log(`columnName:${req.params.columnName}`);
//   console.log(`key:${req.params.key}`);


//   try {
//     connection = await oracledb.getConnection(connectionProperties)
//     const result = await connection.execute(sqlText, [req.params.key])
//     if (result.rows && result.rows.length >= 1) {
//       // return res.send(result.rows)
//       return res.status(200).json({ kiyks: result.rows });
//     } else if (result.rows && result.rows.length === 0) {
//       return res.status(500).json({ error: 'no data found' });
//     }
//     return res.status(500).json({ error: 'unknown error' })
//   } catch (err) {
//     console.error(err.message)
//     console.error(sqlText)
//     return res.status(500).json({ error: err.message });
//   } finally {
//     if (connection) {
//       try {
//         await connection.close()
//       } catch (err) {
//         console.error(err)
//       }
//     }
//   }
// }

export async function kiykSearch(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null

  let sqlText =
    `SELECT` +
    `   KY_NOKIYK,` +
    `   KY_NOSQSY,` +
    `   KY_CDZASS,` +
    `   KY_KBCSTM,` +
    `   KY_KBMSKM,` +
    `   KY_KBKODK,` +
    `   KY_KBJYOT,` +
    `   KY_KBKANK,` +
    `   KY_CDKYPT,` +
    `   KY_KBKSYB,` +
    `   KY_KBATBR,` +
    `   KY_CDSHSK,` +
    `   KY_CDSQSK,` +
    `   KY_TXSHSK,` +
    `   KY_NOJSQS,` +
    `   KY_CDCANP,` +
    `   KY_CDBAIT,` +
    `   KY_CDSYTN,` +
    `   KY_CDTKSY,` +
    `   KY_SUKIYK,` +
    `   KY_YMKIYK,` +
    `   KY_YMKIYE,` +
    `   KY_DTKIYK,` +
    `   KY_DTSQBI,` +
    `   KY_KBKIYK,` +
    `   KY_KBKIZK,` +
    `   KY_KBTKBT,` +
    `   KY_TXTKBT,` +
    `   KY_CDTKBT,` +
    `   KY_DTSTOP,` +
    `   KY_KBCYUS,` +
    `   KY_KBZOUT,` +
    `   KY_NMZOUT,` +
    `   KY_CTKIYK,` +
    `   KY_CTHSOY,` +
    `   KY_CTHSSM,` +
    `   KY_KGKYSZ,` +
    `   KY_KGKYSR,` +
    `   KY_TNSIDZ,` +
    `   KY_TNENDZ,` +
    `   KY_TNSORY,` +
    `   KY_TNSORE,` +
    `   KY_TXBIKO,` +
    `   KY_KBSAKJ,` +
    `   KY_YMNGDO,` +
    `   KY_NOKYIN,` +
    `   KY_NOSQSR,` +
    `   KY_NOKIZK,` +
    `   KY_NOWBTY,` +
    `   KY_CDIDWB,` +
    `   KY_CDIDVT,` +
    `   KY_CDIDTH,` +
    `   KY_DTLOAD,` +
    `   KY_CCDATEC,` +
    `   KY_CCTIMEC,` +
    `   KY_CCTERMC,` +
    `   KY_CCOUSRC,` +
    `   KY_CCUSERC,` +
    `   KY_CCFUNCC,` +
    `   KY_CCDATEX,` +
    `   KY_CCTIMEX,` +
    `   KY_CCTERMX,` +
    `   KY_CCOUSRX,` +
    `   KY_CCUSERX,` +
    `   KY_CCFUNCX,` +
    `   KY_NOKIYK KYLIST_NOKIYK,` +
    `   KY_NOSQSY KYLIST_NOSQSY,` +
    `   KY_CDSQSK KYLIST_CDSQSK,` +
    `   TRIM(SQ.CT_NMCSTM) KYLIST_SQ_NMCSTM,` +
    `   KY_CDSHSK KYLIST_CDSHSK,` +
    `   TRIM(SH.CT_NMCSTM) KYLIST_SH_NMCSTM,` +
    `   KY_CDKYPT KYLIST_CDKYPT,` +
    `   KY_SUKIYK KYLIST_SUKIYK,` +
    `   KY_YMKIYK KYLIST_YMKIYK,` +
    `   KY_YMKIYE KYLIST_YMKIYE,` +
    `   KY_KBJYOT KYLIST_KBJYOT,` +
    `   KY_KBMSKM KYLIST_KBMSKM,` +
    `   KY_KBKIZK KYLIST_KBKIZK,` +
    `   KY_KBKSYB KYLIST_KBKSYB,` +
    `   KY_KBTKBT KYLIST_KBTKBT,` +
    `   KS_ZNURKK KSLIST_ZNURKK` +
    ` FROM CC_CSTM SQ,CC_CSTM SH,CC_KIYK,CC_KYSM` +
    ` WHERE KY_CDSQSK=SQ.CT_CDCSTM` +
    `  AND KY_CDSHSK=SH.CT_CDCSTM` +
    `  AND KY_NOKIYK=KS_NOKIYK`

  switch (req.params.columnName.toUpperCase()) {
    case 'KY_CDSQSK_CDSHSK':
      sqlText = sqlText + `  AND :key in (KY_CDSQSK, KY_CDSHSK) ORDER BY KY_NOKIYK DESC`
      break;
    default:
      sqlText = sqlText + `  AND ${req.params.columnName} = :key ORDER BY KY_NOKIYK DESC`
  }

  console.log(sqlText)
  console.log(`columnName:${req.params.columnName}`);
  console.log(`key:${req.params.key}`);


  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText, [req.params.key])
    if (result.rows && result.rows.length >= 1) {
      // return res.send(result.rows)
      return res.status(200).json({ kiyks: result.rows });
    } else if (result.rows && result.rows.length === 0) {
      return res.status(500).json({ error: 'no data found' });
    }
    return res.status(500).json({ error: 'unknown error' })
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

export async function kyzdSearch(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null
  let sqlText = `SELECT * FROM cc_kysm WHERE ks_nokiyk = :key`

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText, [req.params.key])
    if (result.rows && result.rows.length >= 1) {
      return res.send(result.rows)
    } else if (result.rows && result.rows.length === 0) {
      return res.status(500).json({ error: 'no data found' });
    }
    return res.status(500).json({ error: 'unknown error' })
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}


export async function ctzhSearch(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null
  let sqlText =
    `select /*+ ALL_ROWS LEADING(kj nk ky) USE_NL(kj nk ky)  */ ` +
    `  urnk.*,sum(nvl(VUN_KGKIYK,0)+nvl(VUN_KGKIKJ,0)-nvl(VUN_KGNYKN,0)) over(order by VUN_DTSYRI,VUN_TMSYRI,VUN_NOSQSY rows between unbounded preceding and current row) as VUN_KGZNDK ` +
    `from( ` +
    `  select /*+    FIRST_ROWS */ ` +
    `    ky.KY_CDSQSK                                                                                                     "VUN_CDSQSK", ` +
    `    ky.KY_NOSQSY                                                                                                     "VUN_NOSQSY", ` +
    `    substr(ky.KY_DTKIYK,1,4)||'/'||substr(ky.KY_DTKIYK,5,2)||'/'||substr(ky.KY_DTKIYK,7,2)                           "VUN_DTSYRI", ` +
    `    substr(lpad(to_char(trim(max(ky.KY_CCTIMEC))),6,0),1,2)||':'||substr(lpad(to_char(trim(max(ky.KY_CCTIMEC))),6,0),3,2)||':'||substr(lpad(to_char(trim(max(ky.KY_CCTIMEC))),6,0),5,2)         "VUN_TMSYRI", ` +
    `    '契約'                                                                                                           "VUN_NMSYRI", ` +
    `    '契約作成'                                                                                                       "VUN_KBSYRI", ` +
    `    ky.KY_NOSQSY                                                                                                     "VUN_NOSYRI", ` +
    `    sum(ky.KY_KGKYSZ + ky.KY_KGKYSR)                                                                                 "VUN_KGKIYK", ` +
    `    to_number('')                                                                                                 "VUN_KGKIKJ", ` +
    `    to_number('')                                                                                                 "VUN_KGNYKN" ` +
    `  from CC_KIYK ky ` +
    `  where ky.KY_KBJYOT not in ('4','5') ` +
    `  group by ky.KY_CDSQSK, ky.KY_NOSQSY, ky.KY_DTKIYK, ky.KY_NOSQSY ` +
    `  union all ` +
    `  select /*+    FIRST_ROWS */ ` +
    `    kj.KK_CDSQSK                                                                                                     "VUN_CDSQSK", ` +
    `    kj.KK_NOSQSY                                                                                                     "VUN_NOSQSY", ` +
    `    substr(kj.KK_DTKYKJ,1,4)||'/'||substr(kj.KK_DTKYKJ,5,2)||'/'||substr(kj.KK_DTKYKJ,7,2)                           "VUN_DTSYRI", ` +
    `    substr(lpad(to_char(trim(max(kj.KK_CCTIMEX))),6,0),1,2)||':'||substr(lpad(to_char(trim(max(kj.KK_CCTIMEX))),6,0),3,2)||':'||substr(lpad(to_char(trim(max(kj.KK_CCTIMEX))),6,0),5,2)         "VUN_TMSYRI", ` +
    `    '解除'                                                                                                           "VUN_NMSYRI", ` +
    `    GC.GY_NMBNSY                                                                                                     "VUN_KBSYRI", ` +
    `    max(kj.KK_NOKIKJ)                                                                                                "VUN_NOSYRI", ` +
    `    to_number('')                                                                                                    "VUN_KGKIYK", ` +
    `    -sum(KJ.KK_KGKJSZ + KJ.KK_KGKJSR)                                                                                "VUN_KGKIKJ", ` +
    `    to_number('')                                                                                                    "VUN_KGNYKN" ` +
    `  from CC_KYKJ kj, (select * from cc_gycm where GY_CDBNRI = 'KBKYKJ'  ) GC ` +
    `  where KJ.KK_KBKYKJ = GC.GY_CDBNSY(+) ` +
    `  group by kj.KK_CDSQSK, kj.KK_NOSQSY, GC.GY_NMBNSY,kj.KK_DTKYKJ ` +
    `  union all ` +
    `  select /*+    FIRST_ROWS */ ` +
    `    to_char(nk.NK_CDSQSK)                                                                                            "VUN_CDSQSK", ` +
    `    nk.NK_NOSQSY                                                                                                     "VUN_NOSQSY", ` +
    `    substr(nk.NK_DTNYKN,1,4)||'/'||substr(nk.NK_DTNYKN,5,2)||'/'||substr(nk.NK_DTNYKN,7,2)                           "VUN_DTSYRI", ` +
    `    substr(lpad(to_char(trim(max(nk.NK_CCTIMEC))),6,0),1,2)||':'||substr(lpad(to_char(trim(max(nk.NK_CCTIMEC))),6,0),3,2)||':'||substr(lpad(to_char(trim(max(nk.NK_CCTIMEC))),6,0),5,2)         "VUN_TMSYRI", ` +
    `    '入金'                                                                                                           "VUN_NMSYRI", ` +
    `    GC.GY_NMBNSY                                                                                                     "VUN_KBSYRI", ` +
    `    nk.NK_NONYKN                                                                                                     "VUN_NOSYRI", ` +
    `    to_number('')                                                                                                    "VUN_KGKIYK", ` +
    `    to_number('')                                                                                                    "VUN_KGKIKJ", ` +
    `    sum(NK.NK_KGNYKN)                       　                                                                       "VUN_KGNYKN" ` +
    `  from CC_NYKN nk , (select * from cc_gycm where GY_CDBNRI = 'KBNYKN'  ) GC ` +
    `  where NK.NK_KBNYKN = GC.GY_CDBNSY(+) ` +
    `  group by nk.NK_CDSQSK, nk.NK_NOSQSY, nk.NK_NONYKN,GC.GY_NMBNSY,nk.NK_DTNYKN,nk.NK_NONYKN ` +
    `  ) urnk ` +
    `where urnk.VUN_CDSQSK = :key ` +
    `order by VUN_DTSYRI desc, VUN_TMSYRI desc, VUN_NOSQSY desc `

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText, [req.params.key])
    if (result.rows && result.rows.length >= 1) {
      return res.send(result.rows)
    } else if (result.rows && result.rows.length === 0) {
      return res.status(500).json({ error: 'no data found' });
    }
    return res.status(500).json({ error: 'unknown error' })
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

export async function kyzhSearch(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null
  let sqlText =
    `	select /*+ 	ALL_ROWS */` +
    `	 ky.KY_NOKIYK   "VKM_NOKIYK",` +
    `		ky.KY_DTKIYK   "VKM_DTSYRI", ` +
    `		CAST(ky.KY_NOKIYK as CHAR(7))  "VKM_NOSYRI", ` +
    `		'1_契約'       "VKM_NMSYRI",` +
    `		'契約作成'   "VKM_NMSRSY",` +
    `		(ky.KY_KGKYSZ + ky.KY_KGKYSR)   "VKM_KGSYRI",` +
    `		ky.KY_SUKIYK   "VKM_SUSURY",` +
    `		ky.KY_KGKYSZ   "VKM_KGSRSZ",` +
    `		ky.KY_KGKYSR   "VKM_KGSRSR",` +
    `		' '         "VKM_KBURKT"` +
    `	from CC_KIYK ky` +
    `	where ky.KY_NOKIYK = :key1` +
    `	union all ` +
    `	select /*+ 	ALL_ROWS */` +
    `		KJ.KK_NOKIYK  "VKM_NOKIYK",` +
    `		KJ.KK_DTKYKJ  "VKM_DTSYRI",` +
    `		CAST(KJ.KK_NOKIKJ as CHAR(7))  "VKM_NOSYRI",` +
    `		'2_解除'      "VKM_NMSYRI",` +
    `		GC.GY_NMBNSY  "VKM_NMSRSY",` +
    `		(KJ.KK_KGKJSZ + KJ.KK_KGKJSR )  "VKM_KGSYRI",` +
    `		0           "VKM_SUSURY",` +
    `		KJ.KK_KGKJSZ  "VKM_KGSRSZ",` +
    `		KJ.KK_KGKJSR  "VKM_KGSRSR",` +
    `		' '         "VKM_KBURKT"` +
    `	from CC_KYKJ kj, (select * from cc_gycm where GY_CDBNRI = 'KBKYKJ'  ) GC` +
    `	where KJ.KK_KBKYKJ = GC.GY_CDBNSY(+)` +
    `	  and KJ.KK_NOKIYK = :key2` +
    `	union all` +
    `	select /*+ 	ALL_ROWS */` +
    `		NK.NK_NOKIYK  "VKM_NOKIYK",` +
    `		NK.NK_DTNYKN  "VKM_DTSYRI",` +
    `		CAST(NK.NK_NONYKN as CHAR(7)) "VKM_NOSYRI",` +
    `		'3_入金'      "VKM_NMSYRI",` +
    `		GC.GY_NMBNSY  "VKM_NMSRSY",` +
    `		(NK.NK_KGNYKN + 0 )  "VKM_KGSYRI",` +
    `		0           "VKM_SUSURY",` +
    `		0           "VKM_KGSRSZ",` +
    `		0           "VKM_KGSRSR",` +
    `		' '         "VKM_KBURKT"` +
    `	from CC_NYKN NK, (select * from cc_gycm where GY_CDBNRI = 'KBNYKN'  ) GC` +
    `	where NK.NK_KBNYKN = GC.GY_CDBNSY(+)` +
    `	  and NK.NK_NOKIYK = :key3` +
    `	union all` +
    `	select /*+ LEADING(ur sh) USE_NL(ur sh) NO_INDEX(cc_urag_kburkt_index)*/` +
    `		ur.UA_NOKIYK   "VKM_NOKIYK", ` +
    `		ur.UA_DTURAG   "VKM_DTSYRI", ` +
    `		cast(ur.UA_CDSHOH as CHAR(10))  "VKM_NOSYRI", ` +
    `		'4_売上'       "VKM_NMSYRI",` +
    `		sh.SH_NMSHOH   "VKM_NMSRSY",` +
    `		(ur.UA_KGHSOZ + ur.UA_KGHSSO)   "VKM_KGSYRI",` +
    `		ur.UA_SUSURY   "VKM_SUSURY",` +
    `		ur.UA_KGHSOZ   "VKM_KGSRSZ",` +
    `		ur.UA_KGHSSO   "VKM_KGSRSR",` +
    `		ur.UA_KBURKT   "VKM_KBURKT"` +
    `	from CC_URAG ur,CC_SYHM sh` +
    `	where ur.UA_CDSHOH = sh.SH_CDSHOH` +
    `	  and ur.UA_NOKIYK = :key4`

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText, [req.params.key, req.params.key, req.params.key, req.params.key])
    if (result.rows && result.rows.length >= 1) {
      return res.send(result.rows)
    } else if (result.rows && result.rows.length === 0) {
      return res.status(500).json({ error: 'no data found' });
    }
    return res.status(500).json({ error: 'unknown error' })
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

// export async function gycmSearch(req: Request, res: Response, next: NextFunction) {
//   let connection: oracledb.Connection | undefined | null
//   let sqlText = `SELECT * FROM cc_gycm WHERE gy_cdbnri=:key1 and gy_cdbnsy=:key2`
//   console.log(sqlText)
//   console.log(`key1:${req.params.key1}`);
//   console.log(`key2:${req.params.key2}`);


//   try {
//     connection = await oracledb.getConnection(connectionProperties)
//     const result = await connection.execute(sqlText, [req.params.key1, req.params.key2])
//     if (result.rows && result.rows.length >= 1) {
//       // return res.send(result.rows)
//       return res.status(200).json({ kiyks: result.rows });
//     } else if (result.rows && result.rows.length === 0) {
//       return res.status(500).json({ error: 'no data found' });
//     }
//     return res.status(500).json({ error: 'unknown error' })
//   } catch (err) {
//     console.error(err.message)
//     console.error(sqlText)
//     return res.status(500).json({ error: err.message });
//   } finally {
//     if (connection) {
//       try {
//         await connection.close()
//       } catch (err) {
//         console.error(err)
//       }
//     }
//   }
// }


export async function gycmSearch(req: Request, res: Response, next: NextFunction) {
  let connection: oracledb.Connection | undefined | null
  let sqlText = `SELECT * FROM cc_gycm`
  console.log(sqlText)

  try {
    connection = await oracledb.getConnection(connectionProperties)
    const result = await connection.execute(sqlText)
    if (result.rows && result.rows.length >= 1) {
      // return res.send(result.rows)
      return res.status(200).json({ gycms: result.rows });
    } else if (result.rows && result.rows.length === 0) {
      return res.status(500).json({ error: 'no data found' });
    }
    return res.status(500).json({ error: 'unknown error' })
  } catch (err) {
    console.error(err.message)
    console.error(sqlText)
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}
