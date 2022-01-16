'use strict';

//https://sequelize.org/master/

class Collection {
  constructor(model) {
    this.model = model;
  }

async read(id, options = {}) {
  try {
    let records = null;
    if(id) {
      options['where'] = {id : id};
      records = await this.model.findOne(options);
    } else {
      records = await this.model.findAll(options);
    }
    return records;
  } catch (error) {
    return error;
  }
}

async create(json) {
  try {
    let record = await this.model.create(json);
    return record;
  } catch (error) {
    return error;
  }
}

async Update(id, json) {
  try{
    let record = await this.model.findOne({where: {id}});
    let updatedRecord = await record.update(json);
    return updatedRecord;
  } catch(error) {
    return error;
    }
  }
  
  async delete(id) {
    try {
      let deletedRows = await this.model.destroy({wehere: {id}});
      return deletedRows;
    } catch (error) {
      return error;
    }
  }
}

module.exports = Collection;
