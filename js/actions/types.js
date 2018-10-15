
export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string }
    | { type: 'POP_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string }
    | { type: 'REPLACE_ROUTE', route: string }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
    | { type: 'OPEN_DRAWER'}
    | { type: 'CLOSE_DRAWER'}
    | { type: 'SET_USER', userData: object}
    | { type: 'SET_DEVICE_USER_ID', deviceId: string}
    | { type: 'CLEAR_USER'}
    | { type: 'LOGIN_FAILED'}
    | { type: 'SET_STUDENTS', students: array}
    | { type: 'SET_NEWS', news: array}
    | { type: 'SET_STUDENT_DETAILS', details: array}
    | { type: 'SET_STUDENT_BLOG', posts: array}
    | { type: 'SET_STUDENT_HOMEWORK', homework: array}
    | { type: 'SET_STUDENT_BALANCE', balance: object}
    | { type: 'SET_STUDENT_SUMMARY', summary: array}
    | { type: 'SET_STUDENT_INVOICES', invoices: array}
    | { type: 'SET_STUDENT_PAYMENTS', payments: array}
    | { type: 'SET_STUDENT_FEE_ITEMS', feeItems: array}
    | { type: 'SET_STUDENT_CLASSES', classes: array}
    | { type: 'SET_STUDENT_TERMS', terms: array}
    | { type: 'SET_STUDENT_REPORT_CARDS', reportCards: array}
    | { type: 'SET_STUDENT_EXAMS', exams: array}
    | { type: 'SET_INVOICE', invoice: array}
    | { type: 'SET_CREDITS', credit: array}
    | { type: 'SET_ARREARS', arrears: object}
    | { type: 'SET_PAYMENT', payment: array}

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
