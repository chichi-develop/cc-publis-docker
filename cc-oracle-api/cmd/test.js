const oracledb = require("oracledb");
// const constants = require("../app/src/config/constants");
const constants = require("./constants");

const config = {
  user: constants.ORACLE_USER,
  password: constants.ORACLE_PASSWORD,
  connectString: `${constants.ORACLE_HOST}:${constants.ORACLE_PORT}/${constants.ORACLE_SID}`
};

async function getEmployee(empId) {
  let conn;

  try {
    conn = await oracledb.getConnection(config);

    const result = await conn.execute(
      // 'select * from cc_cstm where ct_cdcstm = :id',
      // 'select * from cc_gycm where GY_CDBNSY = :id',
      "select * from cc_cstm,cc_kiyk where ct_cdcstm = ky_cdsqsk and ct_cdcstm = :id",
      // 'select * from cc_cstm where ct_cdcstm = :id',
      [empId]
    );

    console.log(result.rows[0]);
  } catch (err) {
    console.log("Ouch!", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

// getEmployee('20249192');
// getEmployee('M0133')
getEmployee("20139944");
