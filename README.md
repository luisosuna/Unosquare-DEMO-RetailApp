# Unosquare Sports Store - Demo Retail Application

A complete e-commerce retail application built for testing purposes, inspired by saucedemo.com but focused on sports equipment (tennis, paddle, and pickleball gear).

## 🚀 Quick Start

1. Open `index.html` in a web browser or serve it via a local web server
2. Log in with one of the test users:
   - **Username**: `unosquare_validUser`, `unosquare_problemUser`, `unosquare_performanceUser`, or `unosquare_errorUser`
   - **Password**: `secret_sauce`

## 🏬 Features

### Authentication
- 4 different user types for testing various scenarios
- Session persistence with localStorage
- Logout functionality

### Product Catalog
- **12 sports products** across 3 categories:
  - 🎾 **Tennis**: Rackets, balls, shoes, strings
  - 🏓 **Paddle**: Rackets, balls, shoes, bags
  - 🥒 **Pickleball**: Paddles, balls, nets, shoes

### Shopping Experience
- **Filtering**: By category and maximum price
- **Sorting**: By name (A-Z, Z-A) and price (low-high, high-low)
- **Shopping Cart**: Add/remove items with quantity controls
- **Real-time Updates**: Cart count and total pricing

### Checkout Process
- **Validation Rules**:
  - Cannot checkout with empty cart
  - Valid US zip codes (12345 or 12345-6789)
  - 16-digit card numbers
  - Future expiry dates (MM/YY format)
  - 3-4 digit CVV codes
- **Payment Types**: Credit and Debit cards (dummy data)
- **Order Summary**: Complete breakdown with 8% tax calculation
- **Order Completion**: Thank you page with cart reset

## 🎨 Design

- **Unosquare Branding**: Logo and color scheme throughout
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface with hover effects
- **Accessibility**: Screen reader friendly with proper ARIA labels

## 🧪 Testing Scenarios

Perfect for testing:
- User authentication flows
- Product browsing and filtering
- Shopping cart functionality
- Form validation (positive and negative cases)
- Complete e-commerce checkout process
- Responsive design across devices

## 🛠 Technical Details

- **Pure Frontend**: HTML, CSS, JavaScript (no backend required)
- **Data Persistence**: localStorage for cart and session
- **Single Page Application**: Smooth navigation without page reloads
- **Form Validation**: Client-side validation with user-friendly error messages

## 📁 Files

- `index.html` - Main application structure
- `styles.css` - Complete styling and responsive design
- `app.js` - Application logic and functionality
- `README.md` - This documentation

## 🎯 Testing Users

Each user type simulates different testing scenarios:
- `unosquare_validUser` - Standard user experience
- `unosquare_problemUser` - Occasional errors for error handling testing
- `unosquare_performanceUser` - Simulated performance delays
- `unosquare_errorUser` - Random errors for edge case testing
