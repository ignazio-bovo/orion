import { MiddlewareFn } from 'type-graphql'
import { OperatorPermission } from '../../model'
import { Context } from '../check'
import { closeConnectionAndThrow } from '../../utils/globalEm'

export const OperatorOnly = (
  ...requiredPermissions: OperatorPermission[]
): MiddlewareFn<Context> => {
  return async ({ context }, next) => {
    // Ensure the user exists in the context
    if (!context?.user) {
      await closeConnectionAndThrow(new Error('Unauthorized: User required'))
    }

    // Allow root operators to bypass permission checks
    if (context.user.isRoot) {
      return next()
    }

    // Assuming user.permissions is an array of Permission enums
    const userPermissions = context.user.permissions || []

    // Check if the user has any of the required permissions
    const hasPermission =
      requiredPermissions.length === 0 ||
      requiredPermissions.some((permission) => userPermissions.includes(permission))

    if (!hasPermission) {
      await closeConnectionAndThrow(
        new Error(
          `Unauthorized: User ${context.user.id} does not have the required permissions: ${requiredPermissions}`
        )
      )
    }

    return next()
  }
}

export const AccountOnly: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context?.account) {
    await closeConnectionAndThrow(new Error('Unauthorized: Account required'))
  }

  return next()
}

export const UserOnly: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context?.user) {
    await closeConnectionAndThrow(new Error('Unauthorized: User required'))
  }

  return next()
}
