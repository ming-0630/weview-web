import Review from "./reviewInterface"
import User from "./userInterface"

export interface Report {
    id?: string
    review?: Review
    reviewId?: string
    description?: string
    user?: User
    reportReasons?: string[]
    action?: string
    dateCreated?: Date
}

export default Report