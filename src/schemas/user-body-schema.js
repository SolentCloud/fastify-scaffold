const userBodySchema = {
  body: {
    type: 'object',
    requires: [
      'username',
      'emailAddress',
    ],
    properties: {
      username: {
        type: 'string',
      },
      emailAddress: {
        type: 'string',
        format: 'email'
      }
    }
  }
}