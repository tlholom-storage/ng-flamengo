export interface IResponseObject {
  success: boolean
  response: {
    data: any[],
    message: string
  }
  errors: [
    {
      code: string,
      message: string
    }
  ]
}
