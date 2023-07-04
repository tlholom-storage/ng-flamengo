export interface IAuth {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string //this is the user uid
}
