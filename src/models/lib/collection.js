'use strict'

/** 
 * A collection interface for CRUD operations with JSON & Sequelize
*/

class Collection {
  constructor(model) {
    this.model = model;
}

  async create(json) {
    try {
      let createdRecord = await this.model.create(json)
      return createdRecord
    } catch(error) {
      console.error(`Error creating data for model: ${this.model.name}`)
      return error
    }
  }

  async update(id, json) {
    try {
      if (!id) throw new Error(`No record ID provided for model: ${this.model.name}`);
      
      let record  = await this.model.findOne({ where: { id }})
      let updatedRecord = await record.update(json)
      return updatedRecord
    } catch(error) {
      console.error(`Error updating data for model: ${this.model.name}`)
      return error
    }
  }

  async retrieve(id) {
    let record = null
    try {
      if(id) {
        record = await this.model.findOne({ where: { id }})
      } else {
        record = await this.model.findAll({})
      }
      return record

    } catch(error) {
      console.error(`Error retrieving data for model: ${this.model.name}`)
      return error
    }
  }

  async delete(id) {
    try {
      if (!id) throw new Error(`No record ID provided for model: ${this.model.name}`);

      let deletedRecord = await this.model.destroy({ where: { id }})
      return deletedRecord
    } catch (error) {
      console.error(`Error deleting data for model: ${this.model.name}`)
      return error
    }
  }

  async bulkCreate(objArr) {
    try {
      let data = await this.model.bulkCreate(objArr)
      return data
    } catch (error) {
      console.error(`Error bulk creating data for model: ${this.model.name}`)
      return error
    }
  }
}



module.exports = Collection