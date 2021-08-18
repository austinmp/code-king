const size = {
    sm: '900px',
    lg: '992px',
    xl: '1200px'


//     320px — 480px: Mobile devices
// 481px — 768px: iPads, Tablets
// 769px — 1024px: Small screens, laptops
// 1025px — 1200px: Desktops, large screens
// 1201px and more —  Extra large screens, TV
}

export const device = {
    sm: `(max-width: ${size.sm})`,
    md: `(min-width: ${size.md})`,
    lg: `(min-width: ${size.lg})`,
    xl: `(min-width: ${size.xl})`
}



// max - width
// “If [device width] is less than or equal to 600px, then do {…}”

// min-width
//  “If [device width] is greater than or equal to 1024px, then do {…}”