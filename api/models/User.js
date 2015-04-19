var bcrypt = require('bcrypt');
var uuid = require('node-uuid');

module.exports = {
  // connection : 'TaskManager',
  schema : true,
  // autoPK : false,
  attributes: {
        provider: {
            type: 'string',
         },
	      uid: {
            type: 'string',
        },
	      name: {
            type: 'string',
        },  
        email: {
            type: 'email',
            required: true,
            unique  : true,
        },
        password: {
            type: 'string',
            required: true
        },
        gender : {
          type : 'string',
          // required : true
        },
        birthdate : {
          type :'datetime'
        },
        tasks :{
          collection: 'task',
          via: 'user',
          dominant:true
        },
        isactive : {
          type : 'boolean'
        },
        isverified : {
          type : 'boolean'
        },
        token : {
          type : 'string'
        },
        // override default toJSON
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
  },

  beforeCreate: function(user, cb) {
      User.findOneByEmail(user.email).exec(function(err, data) {
        if (data)
          cb({ValidationError: {email: [{rule: 'Already Taken'}]}});
        else {
           // Generate a v1 (time-based) id
            user.token = uuid.v1();
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hash) {
                  if(err) {
                      console.log(err);
                      cb(err);
                  } else {
                      user.password = hash;
                       cb(null, user);
                  }
                });
            });
        }
      });
  }
};

 
// <!--div class="content">
//       <h1 id="main-title">Hi <%= user.name %>,</h1>
//       <p>You've successfully logged in.</p>
//       <a class="btn" href="/logout">Logout</a>
//       <h2>User Model</h2>
//       <table class="table">
//         <% for(key in user.toJSON() ) { if (user.hasOwnProperty(key)) { %>
//         <tr>
//           <td><%= key %>:</td>
//           <td class="boxy"><%= user[key] %></td>
//         </tr>
//         <% }} %>
//       </table> 
// </div-->
