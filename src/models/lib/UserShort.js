import Joi from 'joi'
import AbstractModel from './AbstractModel'
import ImageShort from './ImageShort'

export const schema = {
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  avatar: Joi.object().type(ImageShort).allow(null)
}

export default class UserShort extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  get abbreviation () {
    return this.name == null
      ? null
      : this.name.split(' ').filter(s => s !== '').map(s => s.charAt(0)).join('')
  }

  static fromJS (data) {
    return data == null ? null : new UserShort({
      ...data,
      avatar: ImageShort.fromJS(data.avatar)
    })
  }
}
