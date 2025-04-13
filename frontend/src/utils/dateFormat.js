import moment from 'moment'

// Function to format a date into 'DD/MM/YYYY' format
export const dateFormat = (date) => {
    return moment(date).format('DD/MM/YYYY')
}
