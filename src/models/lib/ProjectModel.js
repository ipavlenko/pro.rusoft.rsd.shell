import Joi from 'joi'
import AbstractModel from './AbstractModel'
import ProjectShort from './ProjectShort'
import TransferDepositModel from './TransferDepositModel'

export const schema = () => ({
  descriptor: Joi.object().type(ProjectShort),
  deposites: Joi.array(Joi.object().type(TransferDepositModel))
})

export default class ProjectModel extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  get id () {
    return this.descriptor.id
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new ProjectModel(project => ({
      ...data,
      descriptor: ProjectShort.fromJS(data.descriptor, { ...context }),
      deposites: AbstractModel.buildArray(data.deposites, TransferDepositModel.fromJS, { ...context, project })
    }))
  }
}
