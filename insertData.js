// we use pg library to
// request connection pool from postgres database
// psql -h traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com -d postgres -U traineeUser password is traineePassword
const { Pool } = require('pg')

// we connect to pg using pool we requested
const pool = new Pool({
  user: 'traineeUser',
  host: 'traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com',
  password: 'traineePassword',
  database: 'postgres',
  port: 5432,
  multipleStatements: true
})

// the pool emits an error on behalf of any idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// if no error on idel client, pool connects to database
pool.connect((err, client, done) => {
    //if there is an error with our database connection strings
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    //if no error then we have successfully connected 
    console.log('Connected to database');
    // do not call done(); - because we want to use this connection 
    // to create/insert/delete or select records from our database
    // sometime we might also want to export this connection for other resources
});

// insert a record into our table
pool.query(
    `INSERT INTO UserOluwasanmi2021 
                 (ID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, MOBILE_NUMBER, HOME_ADDRESS_LINE, CITY, STATE, POSTAL_CODE, COUNTRY, COMPANY_NAME, COMPANY_ZIP_CODE, INDUSTRY, NUMBER_OF_PEOPLE_ON_YOUR_TEAM, ROLE, WAGE, START_DATE, BIRTHDAY, EMERGENCY_CONTACT_NAME, EMERGENCY_CONTACT_MOBILE_NUMBER)
                 VALUES 
                 ('1', 'Oluwasanmi', 'Awelewa', 'supersanmi01@gmail.com', 'qwerty' , '2348029614315', '478 Schmedeman Hill', 'Seattle', 'Washington', '17121', 'United States of America', 'Awelewa Technology', '37405', 'Real Estate', '7', 'Manager', '50', '2021-01-14', '2001-12-16', 'Omolade Awelewa', '2349067569525'),                
                 ('2', 'John', 'Smith', 'johnsmith@gmail.com', '12345' , '4143723472', '6 Esch Way', 'Baton Rogue', 'Louisiana', '70810', 'United States of America', 'Labadie Greenholt and Zieme', '6152', 'Oil & Gas Production', '14', 'Human Resources Assistant I', '120', '2011-04-04', '1987-04-12', 'Jane Smith', '2055839817'),                
                 ('3', 'Jane', 'Smith', 'janesmith@gmail.com', 'jane123' , '9545527434', '398 Coolidge Junction', 'Boise', 'Idaho', '83757', 'United States of America', 'Carroll Robel and Aufderhar', '64101', 'Finance Companies', '10', 'Statistician', '520', '2010-03-14', '1992-03-26', 'Harwilll Philipsohn', '8162302402'),                
                 ('4', 'Jeno', 'Bonnell', 'jbonnell@gmail.com', 'bonny234' , '6178013307', '56 Luster Hill', 'Brooklyn', 'New York', '11236', 'United States of America', 'Roberts and Sons', '33305', 'Major Banks', '20', 'Systems Administrator', '1250', '1999-01-14', '1980-12-16', 'Peggy Treffry', '9545527434'),                
                 ('5', 'Gussy', 'Haley', 'ghaley9@gmail.com', 'hazzy267' , '9417580995', '0 Bowman Pass', 'Seminole', 'Florida', '34642', 'United States of America', 'Satterfield Koepp and Kutch', '15220', 'Metal Fabrications', '35', 'Legal Assistant', '270', '2000-01-14', '1970-12-16', 'Con Dougliss', '4122216709')                
                 `,
    (err, res) => {
      if(err) {
        console.log('Error or issue with table creation');
    } else {
        console.log('Inserted data into table successfully')
        console.log(res);
   }
  } 
);

pool.end();


// export connection
module.exports = pool;