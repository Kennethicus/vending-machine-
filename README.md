# vending-machine
 Applicant: Kenneth Gabriel G. Tecson

## Project setup
```
npm install
```

## Features
 *Accepts bills and calculates change*
      
   Samle input and output:
- Input  
     - Bill: `50`
     - Owed: `12`
- Output
     - Change:
     `1 ₱20 bill`
     `1 ₱10 coin`
     `1 ₱5 coin`
     `3 ₱1 coin`

  
*Responsive design*
 - On tablets, displays a 3-column layout with products at the bottom.
 - On phones, displays a 2-column layout with products at the bottom.
 - Displays product examples and prices; hover and zoom effect.
  
  *Includes Toastification:*
 - Handles scenarios where the bill is 0 and the owed amount is 0.
 - Handles scenarios where the bill is greater than 0 and equal to the owed amount.
 - Handles scenarios where the bill is less than the owed amount.


## Specific Versions of Dependencies

*Dependencies*

    "bootstrap": "^5.3.3",
    "core-js": "^3.8.3",
    "vue": "^3.2.13",
    "vue-toastification": "^2.0.0-rc.5"

*Development Dependencies:*

    "@babel/core": "^7.12.16",
    "@babel/eslint-parser": "^7.12.16",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3"


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
