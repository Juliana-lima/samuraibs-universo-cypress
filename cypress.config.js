const { defineConfig } = require("cypress")
const { Pool } = require('pg')


module.exports = defineConfig({
  e2e: {
      baseUrl: 'http://localhost:3000',
      viewportWidth: 1920,
      viewportHeight: 1080,

      setupNodeEvents(on, config) {
        
        const pool = new Pool({
         host: 'isilo.db.elephantsql.com',
         user:'sdobdcsz',
         password: 'bdM8rWQa4Ks-McHZZ4DzoD1rg0HL-BLJ',
         database: 'sdobdcsz',
         port: 5432
        })
  
        on('task', {
          removedUser(email) {
            return new Promise(function (resolve){
              pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result){
                if (error){
                  throw error 
                }
                resolve({success: result})
              })
            })
            
          }
        })
  
      }
    },

})