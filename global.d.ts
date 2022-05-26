/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'remark-html' {
  const html: any
  export default html
}

declare interface apiResponse extends Response {
  data: responseList
}

declare type responseList = Array<any>
