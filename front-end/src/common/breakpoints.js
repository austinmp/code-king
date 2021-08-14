const size = {
    sm: '1024px',
    lg: '1024px',
}

export const device = {
    sm: `(max-width: ${size.sm})`,
    lg: `(min-width: ${size.lg})`
}


// max - width
// “If [device width] is less than or equal to 600px, then do {…}”

// min-width
//  “If [device width] is greater than or equal to 1024px, then do {…}”