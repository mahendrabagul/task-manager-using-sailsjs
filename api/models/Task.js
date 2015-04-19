/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // connection : 'TaskManager',
  schema: true,
  attributes: {
	taskname : {
		type : 'string',
		required :true
	},
	taskdate :{
		type : 'datetime'
	},
	user:{
		model: 'user'
	}
  }
};

